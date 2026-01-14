import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Filter, Search, BookOpen, FileSearch, Building2, Newspaper, GraduationCap, ChevronDown, ChevronUp, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { researchResources, resourceTypes, focusCategories } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/* 
 * Tulum Sanctuary Resources Page
 * - Research library with 35 verified resources
 * - Filterable by resource type and focus/topic
 * - Full summaries visible with expandable detailed summaries
 */

const typeIcons: Record<string, typeof FileText> = {
  "Scientific Article": FileSearch,
  "Book": BookOpen,
  "Website": ExternalLink,
  "Dissertation": GraduationCap,
  "News Article": Newspaper,
  "Organization": Building2,
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFocus, setSelectedFocus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredResources = useMemo(() => {
    let resources = researchResources;
    
    if (selectedType !== "All") {
      resources = resources.filter(r => r.resource_type === selectedType);
    }
    
    if (selectedFocus !== "All") {
      resources = resources.filter(r => r.focus.includes(selectedFocus));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      resources = resources.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.authors.toLowerCase().includes(query) ||
        r.summary.toLowerCase().includes(query) ||
        r.focus.some(f => f.toLowerCase().includes(query))
      );
    }
    
    return resources;
  }, [selectedType, selectedFocus, searchQuery]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
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
              <FileText className="w-4 h-4" />
              <span className="font-body text-sm font-medium">{researchResources.length} Resources</span>
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
            className="flex flex-col gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search resources by title, author, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full border-border h-12"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="font-body text-sm text-muted-foreground">Filter:</span>
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px] rounded-full border-border">
                  <SelectValue placeholder="Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedFocus} onValueChange={setSelectedFocus}>
                <SelectTrigger className="w-[200px] rounded-full border-border">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <SelectValue placeholder="Topic" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {focusCategories.map(focus => (
                    <SelectItem key={focus} value={focus}>
                      {focus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {(selectedType !== "All" || selectedFocus !== "All" || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedType("All");
                    setSelectedFocus("All");
                    setSearchQuery("");
                  }}
                  className="text-terracotta hover:text-terracotta/80"
                >
                  Clear filters
                </Button>
              )}
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
              const Icon = typeIcons[resource.resource_type] || FileText;
              const hasFullSummary = resource.full_summary && resource.full_summary.trim().length > 0;
              const isExpanded = expandedId === resource.id;
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="block group"
                >
                  <div className="bg-card rounded-2xl border border-border p-5 md:p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-sage/30">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-sage/20">
                        <Icon className="w-6 h-6 text-sage" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <a 
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-lg font-semibold text-foreground hover:text-sage transition-colors duration-300"
                          >
                            {resource.title}
                          </a>
                          <a 
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </a>
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
                            {resource.resource_type}
                          </span>
                          {resource.article_type !== "NA" && (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-sage/10 text-sage font-body text-xs font-medium">
                              {resource.article_type}
                            </span>
                          )}
                        </div>
                        
                        {/* Focus tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {resource.focus.map((f, i) => (
                            <span 
                              key={i}
                              className="inline-block px-2 py-0.5 rounded-full bg-sand/50 text-foreground/70 font-body text-xs cursor-pointer hover:bg-sand transition-colors"
                              onClick={() => setSelectedFocus(f)}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        
                        {/* Summary */}
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          {resource.summary}
                        </p>
                        
                        {/* Expandable full summary */}
                        {hasFullSummary && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(resource.id)}
                              className="mt-3 text-sage hover:text-sage/80 p-0 h-auto font-body text-sm"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-1" />
                                  Hide detailed summary
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-1" />
                                  Read detailed summary
                                </>
                              )}
                            </Button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 p-4 bg-sand/30 rounded-xl border border-sand">
                                    <div className="font-body text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                      {resource.full_summary.split('\n\n').map((paragraph, i) => {
                                        // Check if it's a heading (starts with **)
                                        if (paragraph.startsWith('**') && paragraph.includes(':**')) {
                                          const [heading, ...rest] = paragraph.split(':**');
                                          return (
                                            <div key={i} className="mb-4">
                                              <h4 className="font-display font-semibold text-foreground mb-2">
                                                {heading.replace(/\*\*/g, '')}
                                              </h4>
                                              {rest.length > 0 && (
                                                <p className="text-muted-foreground">
                                                  {rest.join(':**')}
                                                </p>
                                              )}
                                            </div>
                                          );
                                        }
                                        // Check if it's a numbered list
                                        if (/^\d+\./.test(paragraph.trim())) {
                                          return (
                                            <p key={i} className="mb-2 pl-4">
                                              {paragraph}
                                            </p>
                                          );
                                        }
                                        return (
                                          <p key={i} className="mb-4">
                                            {paragraph}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
