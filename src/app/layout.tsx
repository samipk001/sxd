import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/chatbot";
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: "Xavier's Deonia Hub",
  description: "St. Xavier's School Deonia: Live for God, Lead for Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&family=Lora:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <FirebaseClientProvider>
          <SmoothScrollProvider>
            <div className="flex min-h-screen flex-col" style={{ perspective: '1px' }}>
              <Header />
              <main className="flex-1 preserve-3d">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <Chatbot />
          </SmoothScrollProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
