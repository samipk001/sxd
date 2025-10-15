import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award, BookOpen, Dna, Palette } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Academics | Xavier's Deonia Hub",
};

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <section className="relative h-64 w-full">
      {headerImage && <Image src={headerImage.imageUrl} alt={headerImage.description} fill className="object-cover -z-10 parallax" data-ai-hint={headerImage.imageHint}/>}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">Academics & Curriculum</h1>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const curriculum = [
    {
      grade: "Primary School (Grades 1-5)",
      details: "Our primary curriculum focuses on foundational learning in languages, mathematics, science, and social studies. We emphasize hands-on activities, creativity, and moral science to build a strong base."
    },
    {
      grade: "Middle School (Grades 6-8)",
      details: "In middle school, students delve deeper into core subjects while being introduced to new disciplines like computer science and a third language. The curriculum is designed to encourage critical thinking and problem-solving skills."
    },
    {
      grade: "High School (Grades 9-10)",
      details: "The high school curriculum prepares students for national-level examinations. We offer a comprehensive range of subjects and provide specialized coaching and career counseling to help students excel."
    },
    {
      grade: "Higher Secondary (Grades 11-12)",
      details: "Our +2 program offers streams in Science and Management, aligned with the National Examination Board (NEB) of Nepal. We provide state-of-the-art labs, experienced faculty, and a rigorous academic program to prepare students for university and beyond."
    }
  ];

  return (
    <ScrollReveal>
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Our Curriculum</h2>
          <p className="mt-2 text-muted-foreground text-center">A holistic approach to education from primary to higher secondary levels.</p>
          <Accordion type="single" collapsible className="w-full mt-12">
            {curriculum.map(item => (
              <AccordionItem key={item.grade} value={item.grade}>
                <AccordionTrigger className="font-headline text-lg">{item.grade}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.details}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </ScrollReveal>
  );
}

function ExtracurricularSection() {
    const activities = [
        { icon: Award, title: "Sports", description: "Football, basketball, athletics, and more to promote physical fitness and teamwork." },
        { icon: Palette, title: "Arts & Culture", description: "Music, dance, drama, and fine arts clubs to nurture creativity." },
        { icon: Dna, title: "Science & Tech", description: "Robotics club, coding workshops, and science fairs to foster innovation." },
        { icon: BookOpen, title: "Literary Activities", description: "Debate, elocution, and creative writing to enhance communication skills." },
    ];
    return (
        <ScrollReveal>
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Beyond the Classroom</h2>
                    <p className="mt-2 text-muted-foreground text-center">We believe in the all-round development of our students.</p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {activities.map(activity => (
                            <Card key={activity.title} className="text-center p-6 bg-background shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                                    <activity.icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-semibold text-lg">{activity.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}

export default function AcademicsPage() {
  return (
    <>
      <PageHeader />
      <CurriculumSection />
      <ExtracurricularSection />
    </>
  );
}
