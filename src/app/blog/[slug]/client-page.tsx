"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { type BlogPost } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll } from 'framer-motion';

type BlogPostClientPageProps = {
  post: BlogPost;
  postImage: ImagePlaceholder | undefined;
  authorImage: ImagePlaceholder | undefined;
  relatedPosts: BlogPost[];
};

export function BlogPostClientPage({ post, postImage, authorImage, relatedPosts }: BlogPostClientPageProps) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-[0%]"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="bg-secondary">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to News</Link>
            </Button>

            <main>
              <article>
                <header className="mb-8">
                  <p className="text-accent font-semibold">{post.category}</p>
                  <h1 className="font-headline text-3xl md:text-5xl font-bold mt-2">{post.title}</h1>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                           {authorImage && (
                              <Avatar className="h-8 w-8">
                                  <AvatarImage src={authorImage.imageUrl} alt={post.author} data-ai-hint={authorImage.imageHint} />
                                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                           )}
                           <span>{post.author}</span>
                      </div>
                     <span>&bull;</span>
                     <time dateTime={post.date}>{post.date}</time>
                  </div>
                </header>

                {postImage && (
                  <div className="relative h-[450px] w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                    <Image src={postImage.imageUrl} alt={post.title} fill className="object-cover" priority data-ai-hint={postImage.imageHint}/>
                  </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed">
                  <p className="lead text-xl">{post.excerpt}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                  <blockquote className="border-l-4 border-accent pl-4 italic">
                      "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
                  </blockquote>
                  <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                </div>
              </article>
            </main>

            <div className="mt-16">
                <h2 className="font-headline text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedPosts.map(relatedPost => {
                        const relatedImage = PlaceHolderImages.find(p => p.id === 'hero');
                        return(
                            <Card key={relatedPost.id} className="overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <Link href={`/blog/${relatedPost.slug}`}>
                                  <div className="relative h-48 w-full">
                                      {relatedImage && <Image src={relatedImage.imageUrl} alt={relatedPost.title} fill className="object-cover" data-ai-hint={relatedImage.imageHint}/>}
                                  </div>
                                  <CardContent className="p-4">
                                      <h3 className="font-headline font-semibold leading-tight">{relatedPost.title}</h3>
                                      <p className="text-xs text-muted-foreground mt-2">{relatedPost.date}</p>
                                  </CardContent>
                                </Link>
                            </Card>
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
