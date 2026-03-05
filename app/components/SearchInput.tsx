"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface SearchInputProps {
  onSearch: (imdbId: string) => void;
  isLoading: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate IMDb ID format as per core features
    const imdbIdRegex = /^tt\d{7,9}$/;
    if (!input.trim()) {
      setError("Please enter an IMDb ID");
      return;
    }

    if (!imdbIdRegex.test(input.trim())) {
      setError("Invalid IMDb ID format (e.g., tt0133093)");
      return;
    }

    onSearch(input.trim());
  };

  return (
    <div className="w-full space-y-2">
      <form
        onSubmit={handleSubmit}
        className="relative group flex items-center bg-[#1A1A1E] border border-white/10 rounded-2xl p-1.5 transition-all duration-300 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 shadow-2xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder="Enter IMDb ID "
          className="flex-1 bg-transparent px-4 py-3 text-[#E3E3E3] placeholder-gray-500 focus:outline-none text-lg"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:hover:scale-100 shadow-lg shadow-blue-500/20"
          aria-label="Search Movie"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <ArrowRight className="h-6 w-6" />
          )}
        </button>
      </form>

      {error && (
        <p className="px-4 text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
