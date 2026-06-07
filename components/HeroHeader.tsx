import { ThemeToggle } from "./ThemeToggle";

export function HeroHeader() {
  return (
    <header className="relative text-center pt-8 pb-6 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <p className="text-sm text-neutral mb-3 tracking-wide">
        Real estimates • Updated 2026
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        How Much Water Did You Just Use?
      </h1>
      <p className="text-base sm:text-lg text-neutral max-w-2xl mx-auto leading-relaxed">
        Honest water estimates for AI and daily life — because moving fast is
        worth it, and the water returns to the cycle
      </p>
    </header>
  );
}