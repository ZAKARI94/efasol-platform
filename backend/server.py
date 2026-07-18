from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import Response
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Literal, Optional
import uuid
from datetime import datetime, timezone
import csv
import io

from jose import JWTError, jwt
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get("JWT_SECRET", "change-this-jwt-secret")
JWT_ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AdminTokenData(BaseModel):
    sub: str
    role: str
    exp: int
    iat: int
    jti: str
    tv: int


# --- Marketplace models ---
DELIVERY_PRICES = {"express": 2000, "standard": 1000}


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    category: str
    price: int
    weight: str
    stock: int
    promo: bool = False
    featured: bool = False
    image: str = ""


class ProductCreate(BaseModel):
    id: str
    name: str
    category: str
    price: int = Field(ge=0)
    weight: str
    stock: int = Field(ge=0)
    promo: bool = False
    featured: bool = False
    image: str = ""


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[int] = Field(default=None, ge=0)
    weight: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)
    promo: Optional[bool] = None
    featured: Optional[bool] = None
    image: Optional[str] = None


# Source of truth for marketplace products, mirrored (id/price/weight/stock)
# from frontend/src/data/marketplace.js. Seeded into MongoDB on startup.
SEED_PRODUCTS = [
    {"id": "whole-chicken-15", "name": "Whole chicken 1.5kg", "category": "whole", "price": 3750, "weight": "1.5 kg", "stock": 18, "promo": False, "featured": True},
    {"id": "whole-chicken-20", "name": "Whole chicken 2kg", "category": "whole", "price": 5000, "weight": "2 kg", "stock": 12, "promo": True, "featured": True},
    {"id": "whole-chicken-25", "name": "Whole chicken 2.5kg", "category": "whole", "price": 6250, "weight": "2.5 kg", "stock": 9, "promo": False, "featured": False},
    {"id": "chicken-wings", "name": "Chicken wings", "category": "cuts", "price": 1250, "weight": "500 g", "stock": 24, "promo": False, "featured": True},
    {"id": "chicken-thigh", "name": "Chicken thigh", "category": "cuts", "price": 1750, "weight": "700 g", "stock": 16, "promo": True, "featured": False},
    {"id": "chicken-breast", "name": "Chicken breast", "category": "cuts", "price": 2000, "weight": "800 g", "stock": 10, "promo": False, "featured": False},
    {"id": "gizzard", "name": "Chicken gizzard", "category": "offal", "price": 1000, "weight": "400 g", "stock": 14, "promo": False, "featured": False},
]


class CustomerInfo(BaseModel):
    name: str
    phone: str
    address: str
    city: str = ""


class OrderItemIn(BaseModel):
    id: str
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer: CustomerInfo
    items: List[OrderItemIn]
    delivery_method: Literal["express", "standard"] = "standard"
    payment_method: Literal["card", "cash"] = "cash"


