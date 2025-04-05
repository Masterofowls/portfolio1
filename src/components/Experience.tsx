import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    period: '2023 - Present',
    description: [
      'Led a team of 5 developers in building a modern SaaS platform',
      'Improved application performance by 40% through code optimization',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    location: 'New York, NY',
    period: '2021 - 2023',
    description: [
      'Developed and maintained multiple client applications',
      'Designed and implemented RESTful APIs',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Frontend Developer',
    company: 'StartUp Inc',
    location: 'Austin, TX',
    period: '2019 - 2021',
    description: [
      'Built responsive web applications from scratch',
      'Collaborated with designers to implement pixel-perfect UI',
      'Integrated third-party APIs and services',
    ],
    technologies: ['React', 'JavaScript', 'SASS', 'Redux'],
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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function Experience() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Work Experience</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A timeline of my professional journey and the impactful projects I've worked on.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative space-y-8"
        >
          {/* Timeline Line */}
          <div className="absolute left-[16px] top-3 h-full w-px bg-border md:left-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={item}
              className="group relative md:group-even:text-right"
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-0 top-3 h-[9px] w-[9px] rounded-full border-2 border-accent bg-background transition-transform group-hover:scale-150 md:left-1/2 md:-ml-[4.5px]"
                whileHover={{ scale: 1.5 }}
              />

              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div className="rounded-lg border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-accent/25">
                  <div className="mb-4 flex flex-wrap items-center gap-4 md:justify-between">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-2 text-sm">
                    {exp.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="mr-2 mt-2 h-1 w-1 rounded-full bg-accent" />
                        {desc}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
