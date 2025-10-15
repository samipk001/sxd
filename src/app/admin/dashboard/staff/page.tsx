'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function StaffAdminPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Staff</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">No staff profiles yet. Add one to get started.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add/Update Staff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Staff member's name" />
            </div>
             <div>
              <Label htmlFor="title">Title/Position</Label>
              <Input id="title" placeholder="e.g., Head of Physics" />
            </div>
            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" placeholder="Short biography..."/>
            </div>
            <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input id="photo" placeholder="https://example.com/photo.jpg" />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="staff@example.com" />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
