'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BlogsAdminPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {/* List of blogs will go here */}
            <p className="text-muted-foreground">No blog posts yet. Add one to get started.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Blog post title" />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Write your blog post here..." />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Author's name" />
            </div>
             <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Events, Academics" />
            </div>
            <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="https://example.com/image.jpg" />
            </div>
            <Button>Add Post</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
