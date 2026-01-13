import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb, Filter, Grid, Layers, Heart, Keyboard } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { keyTakeaways, takeawayCategories } from "@/data";
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
 * - Proper horizontal swipe gestures (card slides off, new card slides in)
 * - Keyboard navigation (arrow keys)
 * - Favorites feature with local storage
 * - Grid and single card view modes
 * - Simple eager image loading for reliability
 */

export default function Takeaways() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isDragging, setIsDragging] = useState(false);
  
  // Favorites stored in localStorage
  const [favorites, setFavorites] = useLocalStorage<FavoritesState>("adhd-takeaway-favorites", initialFavorites);

  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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

  // Preload adjacent images
  useEffect(() => {
    if (!currentTakeaway) return;
    
    const imagesToPreload: string[] = [];
    
    // Current image
    imagesToPreload.push(currentTakeaway.image);
    
    // Next 3 images
    for (let i = 1; i <= 3; i++) {
      const nextIndex = currentIndex + i;
      if (nextIndex < filteredTakeaways.length) {
        imagesToPreload.push(filteredTakeaways[nextIndex].image);
      }
    }
    
    // Previous 2 images
    for (let i = 1; i <= 2; i++) {
      const prevIndex = currentIndex - i;
      if (prevIndex >= 0) {
        imagesToPreload.push(filteredTakeaways[prevIndex].image);
      }
    }
    
    // Preload images
    imagesToPreload.forEach(src => {
      if (!loadedImages.has(src)) {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...Array.from(prev), src]));
        };
        img.src = src;
      }
    });
  }, [currentIndex, filteredTakeaways, currentTakeaway, loadedImages]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredTakeaways.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, filteredTakeaways.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
    setDirection(0);
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

  // Swipe gesture handling - proper horizontal swipe
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = Math.abs(info.velocity.x);
    const offset = info.offset.x;

    // Swipe left = next card
    if (offset < -threshold || (velocity > 300 && info.velocity.x < 0)) {
      if (currentIndex < filteredTakeaways.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
      }
    }
    // Swipe right = previous card
    else if (offset > threshold || (velocity > 300 && info.velocity.x > 0)) {
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  // Reset index if it's out of bounds after filtering
  useEffect(() => {
    if (currentIndex >= filteredTakeaways.length) {
      setCurrentIndex(Math.max(0, filteredTakeaways.length - 1));
    }
  }, [filteredTakeaways.length, currentIndex]);

  // Animation variants for horizontal swipe
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.95,
    }),
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

          {/* Single Card View with Proper Horizontal Swipe */}
          {viewMode === "single" && filteredTakeaways.length > 0 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <span className="font-body text-sm text-muted-foreground">
                  {currentIndex + 1} of {filteredTakeaways.length}
                </span>
              </div>

              {/* Card container with overflow hidden for swipe effect */}
              <div className="relative overflow-hidden max-w-2xl mx-auto">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentTakeaway.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    className="touch-pan-y cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                  >
                    <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
                      {/* Image - simple img tag for reliability */}
                      <div className="relative aspect-[4/3] bg-sand/30">
                        <img
                          src={currentTakeaway.image}
                          alt={currentTakeaway.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isDragging) {
                              toggleFavorite(currentTakeaway.id);
                            }
                          }}
                          className="absolute top-4 right-4 p-2 rounded-full bg-[#5E6F5B] hover:bg-[#5E6F5B]/90 transition-colors"
                          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart 
                            className={`w-5 h-5 transition-colors ${
                              isFavorite ? "fill-[#F5F1E8] text-[#F5F1E8]" : "text-[#F5F1E8]"
                            }`} 
                          />
                        </button>
                        
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#5E6F5B] text-[#F5F1E8] font-body text-xs font-medium mb-2">
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
              </div>
              
              {/* Swipe hint for mobile */}
              <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
                Swipe left or right to navigate
              </p>

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
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
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

          {/* Grid View - Simple image loading */}
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
                        setDirection(0);
                        setCurrentIndex(index);
                        setViewMode("single");
                      }}
                      className="bg-card rounded-2xl border border-border shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-sage/30"
                    >
                      {/* Image - simple img tag with lazy loading for grid */}
                      <div className="relative aspect-[4/3] bg-sand/30 overflow-hidden">
                        <img
                          src={takeaway.image}
                          alt={takeaway.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading={index < 6 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(takeaway.id);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#5E6F5B] hover:bg-[#5E6F5B]/90 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label={isCardFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors ${
                              isCardFavorite ? "fill-[#F5F1E8] text-[#F5F1E8]" : "text-[#F5F1E8]"
                            }`} 
                          />
                        </button>
                        
                        {/* Show heart if favorited */}
                        {isCardFavorite && (
                          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#5E6F5B] group-hover:opacity-0 transition-opacity">
                            <Heart className="w-4 h-4 fill-[#F5F1E8] text-[#F5F1E8]" />
                          </div>
                        )}
                        
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#5E6F5B] text-[#F5F1E8] font-body text-xs font-medium mb-1">
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
