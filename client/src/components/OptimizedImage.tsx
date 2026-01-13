import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* 
 * OptimizedImage Component
 * - Lazy loading with Intersection Observer
 * - Skeleton placeholder while loading
 * - Smooth fade-in animation when loaded
 * - Optional preloading for adjacent images
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean; // Load immediately without lazy loading
  onLoad?: () => void;
}

// Image preloader utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export function preloadImages(srcs: string[]): void {
  srcs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton placeholder */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-sand/50 via-sage/20 to-sand/50"
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
        
        {/* Placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-sage/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onLoad={handleLoad}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-sand/50">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-10 h-10 mx-auto mb-2 text-sage/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for preloading adjacent images in a carousel/gallery
export function useImagePreloader(
  images: string[],
  currentIndex: number,
  preloadCount: number = 2
) {
  useEffect(() => {
    const imagesToPreload: string[] = [];

    // Preload next images
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = currentIndex + i;
      if (nextIndex < images.length) {
        imagesToPreload.push(images[nextIndex]);
      }
    }

    // Preload previous images
    for (let i = 1; i <= preloadCount; i++) {
      const prevIndex = currentIndex - i;
      if (prevIndex >= 0) {
        imagesToPreload.push(images[prevIndex]);
      }
    }

    // Preload the images
    preloadImages(imagesToPreload);
  }, [images, currentIndex, preloadCount]);
}
