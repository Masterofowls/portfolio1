import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Modern Web Applications with React and TypeScript',
    excerpt: 'Learn how to leverage the power of React and TypeScript to build scalable web applications.',
    date: '2025-03-28',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    category: 'Development',
    slug: 'building-modern-web-applications',
  },
  {
    id: 2,
    title: 'The Future of Web Animation with Framer Motion',
    excerpt: 'Explore the possibilities of creating fluid animations using Framer Motion in React.',
    date: '2025-03-21',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e',
    category: 'Design',
    slug: 'future-of-web-animation',
  },
  {
    id: 3,
    title: 'Optimizing Performance in Next.js Applications',
    excerpt: 'Best practices and techniques for improving the performance of your Next.js applications.',
    date: '2025-03-14',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Performance',
    slug: 'optimizing-nextjs-performance',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Blog() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest Blog Posts</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Insights and articles about web development, design, and technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              className="group relative overflow-hidden rounded-lg border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <div className="relative p-6">
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>

                <Button
                  variant="link"
                  className="group/link flex items-center gap-1 p-0 text-accent"
                  asChild
                >
                  <a href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="/blog">View All Posts</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
