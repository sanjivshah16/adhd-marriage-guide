import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Filter, Search, BookOpen, FileSearch, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { researchResources, resourceTypes } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* 
 * Tulum Sanctuary Resources Page
 * - Research library with 27 resources
 * - Filterable by type with search
 * - Full summaries visible
 */

const typeIcons: Record<string, typeof FileText> = {
  Research: FileSearch,
  Review: FileText,
  Book: BookOpen,
  Article: FileText,
  "Meta-analysis": FileSearch,
  Resource: ExternalLink,
  Organization: Building2,
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    let resources = researchResources;
    
    if (selectedType !== "All") {
      resources = resources.filter(r => r.type === selectedType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      resources = resources.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.authors.toLowerCase().includes(query) ||
        r.summary.toLowerCase().includes(query)
      );
    }
    
    return resources;
  }, [selectedType, searchQuery]);

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
              <FileText className="w-4 h-4" />
              <span className="font-body text-sm font-medium">27 Resources</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Further <span className="text-sage">Reading</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Curated academic resources, books, and articles to deepen your understanding of ADHD in relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full border-border h-12"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px] rounded-full border-border">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-body text-sm text-muted-foreground mb-6"
          >
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
          </motion.p>

          {/* Resources Grid */}
          <div className="space-y-4">
            {filteredResources.map((resource, index) => {
              const Icon = typeIcons[resource.type] || FileText;
              return (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="block group"
                >
                  <div className="bg-card rounded-2xl border border-border p-5 md:p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-sage/30 hover:-translate-y-0.5">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-sage/20">
                        <Icon className="w-6 h-6 text-sage" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-sage transition-colors duration-300">
                            {resource.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="font-body text-sm text-muted-foreground">
                            {resource.authors}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="font-body text-sm text-muted-foreground">
                            {resource.year}
                          </span>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-body text-xs font-medium">
                            {resource.type}
                          </span>
                        </div>
                        
                        {/* Full summary - no truncation */}
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          {resource.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No resources found
              </h3>
              <p className="font-body text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
