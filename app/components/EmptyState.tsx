'use client';

export function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Movie Sentiment Analyzer
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover what audiences think about your favorite movies
          </p>
        </div>
      </div>
    </div>
  );
}
