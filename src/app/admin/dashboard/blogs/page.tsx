'use client';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import Image from 'next/image';

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(20, 'Content must be at least 20 characters.'),
  category: z.string().min(3, 'Category is required.'),
  imageUrl: z.string().url('Please enter a valid URL.'),
});

type BlogFormValues = z.infer<typeof blogSchema>;
type BlogDocument = BlogFormValues & { id: string; author: string; datePublished: any };

export default function BlogsAdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  const blogsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'blogs') : null, [firestore]);
  const { data: blogs, isLoading } = useCollection<BlogDocument>(blogsCollection);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues & { id?: string }>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      imageUrl: '',
    },
  });
  
  const currentBlogId = watch('id');

  const onSubmit: SubmitHandler<BlogFormValues & { id?: string }> = async (data) => {
    if (!firestore || !user) return;
    try {
      const { id, ...blogData } = data;
      if (id) {
        // Update existing blog
        const blogRef = doc(firestore, 'blogs', id);
        await updateDoc(blogRef, {
          ...blogData,
          author: user.email || 'Admin',
        });
        toast({ title: 'Success', description: 'Blog post updated.' });
      } else {
        // Add new blog
        await addDoc(collection(firestore, 'blogs'), {
          ...blogData,
          author: user.email || 'Admin',
          datePublished: serverTimestamp(),
          slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        });
        toast({ title: 'Success', description: 'Blog post added.' });
      }
      resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };
  
  const resetForm = () => {
    reset({ id: undefined, title: '', content: '', category: '', imageUrl: '' });
  }

  const handleEdit = (blog: BlogDocument) => {
    setValue('id', blog.id);
    setValue('title', blog.title);
    setValue('content', blog.content);
    setValue('category', blog.category);
    setValue('imageUrl', blog.imageUrl);
  };
  
  const handleDelete = async (blogId: string) => {
    if (!firestore || !confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(firestore, 'blogs', blogId));
      toast({ title: 'Success', description: 'Blog post deleted.' });
      if(currentBlogId === blogId) resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading posts...</p>
            ) : blogs && blogs.length > 0 ? (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="flex items-center gap-4 p-2 border rounded-md">
                    <Image src={blog.imageUrl} alt={blog.title} width={100} height={60} className="object-cover rounded-md aspect-video" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground">{blog.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(blog)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(blog.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No blog posts yet. Add one to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{currentBlogId ? 'Edit' : 'Add New'} Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Blog post title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your blog post here..." {...register('content')} />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Events, Academics" {...register('category')} />
                {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" placeholder="https://example.com/image.jpg" {...register('imageUrl')} />
                {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl.message}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (currentBlogId ? 'Update Post' : 'Add Post')}</Button>
                {currentBlogId && <Button variant="ghost" onClick={resetForm}>Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
