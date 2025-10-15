import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { LogoIcon } from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Youtube, href: "#", name: "YouTube" },
    { icon: Twitter, href: "#", name: "Twitter" },
  ];
  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/admissions", label: "Admissions" },
    { href: "/blog", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ];
  const academicLinks = [
    { href: "/academics", label: "Primary School" },
    { href: "/academics", label: "Middle School" },
    { href: "/academics", label: "High School" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
                <div className="flex items-center gap-2">
                    <LogoIcon />
                    <span className="font-headline text-xl font-bold">St. Xavier's School</span>
                </div>
            </Link>
            <p className="text-sm mt-2 max-w-xs">A center for academic excellence and character formation in Deonia, Nepal. Motto: "Live for God, Lead for Nepal."</p>
             <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
             <h3 className="mb-4 font-headline text-lg font-semibold">Academics</h3>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 font-headline text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">Stay updated with our latest news.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Email" className="bg-background" />
              <Button type="submit" variant="default">Go</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} St. Xavier's School Deonia. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
