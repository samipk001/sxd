import { cn } from "@/lib/utils";

export function LogoIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path d="M50 2 L10 25 L10 75 L50 98 L90 75 L90 25 Z" className="fill-primary" />
      <path d="M50 10 L18 30 L18 70 L50 90 L82 70 L82 30 Z" className="fill-background stroke-accent stroke-2" />
      <path d="M35 35 L65 65 M65 35 L35 65" className="stroke-primary" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
