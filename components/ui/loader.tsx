"use client";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-500">
      <div className="loader"></div>

      <p className="text-blue-400/80 text-sm font-medium tracking-widest uppercase animate-pulse">
        Analyzing Cinematic Data...
      </p>

      <style jsx>{`
        .loader {
          width: 25px;
          height: 50px;
          display: grid;
          /* Updated color to match your Gemini blue */
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
      `}</style>
    </div>
  );
}
