"use client";

interface SentimentDisplayProps {
  rating: string;
  sentiment: {
    classification: "positive" | "mixed" | "negative";
    analysis: string;
  } | null;
  isLoading: boolean;
}

export function SentimentDisplay({
  rating,
  sentiment,
  isLoading,
}: SentimentDisplayProps) {
  const getSentimentColor = (classification: string) => {
    switch (classification) {
      case "positive":
        return "bg-green-100 border-green-300 text-green-800";
      case "mixed":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "negative":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
        <div className="h-24 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (!sentiment) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 rounded-lg p-3 text-center font-bold ${getSentimentColor(sentiment.classification)}`}
      >
        {sentiment.classification.charAt(0).toUpperCase() +
          sentiment.classification.slice(1)}
      </div>
      <div className="border-2 rounded-lg p-4 bg-card">
        <p className="text-sm text-foreground leading-relaxed">
          {sentiment.analysis}
        </p>
      </div>
    </div>
  );
}
