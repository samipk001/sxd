import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Megaphone, Quote, Star, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { ScrollReveal } from "@/components/scroll-reveal";

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
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/admissions">Enroll Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
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

function NewsSection() {
  const featuredPosts = blogPosts.slice(0, 5);

  return (
    <ScrollReveal>
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Latest News & Updates</h2>
              <p className="mt-2 text-muted-foreground">Stay informed about the latest happenings at our school.</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
               <Link href="/blog">View All News</Link>
            </Button>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {featuredPosts.map((post: BlogPost) => {
                const postImage = PlaceHolderImages.find(p => p.id === 'ceremony');
                return (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full overflow-hidden">
                        <CardContent className="p-0">
                          <Link href={`/blog/${post.slug}`}>
                            <div className="relative h-56 w-full">
                               {postImage && <Image src={postImage.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 hover:scale-105" data-ai-hint={postImage.imageHint} />}
                            </div>
                            <div className="p-6">
                              <p className="text-sm text-muted-foreground">{post.date}</p>
                              <h3 className="mt-2 font-headline text-xl font-semibold leading-tight">{post.title}</h3>
                              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeaserSection />
      <NewsSection />
      <EventsSection />
      <TestimonialsSection />
    </>
  );
}
