
'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Megaphone, Quote, Star, MapPin, Phone, Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type BlogPost } from "@/lib/blog-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from "date-fns";

function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <section className="relative h-[80vh] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight">
          St. Xavier's School, Deonia
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-semibold text-accent">
          "Live for God, Lead for Nepal"
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full bg-gradient-to-r from-primary via-blue-500 to-accent text-primary-foreground font-headline font-bold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl relative group">
          <Link href="/admissions">
            <span className="relative flex items-center transition-all duration-300 group-hover:tracking-wider">
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

function AboutTeaserSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'students');
  return (
    <ScrollReveal>
      <section className="py-16 md:py-24 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Welcome to St. Xavier's</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              St. Xavier's School, Deonia, is a sanctuary of learning nestled in the heart of Nepal. We are dedicated to fostering intellectual growth, spiritual depth, and a commitment to national leadership, all guided by our motto.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is to provide an education that forms individuals of competence, conscience, and compassionate commitment.
            </p>
            <Button asChild variant="link" className="px-0 mt-4 text-base">
              <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
            {aboutImage && <Image src={aboutImage.imageUrl} alt={aboutImage.description} fill className="object-cover" data-ai-hint={aboutImage.imageHint} />}
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
            <Card className="overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-3 items-center">
                <div className="relative h-64 md:h-full w-full md:col-span-1">
                  {principalImage && <Image src={principalImage.imageUrl} alt="Message from the Principal" fill className="object-cover" data-ai-hint={principalImage.imageHint} />}
                </div>
                <div className="p-8 md:p-12 md:col-span-2">
                  <h2 className="font-headline text-3xl font-bold">A Message from the Principal</h2>
                  <blockquote className="mt-4 border-l-4 border-accent pl-4 italic text-muted-foreground">
                    "Welcome to St. Xavier's. Here, we don't just educate; we build character. Our goal is to nurture the leaders of tomorrow who are not only academically proficient but also morally grounded and socially responsible."
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

function NewsSection() {
    const firestore = useFirestore();
    const blogsQuery = useMemoFirebase(() =>
        firestore
            ? query(collection(firestore, 'blogs'), orderBy('datePublished', 'desc'), limit(5))
            : null,
        [firestore]
    );
    const { data: featuredPosts, isLoading } = useCollection<BlogPost>(blogsQuery);

    if (isLoading) {
        return (
            <section className="py-16 md:py-24 bg-background">
                <div className="container">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Latest News & Updates</h2>
                    <p className="mt-2 text-muted-foreground">Loading latest news...</p>
                </div>
            </section>
        );
    }
  
    if (!featuredPosts || featuredPosts.length === 0) {
      return null;
    }

  return (
    <ScrollReveal>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Latest News & Updates</h2>
              <p className="mt-2 text-muted-foreground">Stay informed about the latest happenings at our school.</p>
            </div>
            <Button asChild size="lg" className="mt-4 md:mt-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-accent text-primary-foreground font-headline font-bold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl relative group">
               <Link href="/blog">
                 <span className="transition-all duration-300 group-hover:tracking-wider">View All News</span>
               </Link>
            </Button>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {featuredPosts.map((post: BlogPost) => {
                return (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full overflow-hidden">
                        <CardContent className="p-0">
                          <Link href={`/blog/${post.slug || post.id}`}>
                            <div className="relative h-56 w-full">
                               <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div className="p-6">
                              <p className="text-sm text-muted-foreground">{post.datePublished ? format(post.datePublished.toDate(), 'MMMM dd, yyyy') : 'N/A'}</p>
                              <h3 className="mt-2 font-headline text-xl font-semibold leading-tight">{post.title}</h3>
                              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                              <span className="mt-4 inline-flex items-center text-primary font-semibold text-sm">Read More <ArrowRight className="ml-1 h-4 w-4" /></span>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
    </ScrollReveal>
  );
}

function EventsSection() {
  const events = [
    { date: "Oct 25", name: "Annual Sports Day", time: "9:00 AM" },
    { date: "Nov 14", name: "Children's Day Celebration", time: "10:00 AM" },
    { date: "Dec 15", name: "Parent-Teacher Meeting", time: "12:00 PM - 3:00 PM" },
    { date: "Dec 22", name: "Christmas Program", time: "5:00 PM" },
  ];

  return (
    <ScrollReveal>
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground text-center">Join us for our upcoming school events.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <Card key={event.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{event.date}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Aarav Sharma", role: "Alumni, Class of 2018", text: "St. Xavier's shaped me into the person I am today. The values and education I received are priceless.", imageId: "testimonial1" },
    { name: "Priya Gurung", role: "Parent", text: "The school provides a nurturing environment that encourages both academic and personal growth. We couldn't be happier.", imageId: "testimonial2" },
    { name: "Sanjay Thapa", role: "Alumni, Class of 2015", text: "A truly transformative experience. The motto 'Lead for Nepal' is something I carry with me every day in my career.", imageId: "testimonial1" },
  ];
  return (
    <ScrollReveal>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">What Our Community Says</h2>
          <p className="mt-2 text-muted-foreground text-center">Stories from our students, parents, and alumni.</p>
          <Carousel className="mt-12 w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                return(
                  <CarouselItem key={index}>
                    <Card className="bg-background">
                      <CardContent className="p-8 text-center">
                        <Quote className="mx-auto h-8 w-8 text-accent" fill="currentColor" />
                        <p className="mt-4 text-lg italic leading-relaxed">"{testimonial.text}"</p>
                        <div className="mt-6 flex justify-center items-center">
                          {image && (
                            <Avatar>
                              <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="ml-4 text-left">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </ScrollReveal>
  );
}

function GalleryTeaserSection() {
  const galleryImages = PlaceHolderImages.filter(p => ['captain', 'art', 'ceremony', 'students'].includes(p.id)).slice(0, 4);

  return (
    <ScrollReveal>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Glimpses of Xavier's</h2>
          <p className="mt-2 text-muted-foreground text-center">A snapshot of life, learning, and community at our school.</p>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group">
                <Link href="/gallery">
                  <Image src={image.imageUrl} alt={image.description} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={image.imageHint} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary via-blue-500 to-accent text-primary-foreground font-headline font-bold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl relative group">
              <Link href="/gallery">
                <Camera className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" /> 
                <span className="transition-all duration-300 group-hover:tracking-wider">View Full Gallery</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeaserSection />
      <PrincipalMessageSection />
      <NewsSection />
      <GalleryTeaserSection />
      <EventsSection />
      <TestimonialsSection />
    </>
  );
}
