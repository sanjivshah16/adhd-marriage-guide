import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { bookSummary } from "@/data";
import { Link } from "wouter";

/* 
 * Tulum Sanctuary Summaries Page
 * - Book summaries with expandable sections
 * - Organic layout with warm colors
 * - Reading-focused typography
 */

export default function Summaries() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 right-10 w-48 h-48 bg-terracotta/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm">Back to Home</span>
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Book Summaries</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Understanding the <span className="text-terracotta">ADHD Effect</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Comprehensive summaries of key concepts and strategies for thriving in ADHD-affected relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-xl max-w-4xl"
          >
            <img 
              src="/images/hero-resources.png" 
              alt="Research and resources illustration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-8 md:py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-lg"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              {bookSummary.overview.title}
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {bookSummary.overview.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-8 md:py-12 pb-16 md:pb-24">
        <div className="container max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8"
          >
            Key Sections
          </motion.h2>
          
          <div className="space-y-4">
            {bookSummary.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div
                  className={`
                    bg-card rounded-2xl border border-border overflow-hidden
                    transition-all duration-500
                    ${expandedSection === section.id ? "shadow-xl" : "shadow-md hover:shadow-lg"}
                  `}
                >
                  <button
                    onClick={() => setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )}
                    className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        transition-colors duration-300
                        ${expandedSection === section.id 
                          ? "bg-terracotta text-cream" 
                          : "bg-terracotta/10 text-terracotta group-hover:bg-terracotta/20"
                        }
                      `}>
                        <span className="font-display text-lg font-semibold">{section.id}</span>
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-terracotta transition-colors duration-300">
                        {section.title}
                      </h3>
                    </div>
                    <ChevronRight className={`
                      w-5 h-5 text-muted-foreground flex-shrink-0
                      transition-transform duration-300
                      ${expandedSection === section.id ? "rotate-90" : ""}
                    `} />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSection === section.id ? "auto" : 0,
                      opacity: expandedSection === section.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="pl-14 border-l-2 border-terracotta/20">
                        <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-sand/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Take our 100-question quiz to reinforce what you've learned.
            </p>
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="bg-terracotta hover:bg-terracotta/90 text-cream font-body font-medium px-8 py-6 rounded-full"
              >
                Take the Quiz
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
