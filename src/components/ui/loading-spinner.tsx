import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  size = 24,
  className,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2
          className={cn("animate-spin text-primary", className)}
          size={size}
        />
      </div>
    );
  }

  return (
    <Loader2
      className={cn("animate-spin text-primary", className)}
      size={size}
    />
  );
};

interface LoadingStateProps {
  children: React.ReactNode;
  loading: boolean;
  fullScreen?: boolean;
  spinnerSize?: number;
}

export const LoadingState = ({
  children,
  loading,
  fullScreen = false,
  spinnerSize = 24,
}: LoadingStateProps) => {
  if (!loading) return <>{children}</>;

  if (fullScreen) {
    return (
      <>
        {children}
        <LoadingSpinner fullScreen size={spinnerSize} />
      </>
    );
  }

  return (
    <div className="relative">
      <div className={cn(loading && "opacity-50 pointer-events-none")}>
        {children}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={spinnerSize} />
        </div>
      )}
    </div>
  );
}; 