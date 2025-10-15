'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function GalleryAdminPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Gallery Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
           <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" placeholder="https://example.com/image.jpg" />
            </div>
             <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="e.g., Annual Sports Day" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Events, Sports" />
            </div>
            <Button>Add Image</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">No gallery images yet. Add one to get started.</p>
        </CardContent>
      </Card>
    </div>
  );
}
