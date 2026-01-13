import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb, Filter, Grid, Layers } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { keyTakeaways, takeawayCategories } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* 
 * Tulum Sanctuary Key Takeaways Page
 * - 40 visual cards with generated images
 * - Swipeable gallery with smooth transitions
 * - Grid and single card view modes
 */

export default function Takeaways() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");

  const filteredTakeaways = useMemo(() => {
    if (selectedCategory === "All") return keyTakeaways;
    return keyTakeaways.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  const currentTakeaway = filteredTakeaways[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredTakeaways.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage mb-6">
              <Lightbulb className="w-4 h-4" />
              <span className="font-body text-sm font-medium">40 Key Insights</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Key <span className="text-sage">Takeaways</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Essential insights beautifully illustrated. Flip through these cards to reinforce your learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-6xl">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px] rounded-full border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {takeawayCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "single" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("single")}
                className={`rounded-full ${viewMode === "single" ? "bg-sage hover:bg-sage/90" : ""}`}
              >
                <Layers className="w-4 h-4 mr-2" />
                Cards
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-full ${viewMode === "grid" ? "bg-sage hover:bg-sage/90" : ""}`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
            </div>
          </motion.div>

          {/* Single Card View */}
          {viewMode === "single" && (
            <>
              <div className="flex items-center justify-center mb-4">
                <span className="font-body text-sm text-muted-foreground">
                  {currentIndex + 1} of {filteredTakeaways.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTakeaway.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={currentTakeaway.image}
                        alt={currentTakeaway.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-cream/90 text-charcoal font-body text-xs font-medium mb-2">
                          {currentTakeaway.category}
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-cream">
                          {currentTakeaway.title}
                        </h2>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <p className="font-body text-lg text-foreground leading-relaxed">
                        {currentTakeaway.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="rounded-full px-8"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={currentIndex === filteredTakeaways.length - 1}
                  className="rounded-full px-8 bg-sage hover:bg-sage/90 text-cream"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap max-w-md mx-auto">
                {filteredTakeaways.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${index === currentIndex 
                        ? "bg-sage w-6" 
                        : "bg-muted hover:bg-sage/50"
                      }
                    `}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTakeaways.map((takeaway, index) => (
                <motion.div
                  key={takeaway.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setViewMode("single");
                  }}
                  className="group cursor-pointer"
                >
                  <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-sage/30">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={takeaway.image}
                        alt={takeaway.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-cream/90 text-charcoal font-body text-xs font-medium mb-1">
                          {takeaway.category}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-cream line-clamp-2">
                          {takeaway.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Content preview */}
                    <div className="p-4">
                      <p className="font-body text-sm text-muted-foreground line-clamp-2">
                        {takeaway.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
