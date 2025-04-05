import { motion } from 'framer-motion';
import { Code2, Palette, Globe, Wrench, Zap, LineChart } from 'lucide-react';
import { Button } from './ui/button';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building modern, responsive websites and web applications.',
    features: [
      'Custom website development',
      'Progressive web applications',
      'E-commerce solutions',
      'Content management systems',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating beautiful and intuitive user interfaces.',
    features: [
      'User interface design',
      'User experience optimization',
      'Design systems',
      'Interactive prototypes',
    ],
  },
  {
    icon: Globe,
    title: 'Full Stack Development',
    description: 'End-to-end development of web applications.',
    features: [
      'Frontend development',
      'Backend development',
      'API integration',
      'Database design',
    ],
  },
  {
    icon: Wrench,
    title: 'Technical Consulting',
    description: 'Expert advice on technical solutions and architecture.',
    features: [
      'Technology stack selection',
      'Architecture planning',
      'Code review',
      'Performance optimization',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Improving website speed and performance.',
    features: [
      'Load time optimization',
      'Core Web Vitals',
      'SEO optimization',
      'Caching strategies',
    ],
  },
  {
    icon: LineChart,
    title: 'Analytics & SEO',
    description: 'Improving visibility and tracking performance.',
    features: [
      'Search engine optimization',
      'Performance monitoring',
      'User behavior analysis',
      'Conversion optimization',
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute left-0 top-0 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[20rem] w-[20rem] translate-x-1/2 translate-y-1/2 rounded-full bg-primary opacity-10 blur-[100px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Comprehensive web development and design services to bring your digital vision to life.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                className="group relative overflow-hidden rounded-lg border bg-card/50 p-6 backdrop-blur supports-[backdrop-filter]:bg-card/30"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-lg bg-accent/10 p-2.5 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>

                <p className="mb-4 text-muted-foreground">{service.description}</p>

                <ul className="mb-4 space-y-2">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <Button
                  variant="link"
                  className="group/link flex items-center gap-1 p-0 text-accent"
                  asChild
                >
                  <a href="#contact">
                    Learn More
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      →
                    </motion.span>
                  </a>
                </Button>

                <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-accent/50" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button size="lg" variant="gradient" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
