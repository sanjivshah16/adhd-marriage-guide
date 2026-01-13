import { Link } from "wouter";
import { motion } from "framer-motion";
import { Brain, BookOpen, Lightbulb, FileText, Wrench, ArrowRight, Heart, Users, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

/* 
 * Tulum Sanctuary Home Page
 * - Organic asymmetric layout with botanical accents
 * - Warm terracotta, sage, sand, cream palette
 * - Meditative transitions (400-600ms)
 * - Playfair Display headings, Lato body
 */

const features = [
  {
    title: "Book Summaries",
    description: "Comprehensive summaries of key concepts and strategies for thriving in ADHD-affected relationships.",
    icon: BookOpen,
    href: "/summaries",
    color: "bg-sage/20 text-sage",
  },
  {
    title: "Knowledge Quiz",
    description: "Test your understanding with 100 multiple-choice questions and detailed explanations.",
    icon: Brain,
    href: "/quiz",
    color: "bg-terracotta/20 text-terracotta",
  },
  {
    title: "Key Insights",
    description: "40 beautifully designed cards with essential takeaways you can flip through.",
    icon: Lightbulb,
    href: "/takeaways",
    color: "bg-sand text-charcoal",
  },
  {
    title: "Resources",
    description: "27 curated academic resources, books, and articles with full summaries and links.",
    icon: FileText,
    href: "/resources",
    color: "bg-sage-light text-sage",
  },
  {
    title: "Helpful Tools",
    description: "Self-assessments, communication exercises, and daily reflection prompts.",
    icon: Wrench,
    href: "/tools",
    color: "bg-terracotta-light/30 text-terracotta",
  },
];

const stats = [
  { value: "4-5%", label: "of adults have ADHD" },
  { value: "58%", label: "of ADHD relationships are clinically dysfunctional" },
  { value: "2x", label: "higher divorce rate with ADHD" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-sage/30 rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-48 h-48 bg-terracotta/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="font-body text-sm font-medium">A Resource for Couples</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Navigating Love with{" "}
                <span className="text-terracotta">ADHD</span>
              </h1>
              
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Discover research-backed strategies, deepen your understanding, and rebuild connection 
                in your ADHD-affected relationship. Together, you can thrive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/summaries">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-cream font-body font-medium px-8 py-6 rounded-full transition-all duration-400 hover:shadow-lg hover:shadow-terracotta/20"
                  >
                    Start Learning
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-sage text-sage hover:bg-sage/10 font-body font-medium px-8 py-6 rounded-full transition-all duration-400"
                  >
                    Take the Quiz
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-charcoal/10">
                <img 
                  src="/images/hero-main.png" 
                  alt="Couple in peaceful Japandi setting"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>
              
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">6 Steps</p>
                    <p className="font-body text-sm text-muted-foreground">to a better relationship</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-sand/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-terracotta mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Everything You Need to{" "}
              <span className="text-sage">Understand & Heal</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Comprehensive resources designed to help couples navigate the unique challenges 
              of ADHD in marriage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={feature.href}>
                    <div className="group h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-terracotta/30 hover:shadow-xl hover:shadow-terracotta/5 transition-all duration-500 hover:-translate-y-1">
                      <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-terracotta transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-terracotta font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-sage/5 to-sand/30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-terracotta/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Ready to Transform Your Relationship?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Understanding is the first step. Take control of ADHD together and become 
              the partners you hoped to be.
            </p>
            <Link href="/summaries">
              <Button 
                size="lg" 
                className="bg-terracotta hover:bg-terracotta/90 text-cream font-body font-medium px-10 py-6 rounded-full transition-all duration-400 hover:shadow-lg hover:shadow-terracotta/20"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light flex items-center justify-center">
                <Heart className="w-4 h-4 text-cream" />
              </div>
              <span className="font-display text-sm font-medium text-foreground">
                ADHD Marriage Guide
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground text-center">
              A resource for couples navigating ADHD in relationships
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
