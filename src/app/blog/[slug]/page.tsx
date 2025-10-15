import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blogPosts } from '@/lib/blog-data';
import { BlogPostClientPage } from './client-page';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

function getPostData(slug: string) {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return null;
    
    const postImage = PlaceHolderImages.find(p => p.id === 'hero');
    const authorImage = PlaceHolderImages.find(p => p.id === 'principal');
    const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0,2);
    
    return { post, postImage, authorImage, relatedPosts };
}

export async function generateStaticParams() {
    return blogPosts.map(post => ({
        slug: post.slug,
    }));
}

// Note: generateMetadata is not a client component feature.
// To use it, we would need to fetch data twice.
// For this prototype, we will rely on client-side fetching.

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const data = getPostData(params.slug);

  if (!data) {
    notFound();
  }
  
  return <BlogPostClientPage {...data} />;
}
