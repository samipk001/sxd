import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Contact Us | Xavier's Deonia Hub",
};

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <section className="relative h-96 w-full">
      {headerImage && <Image src={headerImage.imageUrl} alt="Map" fill className="object-cover" data-ai-hint={headerImage.imageHint}/>}
      <div className="absolute inset-0 bg-primary/40" />
    </section>
  );
}

export default function ContactPage() {
  const contactDetails = [
    { icon: MapPin, title: "Address", content: "St. Xavier's School, Deonia, Jhapa, Nepal" },
    { icon: Phone, title: "Phone", content: "+977-123-456789" },
    { icon: Mail, title: "Email", content: "info@stxaviersdeonia.edu.np" },
  ];
  return (
    <>
      <PageHeader />
      <ScrollReveal>
        <section className="py-16 md:py-24 -mt-32 relative z-10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-background p-8 rounded-lg shadow-lg">
                  <h2 className="font-headline text-3xl font-bold">Get In Touch</h2>
                  <p className="text-muted-foreground mt-2">We'd love to hear from you. Please fill out the form or use the contact details provided.</p>
                  <div className="space-y-6 mt-8">
                      {contactDetails.map(detail => (
                          <div key={detail.title} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                                  <detail.icon className="w-5 h-5"/>
                              </div>
                              <div>
                                  <h3 className="font-semibold">{detail.title}</h3>
                                  <p className="text-muted-foreground">{detail.content}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="lg:col-span-2 bg-background p-8 rounded-lg shadow-lg">
                  <h3 className="font-headline text-2xl font-bold">Send us a Message</h3>
                  <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
