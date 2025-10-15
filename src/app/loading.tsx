import { LogoIcon } from "@/components/logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <LogoIcon className="h-24 w-24 animate-pulse-glow drop-shadow-[0_0_20px_hsl(var(--accent))]" />
      </div>
      <p className="mt-6 font-headline text-xl text-primary animate-pulse opacity-75 tracking-wider">
        Live for God, Lead for Nepal...
      </p>
    </div>
  );
}
