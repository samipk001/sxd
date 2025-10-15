import { LogoIcon } from "@/components/logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <LogoIcon className="h-24 w-24 animate-pulse-glow" />
        <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ boxShadow: '0 0 80px 20px hsl(var(--accent))' }}/>
      </div>
      <p className="mt-6 font-headline text-xl text-primary animate-pulse opacity-75 tracking-wider">
        Live for God, Lead for Nepal...
      </p>
    </div>
  );
}
