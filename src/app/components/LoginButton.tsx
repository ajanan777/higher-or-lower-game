type LoginButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  shape?: "rounded" | "square";
};

export default function LoginButton({
  children,
  onClick,
  shape = "rounded",
}: LoginButtonProps) {
  const borderShape = shape === "rounded" ? "rounded-[2rem]" : "rounded-none";
  const innerShape =
    shape === "rounded" ? "rounded-[calc(2rem-2px)]" : "rounded-none";

  return (
    <button
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center select-none
        ${borderShape} p-[2px]
        text-[#00fffb] text-3xl md:text-4xl font-semibold tracking-wide
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00dffc]/60
        bg-[linear-gradient(135deg,#00dffc,#7df9ff,#ff71ce)]
        shadow-[0_0_18px_rgba(0,223,252,0.15)]
        hover:shadow-[0_0_24px_rgba(255,113,206,0.18)]
        active:scale-[0.99]
      `}
    >
      <span
        className={`
            ${innerShape}
            flex items-center gap-2   // align text + icon
            px-4 py-2 md:px-6 md:py-3
            bg-[#11002a]/70 backdrop-blur-[1px]
            ring-1 ring-white/10
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
        `}
      >
        {children}
      </span>

      <span
        aria-hidden
        className={`
          pointer-events-none absolute inset-0 ${borderShape}
          opacity-40 group-hover:opacity-50 transition
          bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_20%,transparent_55%)]
        `}
      />
    </button>
  );
}
