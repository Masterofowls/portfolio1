import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Github, Linkedin, Twitter, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://github.com/username', label: 'GitHub', icon: 'github' },
  { href: 'https://linkedin.com/in/username', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://twitter.com/username', label: 'Twitter', icon: 'twitter' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
        isScrolled ? 'border-border shadow-lg' : 'border-transparent'
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.a
          href="/"
          className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-xl font-bold text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative text-muted-foreground transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Social Links - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            {socialLinks.map((link) => (
              <motion.a
                key={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-accent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon === 'github' && <Github className="h-5 w-5" />}
                {link.icon === 'linkedin' && <Linkedin className="h-5 w-5" />}
                {link.icon === 'twitter' && <Twitter className="h-5 w-5" />}
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile Menu Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center gap-4 pt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.icon}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      {link.icon === 'github' && <Github className="h-5 w-5" />}
                      {link.icon === 'linkedin' && <Linkedin className="h-5 w-5" />}
                      {link.icon === 'twitter' && <Twitter className="h-5 w-5" />}
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
