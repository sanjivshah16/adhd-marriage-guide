import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { bookSummary } from "@/data";
import { Link } from "wouter";

/* 
 * Tulum Sanctuary Summaries Page
 * - Book summaries with expandable sections
 * - Proper rendering of numbered lists with correct sequential numbering
 * - Reading-focused typography
 */

// Function to render content with proper formatting for numbered lists
// This version properly handles numbered items with sub-bullets
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let elementKey = 0;

  // Track numbered items with their sub-bullets
  interface NumberedItem {
    number: string;
    text: string;
    subItems: string[];
  }
  
  let currentNumberedList: NumberedItem[] = [];
  let currentBulletList: string[] = [];
  let lastNumberedItem: NumberedItem | null = null;

  const flushNumberedList = () => {
    if (currentNumberedList.length > 0) {
      elements.push(
        <ol key={`ol-${elementKey++}`} className="space-y-3 my-4">
          {currentNumberedList.map((item, idx) => (
            <li key={idx} className="font-body text-muted-foreground leading-relaxed">
              <div className="flex gap-3">
                <span className="font-semibold text-foreground min-w-[1.5rem]">{item.number}.</span>
                <div className="flex-1">
                  <span>{item.text}</span>
                  {item.subItems.length > 0 && (
                    <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                      {item.subItems.map((subItem, subIdx) => (
                        <li key={subIdx} className="text-muted-foreground">{subItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      );
      currentNumberedList = [];
      lastNumberedItem = null;
    }
  };

  const flushBulletList = () => {
    if (currentBulletList.length > 0) {
      elements.push(
        <ul key={`ul-${elementKey++}`} className="list-disc list-outside ml-6 space-y-2 my-4">
          {currentBulletList.map((item, idx) => (
            <li key={idx} className="font-body text-muted-foreground leading-relaxed pl-2">
              {item}
            </li>
          ))}
        </ul>
      );
      currentBulletList = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    // Check for numbered list item (e.g., "1. ", "2. ", "10. ", etc.)
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    // Check for bullet/sub-item (e.g., "- ", "* ")
    const bulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
    
    if (numberedMatch) {
      // Flush any standalone bullet list first
      if (currentBulletList.length > 0 && !lastNumberedItem) {
        flushBulletList();
      }
      
      // If we have a current numbered item, save it
      if (lastNumberedItem) {
        currentNumberedList.push(lastNumberedItem);
      }
      
      // Start a new numbered item
      lastNumberedItem = {
        number: numberedMatch[1],
        text: numberedMatch[2],
        subItems: []
      };
    } else if (bulletMatch) {
      // This is a sub-item
      if (lastNumberedItem) {
        // Add as sub-item to current numbered item
        lastNumberedItem.subItems.push(bulletMatch[1]);
      } else {
        // Standalone bullet list
        flushNumberedList();
        currentBulletList.push(bulletMatch[1]);
      }
    } else if (trimmedLine === '') {
      // Empty line - might be separating sections
      // Save current numbered item if exists
      if (lastNumberedItem) {
        currentNumberedList.push(lastNumberedItem);
        lastNumberedItem = null;
      }
      // Don't flush yet - wait to see if more items follow
    } else {
      // Regular paragraph text
      // First, save any pending numbered item
      if (lastNumberedItem) {
        currentNumberedList.push(lastNumberedItem);
        lastNumberedItem = null;
      }
      
      // Flush lists
      flushNumberedList();
      flushBulletList();
      
      elements.push(
        <p key={`p-${elementKey++}`} className="font-body text-muted-foreground leading-relaxed mb-4">
          {trimmedLine}
        </p>
      );
    }
  });

  // Flush any remaining items
  if (lastNumberedItem) {
    currentNumberedList.push(lastNumberedItem);
  }
  flushNumberedList();
  flushBulletList();

  return elements;
}

export default function Summaries() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 -ml-3">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <span>/</span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              Book Summaries
            </span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Understanding the{" "}
              <span className="text-primary">ADHD Effect</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Comprehensive summaries of key concepts and strategies for thriving in ADHD-affected relationships. Now with 24 in-depth sections covering all aspects of the book.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar with image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img 
                    src="/images/hero-resources.png" 
                    alt="ADHD Marriage Resources"
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Overview Card */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {bookSummary.overview.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {bookSummary.overview.content}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sections List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                {bookSummary.sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * Math.min(index, 5) }}
                  >
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                        expandedSection === section.id
                          ? "bg-card border-primary/30 shadow-md"
                          : "bg-card/50 border-border hover:bg-card hover:border-primary/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            expandedSection === section.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent text-accent-foreground"
                          }`}>
                            {index + 1}
                          </span>
                          <h3 className="font-display text-lg font-medium text-foreground">
                            {section.title}
                          </h3>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                          expandedSection === section.id ? "rotate-90" : ""
                        }`} />
                      </div>
                    </button>
                    
                    {/* Expanded Content */}
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 p-6 bg-background rounded-xl border border-border/50"
                      >
                        <div className="prose prose-stone max-w-none">
                          {renderContent(section.content)}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 text-center"
              >
                <p className="font-body text-muted-foreground mb-4">
                  Ready to test your knowledge?
                </p>
                <Link href="/quiz">
                  <Button size="lg" className="gap-2">
                    Take the Quiz
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
