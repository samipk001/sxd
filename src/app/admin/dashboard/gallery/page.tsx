'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const gallerySchema = z.object({
  imageUrl: z.string().url('Please enter a valid URL.'),
  description: z.string().min(3, 'Description is required.'),
  category: z.string().min(3, 'Category is required.'),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;
type GalleryDocument = GalleryFormValues & { id: string };

export default function GalleryAdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const galleryCollection = useMemoFirebase(() => firestore ? collection(firestore, 'gallery_images') : null, [firestore]);
  const { data: images, isLoading } = useCollection<GalleryDocument>(galleryCollection);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
  });

  const onSubmit: SubmitHandler<GalleryFormValues> = async (data) => {
    if (!firestore) return;
    try {
      await addDoc(collection(firestore, 'gallery_images'), {
        ...data,
        thumbnailUrl: data.imageUrl, // For simplicity, using same URL for thumbnail
        uploadDate: serverTimestamp(),
      });
      toast({ title: 'Success', description: 'Image added to gallery.' });
      reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };
  
  const handleDelete = async (imageId: string) => {
    if (!firestore || !confirm('Are you sure you want to delete this image?')) return;
    try {
      await deleteDoc(doc(firestore, 'gallery_images', imageId));
      toast({ title: 'Success', description: 'Image deleted.' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Gallery Image</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" placeholder="https://example.com/image.jpg" {...register('imageUrl')} />
              {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="e.g., Annual Sports Day" {...register('description')} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Events, Sports" {...register('category')} />
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Image'}</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading images...</p>
          ) : images && images.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="relative group">
                        <Image src={image.imageUrl} alt={image.description} width={300} height={200} className="rounded-md object-cover aspect-video"/>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white">
                           <p className="text-xs">{image.description}</p>
                           <Button variant="destructive" size="icon" className="self-end" onClick={() => handleDelete(image.id)}>
                               <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                    </div>
                ))}
             </div>
          ) : (
            <p className="text-muted-foreground">
              No gallery images yet. Add one to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
