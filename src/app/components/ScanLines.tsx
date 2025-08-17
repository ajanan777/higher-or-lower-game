type ScanLinesProps = {
  lines: boolean;
};

export default function ScanLines({ lines }: ScanLinesProps) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-cyber animate-gradient"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-neon-grid
                        [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
                        [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      {lines && (
        <>
          {/* down */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 z-0 h-2 -top-6
                                bg-gradient-to-r from-cyan-400/0 via-cyan-300/70 to-fuchsia-500/0
                                blur-md animate-scan mix-blend-screen [animation-delay:-3s]"
          />
          {/* up */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 z-0 h-2 -top-6
                                bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-300/70 to-cyan-400/0
                                blur-md animate-scan-up mix-blend-screen [animation-delay:1.5s]"
          />
          {/* left → right */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-y-0 left-0 z-0 w-2
                                bg-gradient-to-b from-transparent via-violet-300/70 to-transparent
                                blur-md animate-scan-right mix-blend-screen [animation-delay:-2s]"
          />
          {/* right → left */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-y-0 right-0 z-0 w-2
                                bg-gradient-to-b from-transparent via-lime-300/70 to-transparent
                                blur-md animate-scan-left mix-blend-screen [animation-delay:.5s]"
          />
        </>
      )}
    </>
  );
}
