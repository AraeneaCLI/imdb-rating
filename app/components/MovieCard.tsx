"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface CastMember {
  name: string;
  imageUrl: string;
}

interface MovieCardProps {
  poster: string | null;
  title: string | null;
  year: string | null;
  rating: string | null;
  plot: string | null;
  cast: CastMember[] | null;
  isLoading: boolean;
}

export function MovieCard({
  poster,
  title,
  year,
  rating,
  plot,
  cast,
  isLoading,
}: MovieCardProps) {
  const plotRef = useRef<HTMLParagraphElement>(null);
  const ratingRef = useRef<HTMLParagraphElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const castContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        // 1. Typing Effect for Plot
        if (plot) {
          gsap.fromTo(
            plotRef.current,
            { text: "" },
            { text: plot, duration: 1.5, ease: "none" },
          );
        }

        // 2. Typing/Increment for Year
        if (year) {
          gsap.fromTo(
            yearRef.current,
            { text: "0000" },
            { text: year, duration: 1, ease: "power2.out" },
          );
        }

        // 3. Number Counter for Rating
        if (rating) {
          const numericRating = parseFloat(rating) || 0;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: numericRating,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (ratingRef.current)
                ratingRef.current.innerText = counter.value.toFixed(1);
            },
          });
        }

        // 4. Staggered Entrance for Cast
        if (cast && cast.length > 0) {
          gsap.fromTo(
            ".cast-pill",
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
          );
        }
      });
      return () => ctx.revert();
    }
  }, [isLoading, plot, rating, year, cast]);

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 animate-in fade-in duration-500">
        {/* Left Section: Poster Skeleton */}
        <div className="flex-shrink-0 w-full md:w-64 space-y-4">
          <div className="relative aspect-[2/3] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            {/* The Custom Hourglass Loader  */}
            <div className="loader"></div>
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
            <div className="h-16 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* Right Section: Content Skeleton */}
        <div className="flex-1 space-y-6 py-2">
          <div className="h-10 w-3/4 bg-white/5 rounded-xl animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
            <div className="h-4 w-2/3 bg-white/5 rounded-full animate-pulse" />
          </div>

          <div className="pt-4 space-y-4">
            <div className="h-4 w-20 bg-white/5 rounded-full animate-pulse" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-32 bg-white/5 border border-white/5 rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hourglass Loader CSS */}
        <style jsx>{`
          .loader {
            width: 25px;
            height: 50px;
            display: grid;
            color: #60a5fa;
            background:
              linear-gradient(currentColor 0 0) top/100% 2px,
              radial-gradient(
                  farthest-side at top,
                  #0000 calc(100% - 2px),
                  currentColor calc(100% - 1px),
                  #0000
                )
                top,
              linear-gradient(currentColor 0 0) bottom/100% 2px,
              radial-gradient(
                  farthest-side at bottom,
                  #0000 calc(100% - 2px),
                  currentColor calc(100% - 1px),
                  #0000
                )
                bottom;
            background-size:
              100% 1px,
              100% 50%;
            background-repeat: no-repeat;
            animation: l18 4s infinite linear;
          }
          .loader::before,
          .loader::after {
            content: "";
            grid-area: 1/1;
            background: inherit;
            border: inherit;
            animation: inherit;
          }
          .loader::after {
            animation-duration: 2s;
          }
          @keyframes l18 {
            100% {
              transform: rotate(1turn);
            }
          }
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="flex-shrink-0 w-full md:w-64">
        {poster && poster !== "N/A" ? (
          <div className="space-y-4">
            <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                fill
                src={poster}
                alt={title || "Poster"}
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                  Year
                </p>
                <p
                  ref={yearRef}
                  className="text-lg font-bold text-white tracking-widest"
                >
                  0000
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                  Rating
                </p>
                <p ref={ratingRef} className="text-lg font-bold text-blue-400">
                  0.0
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[2/3] rounded-3xl border border-white/5 bg-white/5 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Poster Available</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6">
        <h2 className="text-4xl font-bold text-white tracking-tight leading-tight font-serif">
          {title || "Unknown Title"}
        </h2>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 min-h-[100px] backdrop-blur-sm">
          <p
            ref={plotRef}
            className="text-gray-300 leading-relaxed italic font-sans"
          ></p>
        </div>

        {cast && cast.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500 uppercase font-bold tracking-widest">
              Top Cast
            </h3>
            <div ref={castContainerRef} className="flex flex-wrap gap-3">
              {cast.map((member, index) => (
                <div
                  key={index}
                  className="cast-pill flex items-center gap-3 bg-white/5 border border-white/5 pr-4 rounded-full hover:bg-white/10 transition-colors cursor-default"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10">
                    {member.imageUrl ? (
                      <Image
                        fill
                        src={member.imageUrl}
                        alt={member.name}
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
