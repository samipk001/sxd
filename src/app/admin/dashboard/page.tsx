'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Newspaper, Bell, GalleryVertical, Users } from 'lucide-react';
import Link from 'next/link';

const dashboardItems = [
  { title: 'Manage Blogs', icon: Newspaper, href: '/admin/dashboard/blogs', description: 'Create, edit, and delete blog posts.' },
  { title: 'Popup Notices', icon: Bell, href: '/admin/dashboard/notices', description: 'Manage site-wide popup notifications.' },
  { title: 'Update Gallery', icon: GalleryVertical, href: '/admin/dashboard/gallery', description: 'Add or remove images from the school gallery.' },
  { title: 'Edit Staff', icon: Users, href: '/admin/dashboard/staff', description: 'Update information about staff members.' },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map(item => (
            <Link href={item.href} key={item.title}>
                <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">...</div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
