import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const metadata = {
  title: "Admissions | Xavier's Deonia Hub",
};

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'gallery1');
  return (
    <section className="relative h-64 w-full parallax">
      {headerImage && <Image src={headerImage.imageUrl} alt={headerImage.description} fill className="object-cover -z-10" data-ai-hint={headerImage.imageHint}/>}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">Admissions</h1>
      </div>
    </section>
  );
}

function AdmissionProcessSection() {
  const steps = [
    { step: 1, title: "Online Application", description: "Fill out the online admission form available on our website and upload the required documents." },
    { step: 2, title: "Entrance Examination", description: "Eligible candidates will be invited for an entrance test covering core subjects." },
    { step: 3, title: "Parent-Student Interview", description: "Shortlisted candidates and their parents will be called for an interview with the admission committee." },
    { step: 4, title: "Admission Offer", description: "Successful candidates will receive an admission offer. Fees must be paid within the specified deadline to secure the seat." },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Admission Process</h2>
        <p className="mt-2 text-muted-foreground text-center">A simple, transparent process to join our family.</p>
        <div className="mt-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          {steps.map((step, index) => (
            <div key={step.step} className={`flex md:items-center my-8 flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="md:w-5/12">
                <div className={`p-6 bg-secondary rounded-lg shadow-sm ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="font-headline text-xl font-bold">Step {step.step}: {step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="hidden md:block md:w-2/12">
                <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-primary border-4 border-secondary"></div>
                </div>
              </div>
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Apply Now</Button>
        </div>
      </div>
    </section>
  );
}

function FeeStructureSection() {
    const fees = [
        { grade: "Grade 1-5", admission: "NPR 20,000", monthly: "NPR 5,000" },
        { grade: "Grade 6-8", admission: "NPR 25,000", monthly: "NPR 6,500" },
        { grade: "Grade 9-10", admission: "NPR 30,000", monthly: "NPR 8,000" },
        { grade: "Grade 11-12 (Science)", admission: "NPR 40,000", monthly: "NPR 10,000" },
        { grade: "Grade 11-12 (Management)", admission: "NPR 35,000", monthly: "NPR 9,000" },
    ];
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Fee Structure</h2>
        <p className="mt-2 text-muted-foreground text-center">Affordable fees for quality education. (All amounts are in NPR)</p>
        <Table className="mt-8 bg-background rounded-lg shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Grade Level</TableHead>
              <TableHead className="font-semibold">Admission Fee (One-time)</TableHead>
              <TableHead className="font-semibold">Monthly Tuition Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map(fee => (
              <TableRow key={fee.grade}>
                <TableCell>{fee.grade}</TableCell>
                <TableCell>{fee.admission}</TableCell>
                <TableCell>{fee.monthly}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground mt-4 text-center">* Additional fees for transportation, uniforms, and extracurricular activities may apply.</p>
      </div>
    </section>
  );
}

function VirtualTourSection() {
    const panoramicImages = [
        PlaceHolderImages.find(p => p.id === 'pano1'),
        PlaceHolderImages.find(p => p.id === 'pano2'),
    ].filter(Boolean);

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Virtual School Tour</h2>
                <p className="mt-2 text-muted-foreground text-center">Explore our campus from the comfort of your home.</p>
                <Carousel className="mt-12 w-full max-w-6xl mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                        {panoramicImages.map((image, index) => image && (
                            <CarouselItem key={index}>
                                <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint}/>
                                    <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                                        <h3 className="text-white font-headline text-2xl">{image.description}</h3>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader />
      <AdmissionProcessSection />
      <FeeStructureSection />
      <VirtualTourSection />
    </>
  );
}
