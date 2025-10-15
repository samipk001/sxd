import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "About Us | Xavier's Deonia Hub",
};

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'about');
  return (
    <section className="relative h-64 w-full parallax">
      {headerImage && <Image src={headerImage.imageUrl} alt={headerImage.description} fill className="object-cover -z-10" data-ai-hint={headerImage.imageHint} />}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">About St. Xavier's School</h1>
      </div>
    </section>
  );
}

function MissionVisionSection() {
    return(
        <ScrollReveal>
            <section className="py-16 md:py-24">
                <div className="container grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Our Mission & Vision</h2>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            Our mission is to form individuals who are men and women of competence, conscience, and compassionate commitment. We aim to cultivate a learning environment that encourages critical thinking, creativity, and a lifelong passion for learning.
                        </p>
                    </div>
                    <div>
                         <h3 className="font-headline text-2xl font-bold">"Live for God, Lead for Nepal"</h3>
                         <p className="mt-2 text-muted-foreground leading-relaxed">
                            This motto is the cornerstone of our educational philosophy. It inspires our students to achieve spiritual and moral growth while fostering a sense of duty and leadership to serve our nation with integrity and excellence.
                        </p>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}

function PrincipalMessageSection() {
  const principalImage = PlaceHolderImages.find(p => p.id === 'principal');
  return (
    <ScrollReveal>
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 items-center">
                <div className="relative h-64 md:h-full w-full md:col-span-1">
                  {principalImage && <Image src={principalImage.imageUrl} alt="Message from the Principal" fill className="object-cover" data-ai-hint={principalImage.imageHint} />}
                </div>
                <div className="p-8 md:p-12 md:col-span-2">
                  <h2 className="font-headline text-3xl font-bold">A Message from the Principal</h2>
                  <blockquote className="mt-4 border-l-4 border-accent pl-4 italic text-muted-foreground">
                    "Welcome to St. Xavier's. Here, we don't just educate; we build character. Our goal is to nurture the leaders of tomorrow who are not only academically proficient but also morally grounded and socially responsible. Join us in this journey of transformation."
                  </blockquote>
                  <p className="mt-4 font-semibold">Fr. John Doe, S.J.</p>
                  <p className="text-sm text-muted-foreground">Principal, St. Xavier's School, Deonia</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
    </ScrollReveal>
  );
}

function FacultySection() {
    const faculty = [
        { name: "Jane Smith", subject: "Head of Academics, Physics", imageId: "testimonial2" },
        { name: "Robert Johnson", subject: "Mathematics", imageId: "testimonial1" },
        { name: "Emily Davis", subject: "English Literature", imageId: "testimonial2" },
        { name: "Michael Brown", subject: "Head of Sports, P.E.", imageId: "testimonial1" },
    ];
    return (
        <ScrollReveal>
            <section className="py-16 md:py-24">
                <div className="container">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Our Dedicated Faculty</h2>
                    <p className="mt-2 text-muted-foreground text-center">Meet the educators shaping our students' futures.</p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {faculty.map(member => {
                            const image = PlaceHolderImages.find(p => p.id === member.imageId);
                            return (
                                <Card key={member.name} className="text-center p-6">
                                    <Avatar className="h-24 w-24 mx-auto">
                                        {image && <AvatarImage src={image.imageUrl} alt={member.name} data-ai-hint={image.imageHint} />}
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.subject}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </ScrollReveal>
    )
}

export default function AboutPage() {
  return (
    <>
      <PageHeader />
      <MissionVisionSection />
      <PrincipalMessageSection />
      <FacultySection />
    </>
  );
}
