
export const BackgroundAura = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#040617_45%)]" />
    <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-sky-500/30 blur-[120px]" />
    <div className="pointer-events-none absolute right-0 top-64 h-72 w-72 rounded-full bg-purple-500/30 blur-[120px]" />
  </>
);
