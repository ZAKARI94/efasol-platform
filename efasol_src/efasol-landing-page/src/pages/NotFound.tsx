import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <p className="text-[#1B5E20] font-semibold text-sm uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Page not found
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-6 text-lg rounded-lg font-semibold">
          Back to home
        </Button>
      </Link>
    </div>
  );
}
