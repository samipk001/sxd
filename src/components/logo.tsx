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
        src="https://storage.googleapis.com/st-xavier-s-deonia-images/logo.png"
        alt="St. Xavier's School Deonia Logo"
        width={160}
        height={160}
        className="object-contain"
      />
    </div>
  );
}
