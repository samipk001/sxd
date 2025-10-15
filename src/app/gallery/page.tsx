"use client";

import Image from "next/image";
import { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type GalleryImage = {
  id: string;
  imageUrl: string;
  description: string;
  category: string;
}

const categories = ["All", "Events", "Sports", "Academics", "Campus"];

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <section className="relative h-64 w-full">
      {headerImage && <Image src={headerImage.imageUrl} alt={headerImage.description} fill className="object-cover -z-10 parallax" data-ai-hint={headerImage.imageHint}/>}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">School Gallery</h1>
      </div>
    </section>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const firestore = useFirestore();
  const galleryQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    if (filter === 'All') return collection(firestore, 'gallery_images');
    return query(collection(firestore, 'gallery_images'), where('category', '==', filter));
  }, [firestore, filter]);

  const { data: images, isLoading } = useCollection<GalleryImage>(galleryQuery);

  return (
    <>
      <PageHeader />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {isLoading && <p>Loading gallery...</p>}
          
          {!isLoading && images && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map(image => (
                <div key={image.id} className="break-inside-avoid" onClick={() => setSelectedImage(image)}>
                  <div className="relative w-full h-auto rounded-lg overflow-hidden cursor-pointer group shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={800}
                        height={600}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <p className="text-white text-sm font-semibold">{image.description}</p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0">
            {selectedImage && (
                <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                />
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
