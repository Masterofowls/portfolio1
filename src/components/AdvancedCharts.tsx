import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'chart.js/auto';
import { Button } from './ui/button';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

const skillsData: ChartData = {
  labels: ['React', 'TypeScript', 'Node.js', 'Python', 'Three.js', 'GraphQL'],
  datasets: [
    {
      label: 'Proficiency',
      data: [95, 90, 85, 80, 75, 85],
      backgroundColor: 'hsla(var(--accent) / 0.2)',
      borderColor: 'hsl(var(--accent))',
      borderWidth: 2,
    },
  ],
};

const experienceData: ChartData = {
  labels: ['Web Dev', 'Mobile Dev', 'UI/UX', 'Backend', 'DevOps', '3D Graphics'],
  datasets: [
    {
      label: 'Years of Experience',
      data: [5, 3, 4, 3, 2, 2],
      backgroundColor: [
        'hsla(var(--accent) / 0.8)',
        'hsla(var(--accent) / 0.7)',
        'hsla(var(--accent) / 0.6)',
        'hsla(var(--accent) / 0.5)',
        'hsla(var(--accent) / 0.4)',
        'hsla(var(--accent) / 0.3)',
      ],
      borderWidth: 0,
    },
  ],
};

const projectsData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Completed Projects',
      data: [4, 6, 8, 5],
      backgroundColor: 'hsla(var(--accent) / 0.2)',
      borderColor: 'hsl(var(--accent))',
      borderWidth: 2,
    },
  ],
};

const timelineData: ChartData = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [
    {
      label: 'Career Growth',
      data: [60, 68, 75, 82, 88, 95],
      backgroundColor: 'hsla(var(--accent) / 0.2)',
      borderColor: 'hsl(var(--accent))',
      borderWidth: 2,
    },
  ],
};

type ChartType = 'radar' | 'bar' | 'line' | 'doughnut';

interface ChartConfig {
  type: ChartType;
  data: ChartData;
  title: string;
  description: string;
}

const charts: ChartConfig[] = [
  {
    type: 'radar',
    data: skillsData,
    title: 'Technical Skills',
    description: 'Comprehensive overview of technical proficiency across different technologies',
  },
  {
    type: 'doughnut',
    data: experienceData,
    title: 'Experience Distribution',
    description: 'Years of experience in different areas of software development',
  },
  {
    type: 'bar',
    data: projectsData,
    title: 'Project Completion',
    description: 'Number of projects completed per quarter in the last year',
  },
  {
    type: 'line',
    data: timelineData,
    title: 'Career Progress',
    description: 'Professional growth and skill development over time',
  },
];

export function AdvancedCharts() {
  const [activeChart, setActiveChart] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const currentChart = charts[activeChart];

    chartInstance.current = new Chart(ctx, {
      type: currentChart.type,
      data: currentChart.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: currentChart.type === 'radar' || currentChart.type === 'doughnut'
          ? undefined
          : {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'hsl(var(--border) / 0.2)',
                },
                ticks: {
                  color: 'hsl(var(--muted-foreground))',
                },
              },
              x: {
                grid: {
                  color: 'hsl(var(--border) / 0.2)',
                },
                ticks: {
                  color: 'hsl(var(--muted-foreground))',
                },
              },
            },
        plugins: {
          legend: {
            display: currentChart.type === 'doughnut',
            position: 'bottom',
            labels: {
              color: 'hsl(var(--foreground))',
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activeChart]);

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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Skills & Experience</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A visual representation of my professional journey and technical expertise.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Chart Navigation */}
          <div className="space-y-4 md:pt-8">
            {charts.map((chart, index) => (
              <motion.button
                key={chart.title}
                onClick={() => setActiveChart(index)}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  activeChart === index
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold">{chart.title}</h3>
                <p className="text-sm text-muted-foreground">{chart.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Chart Display */}
          <div className="relative col-span-2 aspect-[4/3] rounded-lg border bg-card p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChart}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="h-full w-full"
              >
                <canvas ref={chartRef} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button variant="gradient" size="lg" asChild>
            <a href="/resume.pdf" download>
              Download Full Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
