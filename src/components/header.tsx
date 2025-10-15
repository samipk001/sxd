"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LogoIcon } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          "font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/60",
          className,
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b transition-all", isMounted && isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent border-transparent")}>
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <LogoIcon />
          <span className="hidden font-bold sm:inline-block font-headline text-lg text-primary">St. Xavier's School</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
           <Button asChild className="rounded-full font-bold shadow-sm">
              <Link href="#">Portal Login</Link>
           </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-6">
                 <Link href="/" className="flex items-center gap-2 mb-8">
                  <LogoIcon />
                  <span className="font-bold font-headline text-lg text-primary">St. Xavier's School</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} className="text-lg" />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
