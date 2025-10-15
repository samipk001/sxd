'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Trash2, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const staffSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  title: z.string().min(3, 'Title is required.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
  photoUrl: z.string().url('Please enter a valid photo URL.'),
  email: z.string().email('Please enter a valid email.').optional().or(z.literal('')),
});

type StaffFormValues = z.infer<typeof staffSchema>;
type StaffDocument = StaffFormValues & { id: string };

export default function StaffAdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const staffCollection = useMemoFirebase(() => firestore ? collection(firestore, 'staff_profiles') : null, [firestore]);
  const { data: staffMembers, isLoading } = useCollection<StaffDocument>(staffCollection);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues & { id?: string }>({
    resolver: zodResolver(staffSchema),
  });

  const currentStaffId = watch('id');

  const onSubmit: SubmitHandler<StaffFormValues & { id?: string }> = async (data) => {
    if (!firestore) return;
    try {
      const { id, ...staffData } = data;
      if (id) {
        const staffRef = doc(firestore, 'staff_profiles', id);
        await updateDoc(staffRef, staffData);
        toast({ title: 'Success', description: 'Staff profile updated.' });
      } else {
        await addDoc(collection(firestore, 'staff_profiles'), staffData);
        toast({ title: 'Success', description: 'Staff profile added.' });
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
    reset({ id: undefined, name: '', title: '', bio: '', photoUrl: '', email: '' });
  }

  const handleEdit = (staff: StaffDocument) => {
    setValue('id', staff.id);
    setValue('name', staff.name);
    setValue('title', staff.title);
    setValue('bio', staff.bio);
    setValue('photoUrl', staff.photoUrl);
    setValue('email', staff.email);
  };
  
  const handleDelete = async (staffId: string) => {
    if (!firestore || !confirm('Are you sure you want to delete this profile?')) return;
    try {
      await deleteDoc(doc(firestore, 'staff_profiles', staffId));
      toast({ title: 'Success', description: 'Staff profile deleted.' });
       if(currentStaffId === staffId) resetForm();
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
            <CardTitle>Current Staff</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading staff...</p>
            ) : staffMembers && staffMembers.length > 0 ? (
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="flex items-center gap-4 p-2 border rounded-md">
                     <Avatar className="h-12 w-12">
                        <AvatarImage src={staff.photoUrl} alt={staff.name} />
                        <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{staff.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(staff)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(staff.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No staff profiles yet. Add one to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{currentStaffId ? 'Edit' : 'Add'} Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Staff member's name" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="title">Title/Position</Label>
                <Input id="title" placeholder="e.g., Head of Physics" {...register('title')} />
                 {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Short biography..." {...register('bio')} />
                 {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
              </div>
              <div>
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input id="photoUrl" placeholder="https://example.com/photo.jpg" {...register('photoUrl')} />
                 {errors.photoUrl && <p className="text-sm text-destructive">{errors.photoUrl.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="staff@example.com" {...register('email')} />
                 {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
               <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Profile'}</Button>
                 {currentStaffId && <Button variant="ghost" onClick={resetForm}>Cancel</Button>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
