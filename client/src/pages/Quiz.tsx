import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, X, RotateCcw, Filter, Trophy, Brain, Shuffle, History, Eye, EyeOff, Trash2, BookOpen, List } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, quizCategories } from "@/data";
import { useLocalStorage, QuizProgress, initialQuizProgress } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* 
 * Tulum Sanctuary Quiz Page
 * - Flashcard-style quiz with instant feedback
 * - Progress tracking with local storage
 * - Reset button to clear all progress
 * - View correctly/incorrectly answered questions
 * - Option to exclude correctly answered questions
 * - Shuffle functionality for randomized question order
 * - Review mode to see all questions with answers on one page
 */

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof quizQuestions | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [excludeCorrect, setExcludeCorrect] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"quiz" | "review">("quiz");
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "unanswered">("all");
  
  // Progress stored in localStorage
  const [progress, setProgress, resetProgress] = useLocalStorage<QuizProgress>(
    "adhd-quiz-progress",
    initialQuizProgress
  );

  // Filter questions based on category and exclusion settings
  const baseFilteredQuestions = useMemo(() => {
    let filtered = quizQuestions;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (excludeCorrect) {
      filtered = filtered.filter(q => {
        const answered = progress.answeredQuestions[q.id];
        return !answered || !answered.isCorrect;
      });
    }
    
    return filtered;
  }, [selectedCategory, excludeCorrect, progress.answeredQuestions]);

  const filteredQuestions = useMemo(() => {
    if (isShuffled && shuffledQuestions) {
      let filtered = shuffledQuestions;
      if (selectedCategory !== "All") {
        filtered = filtered.filter(q => q.category === selectedCategory);
      }
      if (excludeCorrect) {
        filtered = filtered.filter(q => {
          const answered = progress.answeredQuestions[q.id];
          return !answered || !answered.isCorrect;
        });
      }
      return filtered;
    }
    return baseFilteredQuestions;
  }, [selectedCategory, isShuffled, shuffledQuestions, baseFilteredQuestions, excludeCorrect, progress.answeredQuestions]);

  // Questions for review mode with filtering
  const reviewQuestions = useMemo(() => {
    let filtered = quizQuestions;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (reviewFilter === "correct") {
      filtered = filtered.filter(q => {
        const answered = progress.answeredQuestions[q.id];
        return answered && answered.isCorrect;
      });
    } else if (reviewFilter === "incorrect") {
      filtered = filtered.filter(q => {
        const answered = progress.answeredQuestions[q.id];
        return answered && !answered.isCorrect;
      });
    } else if (reviewFilter === "unanswered") {
      filtered = filtered.filter(q => !progress.answeredQuestions[q.id]);
    }
    
    return filtered;
  }, [selectedCategory, reviewFilter, progress.answeredQuestions]);

  const currentQuestion = filteredQuestions[currentIndex];
  const progressPercent = filteredQuestions.length > 0 ? ((currentIndex + 1) / filteredQuestions.length) * 100 : 0;

  // Get lists of correct and incorrect questions for the progress dialog
  const correctQuestions = useMemo(() => {
    return quizQuestions.filter(q => {
      const answered = progress.answeredQuestions[q.id];
      return answered && answered.isCorrect;
    });
  }, [progress.answeredQuestions]);

  const incorrectQuestions = useMemo(() => {
    return quizQuestions.filter(q => {
      const answered = progress.answeredQuestions[q.id];
      return answered && !answered.isCorrect;
    });
  }, [progress.answeredQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const wasAnsweredBefore = progress.answeredQuestions[currentQuestion.id];
    
    setProgress(prev => {
      const newAnsweredQuestions = {
        ...prev.answeredQuestions,
        [currentQuestion.id]: {
          isCorrect,
          selectedAnswer: answerIndex,
          answeredAt: new Date().toISOString(),
        },
      };
      
      // Recalculate totals
      let totalCorrect = 0;
      let totalIncorrect = 0;
      Object.values(newAnsweredQuestions).forEach(a => {
        if (a.isCorrect) totalCorrect++;
        else totalIncorrect++;
      });
      
      return {
        answeredQuestions: newAnsweredQuestions,
        totalCorrect,
        totalIncorrect,
        lastUpdated: new Date().toISOString(),
      };
    });
    
    if (!wasAnsweredBefore) {
      if (isCorrect) {
        toast.success("Correct! Great job!", { duration: 2000 });
      } else {
        toast.error("Not quite right. Keep learning!", { duration: 2000 });
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    resetProgress();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShuffledQuestions(null);
    setIsShuffled(false);
    setExcludeCorrect(false);
    toast.success("Progress reset! Starting fresh.", { duration: 2000 });
  };

  const handleShuffle = useCallback(() => {
    let questionsToShuffle = quizQuestions;
    
    if (selectedCategory !== "All") {
      questionsToShuffle = questionsToShuffle.filter(q => q.category === selectedCategory);
    }
    
    if (excludeCorrect) {
      questionsToShuffle = questionsToShuffle.filter(q => {
        const answered = progress.answeredQuestions[q.id];
        return !answered || !answered.isCorrect;
      });
    }
    
    setShuffledQuestions(shuffleArray(questionsToShuffle));
    setIsShuffled(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    toast("Questions shuffled!", { duration: 2000 });
  }, [selectedCategory, excludeCorrect, progress.answeredQuestions]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (isShuffled) {
      let newFiltered = quizQuestions;
      if (value !== "All") {
        newFiltered = newFiltered.filter(q => q.category === value);
      }
      if (excludeCorrect) {
        newFiltered = newFiltered.filter(q => {
          const answered = progress.answeredQuestions[q.id];
          return !answered || !answered.isCorrect;
        });
      }
      setShuffledQuestions(shuffleArray(newFiltered));
    }
  };

  const goToQuestion = (questionId: number) => {
    const index = filteredQuestions.findIndex(q => q.id === questionId);
    if (index !== -1) {
      setCurrentIndex(index);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowProgressDialog(false);
      setViewMode("quiz");
    } else {
      // Question might be filtered out, need to adjust filters
      setExcludeCorrect(false);
      setSelectedCategory("All");
      setIsShuffled(false);
      setShuffledQuestions(null);
      // Find in full list
      const fullIndex = quizQuestions.findIndex(q => q.id === questionId);
      if (fullIndex !== -1) {
        setTimeout(() => {
          setCurrentIndex(fullIndex);
          setSelectedAnswer(null);
          setShowExplanation(false);
          setShowProgressDialog(false);
          setViewMode("quiz");
        }, 100);
      }
    }
  };

  // Reset index if it's out of bounds after filtering
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(Math.max(0, filteredQuestions.length - 1));
    }
  }, [filteredQuestions.length, currentIndex]);

  // Check if current question was previously answered
  const previousAnswer = currentQuestion ? progress.answeredQuestions[currentQuestion.id] : null;

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta mb-6">
              <Brain className="w-4 h-4" />
              <span className="font-body text-sm font-medium">100 Questions</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Knowledge <span className="text-terracotta">Quiz</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Test your understanding of ADHD in relationships with instant feedback and detailed explanations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-4xl">
          {/* Progress Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-card rounded-2xl border border-border p-4 mb-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-sage">{progress.totalCorrect}</p>
                  <p className="font-body text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-terracotta">{progress.totalIncorrect}</p>
                  <p className="font-body text-xs text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {100 - progress.totalCorrect - progress.totalIncorrect}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
              
              <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <History className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">Your Progress</DialogTitle>
                    <DialogDescription>
                      Review questions you've answered correctly and incorrectly.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="incorrect" className="flex-1 overflow-hidden flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="incorrect" className="gap-2">
                        <X className="w-4 h-4" />
                        Incorrect ({incorrectQuestions.length})
                      </TabsTrigger>
                      <TabsTrigger value="correct" className="gap-2">
                        <Check className="w-4 h-4" />
                        Correct ({correctQuestions.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="incorrect" className="flex-1 overflow-auto mt-4">
                      {incorrectQuestions.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No incorrect answers yet. Keep practicing!
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {incorrectQuestions.map(q => (
                            <button
                              key={q.id}
                              onClick={() => goToQuestion(q.id)}
                              className="w-full text-left p-3 rounded-lg border border-border hover:border-terracotta/50 hover:bg-terracotta/5 transition-colors"
                            >
                              <p className="font-body text-sm text-foreground line-clamp-2">{q.question}</p>
                              <p className="font-body text-xs text-muted-foreground mt-1">{q.category}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="correct" className="flex-1 overflow-auto mt-4">
                      {correctQuestions.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No correct answers yet. Start the quiz!
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {correctQuestions.map(q => (
                            <button
                              key={q.id}
                              onClick={() => goToQuestion(q.id)}
                              className="w-full text-left p-3 rounded-lg border border-border hover:border-sage/50 hover:bg-sage/5 transition-colors"
                            >
                              <p className="font-body text-sm text-foreground line-clamp-2">{q.question}</p>
                              <p className="font-body text-xs text-muted-foreground mt-1">{q.category}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                  
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="rounded-full">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Button
              variant={viewMode === "quiz" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("quiz")}
              className={`rounded-full ${viewMode === "quiz" ? "bg-terracotta hover:bg-terracotta/90" : ""}`}
            >
              <Brain className="w-4 h-4 mr-2" />
              Quiz Mode
            </Button>
            <Button
              variant={viewMode === "review" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("review")}
              className={`rounded-full ${viewMode === "review" ? "bg-sage hover:bg-sage/90" : ""}`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Review Mode
            </Button>
          </motion.div>

          {viewMode === "quiz" ? (
            <>
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
                    <SelectTrigger className="w-[200px] rounded-full border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Exclude correct toggle */}
                  <Button
                    variant={excludeCorrect ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setExcludeCorrect(!excludeCorrect);
                      setCurrentIndex(0);
                      setSelectedAnswer(null);
                      setShowExplanation(false);
                    }}
                    className={`rounded-full ${excludeCorrect ? "bg-sage hover:bg-sage/90" : ""}`}
                    title={excludeCorrect ? "Show all questions" : "Hide correctly answered questions"}
                  >
                    {excludeCorrect ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hiding Correct
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show All
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShuffle}
                    className={`rounded-full ${isShuffled ? 'bg-terracotta/10 border-terracotta text-terracotta' : ''}`}
                    title="Shuffle questions"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset All Progress?</DialogTitle>
                        <DialogDescription>
                          This will clear all your quiz progress, including correct and incorrect answers. This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" className="rounded-full">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button 
                            variant="destructive" 
                            onClick={handleReset}
                            className="rounded-full"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset Progress
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              {/* Status indicators */}
              <div className="flex flex-wrap gap-2 mb-4">
                {isShuffled && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-body text-sm"
                  >
                    <Shuffle className="w-3 h-3" />
                    Shuffled
                  </motion.span>
                )}
                {excludeCorrect && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage/10 text-sage font-body text-sm"
                  >
                    <EyeOff className="w-3 h-3" />
                    Correct hidden ({progress.totalCorrect})
                  </motion.span>
                )}
              </div>

              {/* Empty state when all questions are filtered out */}
              {filteredQuestions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-card rounded-3xl border border-border"
                >
                  <Trophy className="w-16 h-16 mx-auto text-sage mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    All questions answered correctly!
                  </h3>
                  <p className="font-body text-muted-foreground mb-4">
                    Great job! You've mastered all the questions in this category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setExcludeCorrect(false);
                      setCurrentIndex(0);
                    }}
                    className="rounded-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Show all questions
                  </Button>
                </motion.div>
              ) : (
                <>
                  {/* Progress */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-sm text-muted-foreground">
                        Question {currentIndex + 1} of {filteredQuestions.length}
                      </span>
                      <span className="font-body text-sm text-muted-foreground">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </motion.div>

                  {/* Question Card */}
                  <AnimatePresence mode="wait">
                    {currentQuestion && (
                      <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden"
                      >
                        {/* Question Header */}
                        <div className="p-6 md:p-8 bg-gradient-to-br from-terracotta/5 to-sage/5">
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-body text-xs font-medium">
                              {currentQuestion.category}
                            </span>
                            {previousAnswer && (
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-body text-xs font-medium ${
                                previousAnswer.isCorrect 
                                  ? "bg-sage/10 text-sage" 
                                  : "bg-terracotta/10 text-terracotta"
                              }`}>
                                {previousAnswer.isCorrect ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    Previously correct
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3 h-3" />
                                    Previously incorrect
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                            {currentQuestion.question}
                          </h2>
                        </div>

                        {/* Options */}
                        <div className="p-6 md:p-8 space-y-3">
                          {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === currentQuestion.correctAnswer;
                            const showResult = showExplanation;
                            
                            let optionClass = "border-border hover:border-terracotta/50 hover:bg-terracotta/5";
                            if (showResult) {
                              if (isCorrect) {
                                optionClass = "border-sage bg-sage/10";
                              } else if (isSelected && !isCorrect) {
                                optionClass = "border-destructive bg-destructive/10";
                              } else {
                                optionClass = "border-border opacity-50";
                              }
                            } else if (isSelected) {
                              optionClass = "border-terracotta bg-terracotta/10";
                            }

                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showExplanation}
                                className={`
                                  w-full p-4 rounded-xl border-2 text-left
                                  transition-all duration-300
                                  ${optionClass}
                                `}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${showResult && isCorrect ? "bg-sage text-cream" : ""}
                                    ${showResult && isSelected && !isCorrect ? "bg-destructive text-cream" : ""}
                                    ${!showResult ? "bg-muted text-muted-foreground" : ""}
                                  `}>
                                    {showResult && isCorrect && <Check className="w-4 h-4" />}
                                    {showResult && isSelected && !isCorrect && <X className="w-4 h-4" />}
                                    {!showResult && <span className="font-body text-sm font-medium">{String.fromCharCode(65 + index)}</span>}
                                  </div>
                                  <span className="font-body text-foreground">{option}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-border"
                            >
                              <div className="p-6 md:p-8 bg-sand/30">
                                <div className="flex items-start gap-3">
                                  <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                    ${selectedAnswer === currentQuestion.correctAnswer ? "bg-sage" : "bg-terracotta"}
                                  `}>
                                    {selectedAnswer === currentQuestion.correctAnswer ? (
                                      <Check className="w-4 h-4 text-cream" />
                                    ) : (
                                      <X className="w-4 h-4 text-cream" />
                                    )}
                                  </div>
                                  <div>
                                    <p className={`font-display text-lg font-semibold mb-2 ${
                                      selectedAnswer === currentQuestion.correctAnswer ? "text-sage" : "text-terracotta"
                                    }`}>
                                      {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Not quite right"}
                                    </p>
                                    <p className="font-body text-muted-foreground leading-relaxed mb-3">
                                      <span className="font-semibold text-foreground">The correct answer is: </span>
                                      {currentQuestion.options[currentQuestion.correctAnswer]}
                                    </p>
                                    <p className="font-body text-muted-foreground leading-relaxed">
                                      {currentQuestion.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-between mt-8"
                  >
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="rounded-full px-6"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {filteredQuestions.slice(
                        Math.max(0, currentIndex - 2),
                        Math.min(filteredQuestions.length, currentIndex + 3)
                      ).map((q, i) => {
                        const actualIndex = Math.max(0, currentIndex - 2) + i;
                        const answered = progress.answeredQuestions[q.id];
                        
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => {
                              setCurrentIndex(actualIndex);
                              setSelectedAnswer(null);
                              setShowExplanation(false);
                            }}
                            className={`
                              w-8 h-8 rounded-full font-body text-sm font-medium
                              transition-all duration-300 relative
                              ${actualIndex === currentIndex 
                                ? "bg-terracotta text-cream" 
                                : answered
                                  ? answered.isCorrect
                                    ? "bg-sage/20 text-sage hover:bg-sage/30"
                                    : "bg-terracotta/20 text-terracotta hover:bg-terracotta/30"
                                  : "bg-muted text-muted-foreground hover:bg-terracotta/20"
                              }
                            `}
                          >
                            {actualIndex + 1}
                          </button>
                        );
                      })}
                    </div>
                    
                    <Button
                      onClick={handleNext}
                      disabled={currentIndex === filteredQuestions.length - 1}
                      className="rounded-full px-6 bg-terracotta hover:bg-terracotta/90 text-cream"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </>
              )}
            </>
          ) : (
            /* Review Mode */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Review Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px] rounded-full border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant={reviewFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReviewFilter("all")}
                    className={`rounded-full ${reviewFilter === "all" ? "bg-terracotta hover:bg-terracotta/90" : ""}`}
                  >
                    <List className="w-4 h-4 mr-2" />
                    All ({quizQuestions.filter(q => selectedCategory === "All" || q.category === selectedCategory).length})
                  </Button>
                  <Button
                    variant={reviewFilter === "correct" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReviewFilter("correct")}
                    className={`rounded-full ${reviewFilter === "correct" ? "bg-sage hover:bg-sage/90" : ""}`}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Correct
                  </Button>
                  <Button
                    variant={reviewFilter === "incorrect" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReviewFilter("incorrect")}
                    className={`rounded-full ${reviewFilter === "incorrect" ? "bg-terracotta hover:bg-terracotta/90" : ""}`}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Incorrect
                  </Button>
                  <Button
                    variant={reviewFilter === "unanswered" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReviewFilter("unanswered")}
                    className={`rounded-full ${reviewFilter === "unanswered" ? "bg-muted-foreground hover:bg-muted-foreground/90 text-background" : ""}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Unanswered
                  </Button>
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-card rounded-2xl border border-border p-4 mb-6">
                <p className="font-body text-sm text-muted-foreground text-center">
                  Showing <span className="font-semibold text-foreground">{reviewQuestions.length}</span> questions
                  {selectedCategory !== "All" && <span> in <span className="font-semibold text-terracotta">{selectedCategory}</span></span>}
                  {reviewFilter !== "all" && <span> • Filter: <span className="font-semibold">{reviewFilter}</span></span>}
                </p>
              </div>

              {/* Review Questions List */}
              {reviewQuestions.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-3xl border border-border">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No questions to show
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Try adjusting your filters to see more questions.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviewQuestions.map((question, index) => {
                    const answered = progress.answeredQuestions[question.id];
                    const userAnswer = answered ? answered.selectedAnswer : null;
                    const isCorrect = answered?.isCorrect;
                    
                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="bg-card rounded-2xl border border-border overflow-hidden"
                      >
                        {/* Question Header */}
                        <div className={`p-5 ${
                          answered 
                            ? isCorrect 
                              ? "bg-sage/5 border-b border-sage/20" 
                              : "bg-terracotta/5 border-b border-terracotta/20"
                            : "bg-muted/30 border-b border-border"
                        }`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-body text-xs font-medium">
                                  {question.category}
                                </span>
                                <span className="font-body text-xs text-muted-foreground">
                                  Q{question.id}
                                </span>
                                {answered && (
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-body text-xs font-medium ${
                                    isCorrect ? "bg-sage/10 text-sage" : "bg-terracotta/10 text-terracotta"
                                  }`}>
                                    {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                    {isCorrect ? "Correct" : "Incorrect"}
                                  </span>
                                )}
                                {!answered && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted font-body text-xs text-muted-foreground">
                                    Not answered
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display text-lg font-semibold text-foreground">
                                {question.question}
                              </h3>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => goToQuestion(question.id)}
                              className="rounded-full flex-shrink-0"
                            >
                              Practice
                            </Button>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="p-5 space-y-2">
                          {question.options.map((option, optIndex) => {
                            const isCorrectOption = optIndex === question.correctAnswer;
                            const isUserAnswer = userAnswer === optIndex;
                            
                            let optionStyle = "bg-muted/30 border-transparent";
                            if (isCorrectOption) {
                              optionStyle = "bg-sage/10 border-sage/30";
                            } else if (isUserAnswer && !isCorrectOption) {
                              optionStyle = "bg-terracotta/10 border-terracotta/30";
                            }
                            
                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg border ${optionStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`
                                    w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium
                                    ${isCorrectOption ? "bg-sage text-cream" : ""}
                                    ${isUserAnswer && !isCorrectOption ? "bg-terracotta text-cream" : ""}
                                    ${!isCorrectOption && !isUserAnswer ? "bg-muted text-muted-foreground" : ""}
                                  `}>
                                    {isCorrectOption && <Check className="w-3 h-3" />}
                                    {isUserAnswer && !isCorrectOption && <X className="w-3 h-3" />}
                                    {!isCorrectOption && !isUserAnswer && String.fromCharCode(65 + optIndex)}
                                  </div>
                                  <span className={`font-body text-sm ${
                                    isCorrectOption ? "text-foreground font-medium" : "text-muted-foreground"
                                  }`}>
                                    {option}
                                    {isCorrectOption && <span className="ml-2 text-sage text-xs">(Correct Answer)</span>}
                                    {isUserAnswer && !isCorrectOption && <span className="ml-2 text-terracotta text-xs">(Your Answer)</span>}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="px-5 pb-5">
                          <div className="p-4 rounded-lg bg-sand/30 border border-sand">
                            <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                              Explanation
                            </p>
                            <p className="font-body text-sm text-foreground leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
