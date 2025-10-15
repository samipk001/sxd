export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: "Events" | "Academics" | "Announcements";
  imageId: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Annual Sports Day 2023: A Day of Triumph and Team Spirit",
    slug: "annual-sports-day-2023",
    excerpt: "The grounds of St. Xavier's buzzed with excitement during our Annual Sports Day. Students showcased exceptional talent and sportsmanship.",
    date: "October 26, 2023",
    author: "School Administration",
    category: "Events",
    imageId: "blog1",
  },
  {
    id: 2,
    title: "Inter-House Science Fair Fosters Innovation",
    slug: "inter-house-science-fair-2023",
    excerpt: "Our young scientists presented groundbreaking projects at the annual science fair, from renewable energy models to AI-powered robots.",
    date: "October 15, 2023",
    author: "Science Department",
    category: "Academics",
    imageId: "blog3",
  },
  {
    id: 3,
    title: "Admissions Open for the 2024-2025 Academic Year",
    slug: "admissions-open-2024-2025",
    excerpt: "We are pleased to announce that admissions are now open for the upcoming academic session. Learn more about the application process and deadlines.",
    date: "October 5, 2023",
    author: "Admissions Office",
    category: "Announcements",
    imageId: "gallery1",
  },
  {
    id: 4,
    title: "Community Outreach: Tree Plantation Drive",
    slug: "tree-plantation-drive",
    excerpt: "In line with our motto 'Lead for Nepal', our students participated in a massive tree plantation drive, contributing to a greener community.",
    date: "September 22, 2023",
    author: "Social Service Club",
    category: "Events",
    imageId: "blog2",
  },
  {
    id: 5,
    title: "Welcoming Our New Principal",
    slug: "welcoming-new-principal",
    excerpt: "St. Xavier's School is delighted to welcome Fr. John Doe, S.J. as our new Principal. We look forward to his leadership and vision.",
    date: "September 1, 2023",
    author: "School Administration",
    category: "Announcements",
    imageId: "principal",
  },
];
