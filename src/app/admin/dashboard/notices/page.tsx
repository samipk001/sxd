'use client';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const noticeSchema = z.object({
  title: z.string().min(5, 'Title is required.'),
  message: z.string().min(10, 'Message is required.'),
  isActive: z.boolean().default(false),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;
type NoticeDocument = NoticeFormValues & { id: string; startDate: any, endDate: any };

export default function NoticesAdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const noticesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'popup_notices') : null, [firestore]);
  const { data: notices, isLoading } = useCollection<NoticeDocument>(noticesCollection);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormValues & { id?: string }>({
    resolver: zodResolver(noticeSchema),
    defaultValues: { isActive: false },
  });
  
  const currentNoticeId = watch('id');

  const onSubmit: SubmitHandler<NoticeFormValues & { id?: string }> = async (data) => {
    if (!firestore) return;
    try {
      const { id, ...noticeData } = data;
      const date = new Date();
      if (id) {
        const noticeRef = doc(firestore, 'popup_notices', id);
        await updateDoc(noticeRef, noticeData);
        toast({ title: 'Success', description: 'Notice updated.' });
      } else {
        await addDoc(collection(firestore, 'popup_notices'), {
          ...noticeData,
          startDate: date,
          endDate: new Date(date.setDate(date.getDate() + 7)), // Default 1 week active
        });
        toast({ title: 'Success', description: 'Notice added.' });
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
    reset({ id: undefined, title: '', message: '', isActive: false });
  }

  const handleEdit = (notice: NoticeDocument) => {
    setValue('id', notice.id);
    setValue('title', notice.title);
    setValue('message', notice.message);
    setValue('isActive', notice.isActive);
  };
  
  const handleDelete = async (noticeId: string) => {
    if (!firestore || !confirm('Are you sure you want to delete this notice?')) return;
    try {
      await deleteDoc(doc(firestore, 'popup_notices', noticeId));
      toast({ title: 'Success', description: 'Notice deleted.' });
      if(currentNoticeId === noticeId) resetForm();
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
            <CardTitle>Existing Notices</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading notices...</p>
            ) : notices && notices.length > 0 ? (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{notice.title}</h3>
                        <Badge variant={notice.isActive ? 'default' : 'secondary'}>{notice.isActive ? 'Active' : 'Inactive'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notice.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(notice)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(notice.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No notices yet. Add one to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{currentNoticeId ? 'Edit' : 'Add New'} Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Notice title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your notice message..." {...register('message')} />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <Switch
                      id="is-active"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is-active">Activate Notice</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (currentNoticeId ? 'Update Notice' : 'Add Notice')}</Button>
                {currentNoticeId && <Button variant="ghost" onClick={resetForm}>Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
