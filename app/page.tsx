"use client";

import { useState } from "react";
import { SearchInput } from "./components/SearchInput";
import { MovieCard } from "./components/MovieCard";
import { SentimentDisplay } from "./components/SentimentDisplay";

interface CastMember {
  name: string;
  imageUrl: string;
}

interface MovieData {
  title: string | null;
  year: string | null;
  rating: string | null;
  plot: string | null;
  poster: string | null;
  cast: CastMember[] | null;
  reviews: string[] | null;
}

interface SentimentData {
  classification: "positive" | "mixed" | "negative";
  analysis: string;
}

export default function Home() {
  const [searchedId, setSearchedId] = useState("");
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://localhost:5000";

  const fetchMovieData = async (imdbId: string) => {
    setIsLoading(true);
    setError("");
    setSentiment(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/movie/${imdbId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch data");
      }
      const data = await response.json();

      setMovieData({
        title: data.title,
        year: data.year,
        rating: data.rating,
        plot: data.plot,
        poster: data.poster,
        cast: data.cast,
        reviews: data.reviews,
      });

      setSentiment({
        classification: data.classification,
        analysis: data.analysis,
      });

      setSearchedId(imdbId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMovieData(null);
      setSentiment(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-[#E3E3E3] selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {!searchedId && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 min-w-[100vh] min-h-[100vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover opacity-30 grayscale-[0.5] animate-in fade-in duration-1000"
            >
              <source src="./bgvid.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E11]/80 via-[#0E0E11]/40 to-[#0E0E11]" />
          </>
        )}

        {searchedId && (
          <div className="animate-in fade-in duration-1000">
            <div className="absolute -top-[5%] -left-[10%] w-[60%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
            <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
          </div>
        )}
      </div>

      {!searchedId ? (
        <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-4 md:p-6">
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-4xl md:text-6xl font-extrabold text-taupe-400 bg-clip-text mb-4 leading-tight">
                IMDB Movie Insider
              </h1>
              <p className="text-gray-400 text-base md:text-xl font-medium px-4">
                Enter an IMDb ID to unlock AI-powered movie insights.
              </p>
            </div>

            <div className="bg-[#1A1A1E]/50 backdrop-blur-xl p-1.5 md:p-2 rounded-2xl border border-white/5 shadow-2xl mx-2">
              <SearchInput onSearch={fetchMovieData} isLoading={isLoading} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 animate-in fade-in duration-700">
          <div className=" mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6">
              <h2 className="text-4xl font-extrabold text-taupe-400 bg-clip-text mb-4 leading-tight">
                IMDB Movie Insider
              </h2>
              <div className="w-full md:w-96 bg-[#1A1A1E] rounded-xl border border-white/10 shadow-lg">
                <SearchInput onSearch={fetchMovieData} isLoading={isLoading} />
              </div>
            </div>

            {error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8 text-center">
                <p className="text-red-400 font-medium">
                  Something went wrong: {error}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="lg:col-span-8 order-2 lg:order-1 space-y-6 md:space-y-8">
                  <div className="bg-[#1A1A1E]/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                    <MovieCard
                      poster={movieData?.poster || null}
                      title={movieData?.title || null}
                      year={movieData?.year || null}
                      rating={movieData?.rating || null}
                      plot={movieData?.plot || null}
                      cast={movieData?.cast || null}
                      reviews={movieData?.reviews || null}
                      isLoading={isLoading}
                    />
                  </div>
                </div>

                <div className="lg:col-span-4 order-2 lg:order-2 lg:sticky lg:top-8">
                  <div className="bg-gradient-to-b from-[#1A1A1E] to-[#141417] rounded-3xl border border-white/10 p-5 md:p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Audience Sentiment
                      </h3>
                    </div>
                    <SentimentDisplay
                      rating={movieData?.rating || "N/A"}
                      sentiment={sentiment}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
