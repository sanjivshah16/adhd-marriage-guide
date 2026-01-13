import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb, Filter, Grid, Layers, Heart, Keyboard } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { keyTakeaways, takeawayCategories } from "@/data";
import OptimizedImage, { useImagePreloader } from "@/components/OptimizedImage";
import { useLocalStorage, FavoritesState, initialFavorites } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
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
 * - Swipe gestures for mobile navigation
 * - Keyboard navigation (arrow keys)
 * - Favorites feature with local storage
 * - Grid and single card view modes
 * - Lazy loading for grid view
 * - Image preloading for smooth card navigation
 */

export default function Takeaways() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Favorites stored in localStorage
  const [favorites, setFavorites] = useLocalStorage<FavoritesState>("adhd-takeaway-favorites", initialFavorites);

  // Swipe handling
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const filteredTakeaways = useMemo(() => {
    let filtered = keyTakeaways;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    if (showFavoritesOnly) {
      filtered = filtered.filter(t => favorites.favoriteIds.includes(t.id));
    }
    
    return filtered;
  }, [selectedCategory, showFavoritesOnly, favorites.favoriteIds]);

  const currentTakeaway = filteredTakeaways[currentIndex] || filteredTakeaways[0];

  // Get all image URLs for preloading
  const imageUrls = useMemo(() => 
    filteredTakeaways.map(t => t.image), 
    [filteredTakeaways]
  );

  // Preload adjacent images for smooth navigation
  useImagePreloader(imageUrls, currentIndex, 2);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredTakeaways.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, filteredTakeaways.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
  };

  // Toggle favorite
  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const isFavorite = prev.favoriteIds.includes(id);
      const newFavoriteIds = isFavorite
        ? prev.favoriteIds.filter(fid => fid !== id)
        : [...prev.favoriteIds, id];
      
      toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
        duration: 2000,
      });
      
      return {
        favoriteIds: newFavoriteIds,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, [setFavorites]);

  const isFavorite = currentTakeaway ? favorites.favoriteIds.includes(currentTakeaway.id) : false;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "single") return;
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        if (currentTakeaway) {
          toggleFavorite(currentTakeaway.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handleNext, handlePrevious, currentTakeaway, toggleFavorite]);

  // Swipe gesture handling
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      handleNext();
    } else if (offset > threshold || velocity > 500) {
      handlePrevious();
    }
  };

  // Reset index if it's out of bounds after filtering
  useEffect(() => {
    if (currentIndex >= filteredTakeaways.length) {
      setCurrentIndex(Math.max(0, filteredTakeaways.length - 1));
    }
  }, [filteredTakeaways.length, currentIndex]);

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
            
            {/* Keyboard hint */}
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Keyboard className="w-4 h-4" />
              <span>Use arrow keys to navigate, F to favorite</span>
            </div>
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
            <div className="flex items-center gap-3 flex-wrap">
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
              
              {/* Favorites filter */}
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`rounded-full ${showFavoritesOnly ? "bg-terracotta hover:bg-terracotta/90" : ""}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
                Favorites ({favorites.favoriteIds.length})
              </Button>
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

          {/* Empty state */}
          {filteredTakeaways.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No favorites yet
              </h3>
              <p className="font-body text-muted-foreground mb-4">
                Click the heart icon on cards to add them to your favorites.
              </p>
              <Button
                variant="outline"
                onClick={() => setShowFavoritesOnly(false)}
                className="rounded-full"
              >
                View all cards
              </Button>
            </motion.div>
          )}

          {/* Single Card View with Swipe */}
          {viewMode === "single" && filteredTakeaways.length > 0 && (
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
                  className="max-w-2xl mx-auto touch-pan-y"
                  style={{ x, rotate, opacity }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                >
                  <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                    {/* Image with skeleton and preloading */}
                    <div className="relative">
                      <OptimizedImage
                        src={currentTakeaway.image}
                        alt={currentTakeaway.title}
                        aspectRatio="aspect-[4/3]"
                        priority={true}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Favorite button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(currentTakeaway.id);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-cream/90 hover:bg-cream transition-colors"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors ${
                            isFavorite ? "fill-terracotta text-terracotta" : "text-charcoal"
                          }`} 
                        />
                      </button>
                      
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
                  
                  {/* Swipe hint for mobile */}
                  <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
                    Swipe left or right to navigate
                  </p>
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

          {/* Grid View with Lazy Loading */}
          {viewMode === "grid" && filteredTakeaways.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTakeaways.map((takeaway, index) => {
                const isCardFavorite = favorites.favoriteIds.includes(takeaway.id);
                
                return (
                  <motion.div
                    key={takeaway.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                    className="group cursor-pointer"
                  >
                    <div 
                      onClick={() => {
                        setCurrentIndex(index);
                        setViewMode("single");
                      }}
                      className="bg-card rounded-2xl border border-border shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-sage/30"
                    >
                      {/* Image with lazy loading and skeleton */}
                      <div className="relative">
                        <OptimizedImage
                          src={takeaway.image}
                          alt={takeaway.title}
                          aspectRatio="aspect-[4/3]"
                          className="transition-transform duration-500 group-hover:scale-105"
                          priority={index < 6}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(takeaway.id);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-cream/90 hover:bg-cream transition-colors opacity-0 group-hover:opacity-100"
                          aria-label={isCardFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors ${
                              isCardFavorite ? "fill-terracotta text-terracotta" : "text-charcoal"
                            }`} 
                          />
                        </button>
                        
                        {/* Show heart if favorited */}
                        {isCardFavorite && (
                          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-cream/90 group-hover:opacity-0 transition-opacity">
                            <Heart className="w-4 h-4 fill-terracotta text-terracotta" />
                          </div>
                        )}
                        
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
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
