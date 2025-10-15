'use client';
import { useParams, notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlogPostClientPage } from './client-page';
import { type BlogPost } from '@/lib/blog-data';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();

  // Note: Firestore doesn't support querying by a field that isn't the document ID without an index.
  // This is a workaround for this prototype. In a real app, you'd either use the doc ID as the slug
  // or use a query with a 'where' clause on the slug field.
  // For now, we assume the slug is the document ID. This might fail if slugs and IDs don't match.
  const blogDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'blogs', slug) : null, [firestore, slug]);
  const { data: post, isLoading } = useDoc<BlogPost>(blogDocRef);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find(p => p.id === 'hero');
  const authorImage = PlaceHolderImages.find(p => p.id === 'principal');
  
  // This is mock data and should be replaced with a real query.
  const relatedPosts: BlogPost[] = []; 

  return <BlogPostClientPage post={post} postImage={postImage} authorImage={authorImage} relatedPosts={relatedPosts} />;
}
