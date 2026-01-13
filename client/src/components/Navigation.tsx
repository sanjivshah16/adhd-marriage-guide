import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Brain, Heart, BookOpen, FileText, Lightbulb, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* 
 * Tulum Sanctuary Navigation
 * - Organic, warm aesthetic with botanical accents
 * - Smooth transitions (400-600ms) for meditative feel
 * - Mobile-first with hamburger menu
 */

const navItems = [
  { path: "/", label: "Home", icon: Heart },
  { path: "/summaries", label: "Summaries", icon: BookOpen },
  { path: "/quiz", label: "Quiz", icon: Brain },
  { path: "/takeaways", label: "Key Insights", icon: Lightbulb },
  { path: "/resources", label: "Resources", icon: FileText },
  { path: "/tools", label: "Tools", icon: Wrench },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Heart className="w-5 h-5 text-cream" />
            </div>
            <span className="font-display text-lg md:text-xl font-semibold text-foreground hidden sm:block">
              ADHD Marriage Guide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    relative px-4 py-2 rounded-full font-body text-sm font-medium
                    transition-all duration-400
                    ${isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive = location === item.path;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-body
                        transition-all duration-300
                        ${isActive 
                          ? "text-primary bg-primary/10 font-medium" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
