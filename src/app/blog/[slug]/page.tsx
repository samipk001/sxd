'use client';
import { useParams, notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { doc, collection, query, where, limit } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BlogPostClientPage } from './client-page';
import { type BlogPost } from '@/lib/blog-data';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();

  const blogQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'blogs'), where('slug', '==', slug), limit(1)) : null, [firestore, slug]);
  const { data: postData, isLoading: isPostLoading } = useCollection<BlogPost>(blogQuery);
  const post = postData?.[0];
  
  const relatedPostsQuery = useMemoFirebase(() => {
    if (!firestore || !post) return null;
    return query(collection(firestore, 'blogs'), where('category', '==', post.category), where('id', '!=', post.id), limit(2));
  }, [firestore, post]);

  const { data: relatedPosts, isLoading: areRelatedPostsLoading } = useCollection<BlogPost>(relatedPostsQuery);


  if (isPostLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find(p => p.id === 'hero');
  const authorImage = PlaceHolderImages.find(p => p.id === 'principal');
  
  return <BlogPostClientPage post={post} postImage={postImage} authorImage={authorImage} relatedPosts={relatedPosts || []} />;
}
