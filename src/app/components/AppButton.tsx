type AppButtonProps = {
  children: string;
  onClick?: () => void;
};

export default function AppButton({ children, onClick }: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        group relative inline-flex items-center justify-center select-none
        rounded-[2rem] p-[2px]                                  /* gradient border thickness */
        text-[#00fffb] text-3xl md:text-4xl font-semibold tracking-wide
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00dffc]/60
        bg-[linear-gradient(135deg,#00dffc,#7df9ff,#ff71ce)]     /* NEON OUTLINE */
        shadow-[0_0_18px_rgba(0,223,252,0.15)]                   /* very soft outer glow */
        hover:shadow-[0_0_24px_rgba(255,113,206,0.18)]
        active:scale-[0.99]
      "
    >
      {/* inner surface (nearly transparent so the outline pops) */}
      <span
        className="
          rounded-[calc(2rem-2px)]
          px-8 py-5 md:px-12 md:py-6
          bg-[#11002a]/70 backdrop-blur-[1px]
          ring-1 ring-white/10
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
        "
      >
        {children}
      </span>

      {/* faint top highlight — keeps it nonchalant */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-[2rem]
          opacity-40 group-hover:opacity-50 transition
          bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_20%,transparent_55%)]
        "
      />
    </button>
  );
}
