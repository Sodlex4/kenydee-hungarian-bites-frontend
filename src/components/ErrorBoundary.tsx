import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
