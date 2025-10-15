'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function NoticesAdminPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Notices</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">No notices yet. Add one to get started.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add New Notice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Notice title" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your notice message..."/>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="is-active" />
                <Label htmlFor="is-active">Activate Notice</Label>
            </div>
            <Button>Add Notice</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
