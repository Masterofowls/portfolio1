import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'Tech Innovators',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content:
      'Working with this developer was an absolute pleasure. Their attention to detail and ability to translate our vision into reality exceeded our expectations.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartUp Co',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content:
      'The level of expertise and professionalism demonstrated throughout our project was exceptional. They delivered a high-quality product on time and within budget.',
  },
  {
    id: 3,
    name: 'Emily Brown',
    role: 'Creative Director',
    company: 'Design Studio',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    content:
      'Their creative approach to problem-solving and ability to work collaboratively with our team made them an invaluable partner in our project.',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Client Testimonials</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear what my clients have to say about their experience working with me.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl px-4">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between">
            <button
              className="group rounded-full border bg-background p-3 shadow-lg transition-transform hover:scale-110"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
            </button>
            <button
              className="group rounded-full border bg-background p-3 shadow-lg transition-transform hover:scale-110"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
            </button>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                  <Quote className="mb-6 h-12 w-12 text-accent opacity-50" />
                  <p className="mb-8 text-lg md:text-xl">{testimonials[currentIndex].content}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="h-16 w-16 rounded-full border-2 border-accent/20"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-accent'
                    : 'bg-accent/20 hover:bg-accent/50'
                }`}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