class OrderItem(BaseModel):
    id: str
    name: str
    quantity: int
    price: int


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    customer: CustomerInfo
    items: List[OrderItem]
    delivery_method: str
    delivery_price: int
    payment_method: str
    subtotal: int
    total: int
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class OrderStatusUpdate(BaseModel):
    status: Literal["pending", "processing", "shipped", "delivered", "cancelled"]


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def is_strong_password(password: str) -> bool:
    min_length = int(os.environ.get("ADMIN_PASSWORD_MIN_LENGTH", "8"))
    if len(password) < min_length:
        return False
    if not re.search(r"[A-Za-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    return True


def get_admin_token_ttl_minutes() -> int:
    return int(os.environ.get("ADMIN_ACCESS_TOKEN_TTL_MIN", os.environ.get("JWT_EXP_MINUTES", "30")))


def get_admin_bootstrap_config() -> dict:
    return {
        "enabled": os.environ.get("ADMIN_BOOTSTRAP_ENABLED", "true").lower() == "true",
        "email": os.environ.get("ADMIN_BOOTSTRAP_EMAIL", os.environ.get("ADMIN_EMAIL", "admin@efasol.ci")).strip().lower(),
        "password": os.environ.get("ADMIN_BOOTSTRAP_PASSWORD", os.environ.get("ADMIN_PASSWORD", "admin123")),
        "password_hash": os.environ.get("ADMIN_BOOTSTRAP_PASSWORD_HASH", os.environ.get("ADMIN_PASSWORD_HASH", "")),
    }


def create_access_token(subject: str, token_version: int, role: str = "admin") -> str:
    now = int(datetime.now(timezone.utc).timestamp())
    expires_at = now + (get_admin_token_ttl_minutes() * 60)
    payload = {
        "sub": subject,
        "role": role,
        "exp": expires_at,
        "iat": now,
        "jti": str(uuid.uuid4()),
        "tv": token_version,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def verify_admin_token(authorization: Optional[str] = Header(default=None)) -> AdminTokenData:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        token_data = AdminTokenData(**payload)
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if token_data.role != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")

    user = await db.admin_users.find_one({"email": token_data.sub}, {"_id": 0, "token_version": 1})
    if not user:
        raise HTTPException(status_code=401, detail="Admin account not found")
    if int(user.get("token_version", 0)) != token_data.tv:
        raise HTTPException(status_code=401, detail="Session rotated, please login again")

    return token_data


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    obj = ContactMessage(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    msgs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for m in msgs:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return msgs

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# --- Marketplace: products ---
@api_router.get("/products", response_model=List[Product])
async def list_products():
    products = await db.products.find({}, {"_id": 0}).to_list(1000)
    return products


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# --- Marketplace: orders ---
@api_router.post("/orders", response_model=Order)
async def create_order(input: OrderCreate):
    if not input.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    product_ids = [item.id for item in input.items]
    products = {p["id"]: p for p in await db.products.find({"id": {"$in": product_ids}}, {"_id": 0}).to_list(1000)}

    missing = [pid for pid in product_ids if pid not in products]
    if missing:
        raise HTTPException(status_code=404, detail=f"Unknown product(s): {', '.join(missing)}")

    order_items = []
    subtotal = 0
    decremented = []
    try:
        for item in input.items:
            product = products[item.id]
            result = await db.products.update_one(
                {"id": item.id, "stock": {"$gte": item.quantity}},
                {"$inc": {"stock": -item.quantity}},
            )
            if result.modified_count == 0:
                raise HTTPException(status_code=409, detail=f"Insufficient stock for {product['name']}")
            decremented.append((item.id, item.quantity))
            subtotal += product["price"] * item.quantity
            order_items.append(OrderItem(id=item.id, name=product["name"], quantity=item.quantity, price=product["price"]))
    except HTTPException:
        for pid, qty in decremented:
            await db.products.update_one({"id": pid}, {"$inc": {"stock": qty}})
        raise

    delivery_price = DELIVERY_PRICES.get(input.delivery_method, 1000)
    order = Order(
        order_number=f"EF-{uuid.uuid4().hex[:8].upper()}",
        customer=input.customer,
        items=order_items,
        delivery_method=input.delivery_method,
        delivery_price=delivery_price,
        payment_method=input.payment_method,
        subtotal=subtotal,
        total=subtotal + delivery_price,
    )
    doc = order.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.orders.insert_one(doc)
    return order


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if isinstance(order.get("created_at"), str):
        order["created_at"] = datetime.fromisoformat(order["created_at"])
    return order


@api_router.get("/orders", response_model=List[Order])
async def list_orders():
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for o in orders:
        if isinstance(o.get("created_at"), str):
            o["created_at"] = datetime.fromisoformat(o["created_at"])
    return orders


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(input: AdminLoginRequest):
    email = input.email.strip().lower()
    user = await db.admin_users.find_one({"email": email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    password_hash = user.get("password_hash", "")
    if not verify_password(input.password, password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    next_token_version = int(user.get("token_version", 0)) + 1
    await db.admin_users.update_one(
        {"email": email},
        {"$set": {"token_version": next_token_version, "updated_at": datetime.now(timezone.utc).isoformat()}},
    )

    token = create_access_token(subject=email, token_version=next_token_version, role=user.get("role", "admin"))
    return AdminLoginResponse(access_token=token, expires_in=get_admin_token_ttl_minutes() * 60)


@api_router.post("/admin/token/refresh", response_model=AdminLoginResponse)
async def admin_refresh_token(token_data: AdminTokenData = Depends(verify_admin_token)):
    user = await db.admin_users.find_one({"email": token_data.sub}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Admin account not found")

    next_token_version = int(user.get("token_version", 0)) + 1
    await db.admin_users.update_one(
        {"email": token_data.sub},
        {"$set": {"token_version": next_token_version, "updated_at": datetime.now(timezone.utc).isoformat()}},
    )

    token = create_access_token(subject=token_data.sub, token_version=next_token_version, role=user.get("role", "admin"))
    return AdminLoginResponse(access_token=token, expires_in=get_admin_token_ttl_minutes() * 60)


@api_router.get("/admin/products", response_model=List[Product], dependencies=[Depends(verify_admin_token)])
async def admin_list_products(q: Optional[str] = None, category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if q:
        query["name"] = {"$regex": q, "$options": "i"}
    products = await db.products.find(query, {"_id": 0}).sort("name", 1).to_list(1000)
    return products


@api_router.post("/admin/products", response_model=Product, dependencies=[Depends(verify_admin_token)])
async def admin_create_product(input: ProductCreate):
    existing = await db.products.find_one({"id": input.id}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="Product id already exists")
    await db.products.insert_one(input.model_dump())
    return Product(**input.model_dump())


@api_router.put("/admin/products/{product_id}", response_model=Product, dependencies=[Depends(verify_admin_token)])
async def admin_update_product(product_id: str, input: ProductUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.products.update_one({"id": product_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    return Product(**product)


@api_router.delete("/admin/products/{product_id}", dependencies=[Depends(verify_admin_token)])
async def admin_delete_product(product_id: str):
    order_ref = await db.orders.find_one({"items.id": product_id}, {"_id": 1})
    if order_ref:
        raise HTTPException(status_code=409, detail="Cannot delete product referenced by existing orders")
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True, "deleted_id": product_id}


@api_router.get("/admin/orders", response_model=List[Order], dependencies=[Depends(verify_admin_token)])
async def admin_list_orders(
    q: Optional[str] = None,
    status: Optional[str] = None,
    page: int = 1,
    page_size: int = 50,
):
    query = {}
    if status:
        query["status"] = status
    if q:
        query["$or"] = [
            {"order_number": {"$regex": q, "$options": "i"}},
            {"customer.name": {"$regex": q, "$options": "i"}},
            {"customer.phone": {"$regex": q, "$options": "i"}},
        ]
    page = max(1, page)
    page_size = min(max(1, page_size), 200)
    skip = (page - 1) * page_size
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(page_size).to_list(page_size)
    for o in orders:
        if isinstance(o.get("created_at"), str):
            o["created_at"] = datetime.fromisoformat(o["created_at"])
    return orders


@api_router.patch("/admin/orders/{order_id}/status", response_model=Order, dependencies=[Depends(verify_admin_token)])
async def admin_update_order_status(order_id: str, input: OrderStatusUpdate):
    result = await db.orders.update_one({"id": order_id}, {"$set": {"status": input.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if isinstance(order.get("created_at"), str):
        order["created_at"] = datetime.fromisoformat(order["created_at"])
    return Order(**order)


@api_router.get("/admin/orders/export.csv", dependencies=[Depends(verify_admin_token)])
async def admin_export_orders_csv(status: Optional[str] = None, q: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    if q:
        query["$or"] = [
            {"order_number": {"$regex": q, "$options": "i"}},
            {"customer.name": {"$regex": q, "$options": "i"}},
            {"customer.phone": {"$regex": q, "$options": "i"}},
        ]
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(5000)

    stream = io.StringIO()
    writer = csv.writer(stream)
    writer.writerow(["order_number", "status", "customer_name", "customer_phone", "subtotal", "delivery_price", "total", "created_at"])
    for o in orders:
        writer.writerow([
            o.get("order_number", ""),
            o.get("status", ""),
            (o.get("customer") or {}).get("name", ""),
            (o.get("customer") or {}).get("phone", ""),
            o.get("subtotal", 0),
            o.get("delivery_price", 0),
            o.get("total", 0),
            o.get("created_at", ""),
        ])

    return Response(
        content=stream.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=orders.csv"},
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_products():
    admin_bootstrap = get_admin_bootstrap_config()
    if admin_bootstrap["enabled"]:
        existing_admin = await db.admin_users.find_one({"email": admin_bootstrap["email"]}, {"_id": 1})
        if not existing_admin:
            if admin_bootstrap["password_hash"]:
                password_hash = admin_bootstrap["password_hash"]
            else:
                if not is_strong_password(admin_bootstrap["password"]):
                    raise RuntimeError(
                        f"ADMIN_BOOTSTRAP_PASSWORD must be at least {os.environ.get('ADMIN_PASSWORD_MIN_LENGTH', '8')} chars and contain letters and numbers"
                    )
                password_hash = pwd_context.hash(admin_bootstrap["password"])

            await db.admin_users.insert_one(
                {
                    "email": admin_bootstrap["email"],
                    "password_hash": password_hash,
                    "role": "admin",
                    "token_version": 0,
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            )

    for product in SEED_PRODUCTS:
        await db.products.update_one(
            {"id": product["id"]},
            {"$setOnInsert": product},
            upsert=True,
        )


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()