import { motion } from 'framer-motion';
import { Code2, Palette, Wrench, Sparkles, Laptop, Globe } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  description: string;
  level: number;
  tags: string[];
}

const skills: Skill[] = [
  {
    name: 'Frontend Development',
    icon: Code2,
    description: 'Building responsive and accessible web applications',
    level: 90,
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'UI/UX Design',
    icon: Palette,
    description: 'Creating beautiful and intuitive user interfaces',
    level: 85,
    tags: ['Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
  },
  {
    name: 'Backend Development',
    icon: Wrench,
    description: 'Developing robust server-side applications',
    level: 80,
    tags: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'],
  },
  {
    name: 'Performance Optimization',
    icon: Sparkles,
    description: 'Optimizing web applications for speed and efficiency',
    level: 75,
    tags: ['Webpack', 'Lighthouse', 'Core Web Vitals', 'SEO'],
  },
  {
    name: 'DevOps',
    icon: Laptop,
    description: 'Managing deployment and infrastructure',
    level: 70,
    tags: ['Docker', 'CI/CD', 'AWS', 'Kubernetes'],
  },
  {
    name: 'Internationalization',
    icon: Globe,
    description: 'Building multilingual applications',
    level: 65,
    tags: ['i18n', 'RTL Support', 'Content Translation', 'Cultural Adaptation'],
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

export function Skills() {
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Technical Skills</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A comprehensive overview of my technical expertise and professional capabilities
            in web development and design.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-colors hover:bg-accent/5"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-2 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>

                <p className="mb-4 text-sm text-muted-foreground">{skill.description}</p>

                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground transition-colors group-hover:bg-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-accent/50" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
