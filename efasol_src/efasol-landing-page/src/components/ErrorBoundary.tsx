import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Something went wrong.
          </h1>
          <p className="text-gray-600 mb-6">
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
