import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Heart,
  Code,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: Github,
    description: 'Check out my open source projects',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: Twitter,
    description: 'Follow me for tech updates',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
    description: 'Connect with me professionally',
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
];

const technologies = [
  { name: 'Astro', url: 'https://astro.build' },
  { name: 'React', url: 'https://react.dev' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
  { name: 'Framer Motion', url: 'https://www.framer.com/motion' },
  { name: 'Lucide Icons', url: 'https://lucide.dev' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              A passionate web developer creating modern and responsive web applications
              with a focus on user experience and performance.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-accent"
                    title={link.description}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    <span>{item.value}</span>
                  </div>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-accent"
                        title={item.label}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Technologies Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technologies</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {technologies.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-accent"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for the latest updates and tech insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <button className="rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground hover:bg-accent/90">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>using</span>
            <Code className="h-4 w-4 text-accent" />
            <span>and</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

