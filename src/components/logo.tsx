"use client"
import Image from 'next/image';
import { cn } from "@/lib/utils";

export function LogoIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative w-12 h-12", className)}
      {...props}
    >
      <Image
        src="https://i.postimg.cc/f3qdk52P/logo.jpg"
        alt="St. Xavier's School Deonia Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
