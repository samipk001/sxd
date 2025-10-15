"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type BlogPost } from "@/lib/blog-data";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

function PageHeader() {
  const headerImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <section className="relative h-64 w-full">
      {headerImage && <Image src={headerImage.imageUrl} alt={headerImage.description} fill className="object-cover -z-10 parallax" data-ai-hint={headerImage.imageHint}/>}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">News & Events</h1>
      </div>
    </section>
  );
}

export default function BlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All Categories');
    const firestore = useFirestore();

    const blogsCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        let q = query(collection(firestore, 'blogs'), orderBy('datePublished', 'desc'));
        if (category !== 'All Categories') {
            q = query(q, where('category', '==', category));
        }
        return q;
    }, [firestore, category]);

    const { data: blogPosts, isLoading } = useCollection<BlogPost>(blogsCollection);

    const categories = ["All Categories", "Events", "Academics", "Announcements"];

    const filteredPosts = blogPosts?.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

  return (
    <>
      <PageHeader />
      <section className="py-16 md:py-24">
        <div className="container">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
                <div className="w-full md:w-1/2">
                    <Input 
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            {isLoading && <p>Loading posts...</p>}

            {!isLoading && filteredPosts && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => {
                        return (
                            <Card key={post.id} className="overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <Link href={`/blog/${post.slug || post.id}`} className="flex flex-col h-full">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm text-primary font-semibold">{post.category}</p>
                                        <h3 className="mt-2 font-headline text-xl font-semibold leading-tight flex-grow">{post.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                                        <p className="mt-4 text-xs text-muted-foreground">
                                            {post.datePublished ? format(post.datePublished.toDate(), 'MMMM dd, yyyy') : 'N/A'} &bull; by {post.author}
                                        </p>
                                    </CardContent>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            )}

            {!isLoading && (!filteredPosts || filteredPosts.length === 0) && (
                <div className="text-center py-16">
                    <h3 className="font-headline text-2xl">No posts found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
                </div>
            )}
        </div>
      </section>
    </>
  );
}
