import { Button } from './ui/button';

interface EmptyStateProps {
  message: string;
  onRetry?: () => void;
}

export function EmptyState({ message, onRetry }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
}
