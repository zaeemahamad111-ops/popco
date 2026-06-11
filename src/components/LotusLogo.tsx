"use client";

interface LotusSVGProps {
  size?: number;
  color?: string;
}

export function LotusSVG({ size = 40, color = "#C9A14A" }: LotusSVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center tall petal */}
      <path
        d="M30 7 C27 15 27 22 30 28 C33 22 33 15 30 7Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper-left petal */}
      <path
        d="M13 13 C18 19 23 24 30 27 C26 20 20 14 13 13Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper-right petal */}
      <path
        d="M47 13 C42 19 37 24 30 27 C34 20 40 14 47 13Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left petal */}
      <path
        d="M6 28 C13 26 21 27 30 31 C22 34 13 33 6 28Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right petal */}
      <path
        d="M54 28 C47 26 39 27 30 31 C38 34 47 33 54 28Z"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base arc */}
      <path
        d="M18 40 Q30 52 42 40"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LotusLogoProps {
  size?: number;
  color?: string;
  showText?: boolean;
  darkText?: boolean;
  centered?: boolean;
  className?: string;
}

export default function LotusLogo({
  size = 40,
  color = "#C9A14A",
  showText = true,
  darkText = true,
  centered = false,
  className = "",
}: LotusLogoProps) {
  if (centered) {
    return (
      <div className={`flex flex-col items-center text-center leading-none ${className}`}>
        {/* ESTD - LotusSVG - 2025 */}
        <div className="flex items-center gap-[6px] mb-[6px] justify-center select-none">
          <span className="text-[7px] tracking-[0.25em] font-light text-muted uppercase">ESTD</span>
          <LotusSVG size={size} color={color} />
          <span className="text-[7px] tracking-[0.25em] font-light text-muted uppercase">2025</span>
        </div>
        {/* POPCO® and PREMIUM POPCORN */}
        {showText && (
          <div className="flex flex-col leading-none gap-[3px]">
            <span
              className="font-sans font-bold tracking-[0.25em] text-sm leading-none"
              style={{ color: darkText ? "#111111" : "#F8F7F4" }}
            >
              POPCO®
            </span>
            <span
              className="text-[6.5px] tracking-[0.2em] font-light leading-none"
              style={{ color }}
            >
              PREMIUM POPCORN
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LotusSVG size={size} color={color} />
      {showText && (
        <div className="flex flex-col leading-none gap-[3px]">
          <span
            className="font-sans font-bold tracking-[0.22em] text-xl leading-none"
            style={{ color: darkText ? "#111111" : "#F8F7F4" }}
          >
            POPCO
          </span>
          <span
            className="text-[8px] tracking-[0.22em] font-light leading-none"
            style={{ color }}
          >
            PREMIUM POPCORN
          </span>
        </div>
      )}
    </div>
  );
}
