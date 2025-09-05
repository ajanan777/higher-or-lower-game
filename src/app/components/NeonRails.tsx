export default function NeonRails() {
  return (
    <>
      <svg
        className="pointer-events-none absolute left-6 top-1/2 z-0 hidden -translate-y-1/2 md:block h-[76vh] w-10"
        viewBox="0 0 20 760"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="railCyan"
            x1="10"
            y1="0"
            x2="10"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7DF9FF" />
            <stop offset="1" stopColor="#00DFFC" />
          </linearGradient>
          <filter
            id="railGlowCyan"
            x="-200%"
            y="-5%"
            width="500%"
            height="110%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          d="M10 0 L10 760"
          stroke="url(#railCyan)"
          strokeWidth="12"
          opacity="0.35"
          filter="url(#railGlowCyan)"
        />
        <path
          d="M10 0 L10 760"
          stroke="url(#railCyan)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 0 L10 760"
          stroke="url(#railCyan)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="120 340"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-460"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        <g opacity="0.25">
          {[...Array(18)].map((_, i) => {
            const y = 20 + i * 40;
            return (
              <line
                key={i}
                x1="2"
                x2="18"
                y1={y}
                y2={y}
                stroke="#7DF9FF"
                strokeWidth="1"
              >
                <animate
                  attributeName="opacity"
                  values="0.15;0.35;0.15"
                  dur="4s"
                  begin={`${i * 0.12}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>
      </svg>

      {/* RIGHT animated neon rail */}
      <svg
        className="pointer-events-none absolute right-6 top-1/2 z-0 hidden -translate-y-1/2 md:block h-[76vh] w-10"
        viewBox="0 0 20 760"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="railMagenta"
            x1="10"
            y1="0"
            x2="10"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF71CE" />
            <stop offset="1" stopColor="#7DF9FF" />
          </linearGradient>
          <filter
            id="railGlowMagenta"
            x="-200%"
            y="-5%"
            width="500%"
            height="110%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          d="M10 0 L10 760"
          stroke="url(#railMagenta)"
          strokeWidth="12"
          opacity="0.35"
          filter="url(#railGlowMagenta)"
        />
        <path
          d="M10 0 L10 760"
          stroke="url(#railMagenta)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 0 L10 760"
          stroke="url(#railMagenta)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="120 340"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="460"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        <g opacity="0.25">
          {[...Array(18)].map((_, i) => {
            const y = 40 + i * 40;
            return (
              <line
                key={i}
                x1="2"
                x2="18"
                y1={y}
                y2={y}
                stroke="#FF71CE"
                strokeWidth="1"
              >
                // @ts-expect-error SVG animate element not in IntrinsicElements
                <animate
                  attributeName="opacity"
                  values="0.15;0.35;0.15"
                  dur="4s"
                  begin={`${i * 0.12 + 0.6}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>
      </svg>
    </>
  );
}
