import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Button } from './ui/button';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  modelUrl: string;
  demoUrl: string;
  githubUrl: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: '3D Portfolio Website',
    description: 'A modern portfolio website with Three.js animations and interactive 3D elements.',
    technologies: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Interactive 3D models',
      'Custom shaders and effects',
      'Responsive design',
      'Performance optimized',
    ],
    modelUrl: '/models/laptop.glb',
    demoUrl: 'https://demo.com/portfolio',
    githubUrl: 'https://github.com/username/portfolio',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with 3D product visualization.',
    technologies: ['Next.js', 'Three.js', 'GraphQL', 'Stripe'],
    features: [
      '3D product viewer',
      'AR product preview',
      'Real-time inventory',
      'Secure payments',
    ],
    modelUrl: '/models/store.glb',
    demoUrl: 'https://demo.com/ecommerce',
    githubUrl: 'https://github.com/username/ecommerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c',
  },
  {
    id: 3,
    title: 'Virtual Gallery',
    description: 'An immersive virtual art gallery with WebGL-powered 3D environments.',
    technologies: ['React', 'Three.js', 'WebGL', 'Firebase'],
    features: [
      'Virtual exhibitions',
      'Custom lighting',
      'Interactive artworks',
      'Social features',
    ],
    modelUrl: '/models/gallery.glb',
    demoUrl: 'https://demo.com/gallery',
    githubUrl: 'https://github.com/username/gallery',
    image: 'https://images.unsplash.com/photo-1561840923-81f45c9a6609',
  },
];

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !selectedProject.modelUrl) return;

    // Remove existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
    }

    // Load new model
    const loader = new GLTFLoader();
    loader.load(selectedProject.modelUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(2, 2, 2);
      sceneRef.current?.add(model);
      modelRef.current = model;
    });
  }, [selectedProject]);

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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore my latest projects with interactive 3D previews.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-lg border bg-card"
          >
            <div ref={containerRef} className="h-full w-full" />
          </motion.div>

          {/* Project Info */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-4 text-2xl font-bold">{selectedProject.title}</h3>
                <p className="mb-6 text-muted-foreground">{selectedProject.description}</p>

                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button variant="gradient" asChild>
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      View Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      Source Code
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative aspect-video overflow-hidden rounded-lg border ${
                  selectedProject.id === project.id
                    ? 'border-accent'
                    : 'border-border hover:border-accent/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-4 text-left">
                  <h4 className="mt-auto text-sm font-medium">{project.title}</h4>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
