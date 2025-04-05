import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'chart.js/auto';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Three.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'GraphQL', level: 85 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 80 },
      { name: 'Testing', level: 85 },
    ],
  },
];

export function Charts() {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const charts: Chart[] = [];

    skillCategories.forEach((category, index) => {
      const ctx = chartRefs.current[index]?.getContext('2d');
      if (!ctx) return;

      const chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: category.skills.map(skill => skill.name),
          datasets: [
            {
              label: category.name,
              data: category.skills.map(skill => skill.level),
              backgroundColor: 'hsl(var(--accent) / 0.2)',
              borderColor: 'hsl(var(--accent))',
              borderWidth: 2,
              pointBackgroundColor: 'hsl(var(--accent))',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'hsl(var(--accent))',
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                display: false,
              },
              grid: {
                color: 'hsl(var(--border) / 0.5)',
              },
              angleLines: {
                color: 'hsl(var(--border) / 0.5)',
              },
              pointLabels: {
                color: 'hsl(var(--foreground))',
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      charts.push(chart);
    });

    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, []);

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
            A comprehensive overview of my technical expertise across different domains.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-lg border bg-card p-6"
            >
              <h3 className="mb-6 text-center text-xl font-semibold">{category.name}</h3>
              <div className="aspect-square">
                <canvas ref={el => (chartRefs.current[index] = el)} />
              </div>

              <div className="mt-6 space-y-4">
                {category.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
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
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
