import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
// Removing OrbitControls for simpler animation
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating envelope model
    const envelopeGeometry = new THREE.BoxGeometry(2, 1.5, 0.2);
    const flapGeometry = new THREE.ConeGeometry(1, 1, 4, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x88ff88,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    });

    const envelope = new THREE.Group();

    const box = new THREE.Mesh(envelopeGeometry, material);
    envelope.add(box);

    const flap = new THREE.Mesh(flapGeometry, material);
    flap.rotation.z = Math.PI;
    flap.position.y = 0.75;
    flap.scale.set(1, 0.75, 0.2);
    envelope.add(flap);

    scene.add(envelope);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: new THREE.Color(0x88ff88),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x88ff88, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // Simple rotation animation
    envelope.rotation.y = 0;
    envelope.rotation.x = 0.2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      envelope.rotation.y += 0.005;
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
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
      envelopeGeometry.dispose();
      flapGeometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid gap-8 rounded-lg border bg-card/50 p-8 backdrop-blur supports-[backdrop-filter]:bg-card/30 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="h-5 w-5" />
                  hello@example.com
                </motion.a>
                <motion.a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                  whileHover={{ x: 4 }}
                >
                  <Phone className="h-5 w-5" />
                  +1 (234) 567-890
                </motion.a>
                <motion.div
                  className="flex items-center gap-3 text-muted-foreground"
                  whileHover={{ x: 4 }}
                >
                  <MapPin className="h-5 w-5" />
                  San Francisco, CA
                </motion.div>
              </div>

              <div className="relative mt-8 aspect-square">
                <div ref={containerRef} className="h-full w-full" />
              </div>
            </div>

            {/* Contact Form */}
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-md border border-border bg-card px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-md border border-border bg-card px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="message"
                      required
                      rows={4}
                      className="w-full rounded-md border border-border bg-card px-4 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center space-y-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="rounded-full bg-accent/10 p-4 text-accent"
                  >
                    <Send className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute right-0 top-0 h-[20rem] w-[20rem] translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-10 blur-[100px]" />
        <div className="absolute left-0 bottom-0 h-[20rem] w-[20rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary opacity-10 blur-[100px]" />
      </div>
    </section>
  );
}
