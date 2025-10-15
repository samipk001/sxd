import { Timestamp } from 'firebase/firestore';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  datePublished: Timestamp;
  author: string;
  category: "Events" | "Academics" | "Announcements" | string;
  imageUrl: string;
};
