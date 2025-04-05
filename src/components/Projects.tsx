import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Button } from './ui/button';

interface Project {
  title: string;
  description: string;
  gradient: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    description: "A modern web application built with React and TypeScript",
    gradient: "from-accent/30 via-accent/20 to-accent/10",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/username/project1",
    demo: "https://project1.demo"
  },
  {
    title: "Project Two",
    description: "An interactive 3D visualization using Three.js",
    gradient: "from-primary/30 via-primary/20 to-primary/10",
    tags: ["Three.js", "WebGL", "React Three Fiber"],
    github: "https://github.com/username/project2",
    demo: "https://project2.demo"
  },
  // Add more projects as needed
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function Projects() {
  return (
    <section id="projects" className="bg-background py-20">
      <div className="container px-4">
        <motion.h2
          className="mb-12 text-center font-heading text-4xl font-bold bg-gradient-to-r from-foreground to-accent/80 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
              variants={projectVariants}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <div className="h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,var(--accent-color),transparent_100%)]" 
                    style={{
                      '--accent-color': 'hsl(var(--accent) / 0.1)'
                    } as React.CSSProperties} 
                  />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 font-heading text-xl font-semibold">
                  {project.title}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {project.description}
                </p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent hover:bg-accent/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiGithub className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
