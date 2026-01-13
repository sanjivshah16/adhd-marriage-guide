import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, X, RotateCcw, Filter, Trophy, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, quizCategories } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* 
 * Tulum Sanctuary Quiz Page
 * - Flashcard-style quiz with instant feedback
 * - Organic shapes and warm colors
 * - Smooth card flip animations
 */

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "All") return quizQuestions;
    return quizQuestions.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = filteredQuestions[currentIndex];
  const progress = ((currentIndex + 1) / filteredQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (!answeredQuestions.has(currentQuestion.id)) {
      if (answerIndex === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
      }
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));
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
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
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
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10">
                <Trophy className="w-4 h-4 text-sage" />
                <span className="font-body text-sm font-medium text-sage">
                  {score} / {answeredQuestions.size}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="rounded-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </motion.div>

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
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
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
                <span className="inline-block px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-body text-xs font-medium mb-4">
                  {currentQuestion.category}
                </span>
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
              ).map((_, i) => {
                const actualIndex = Math.max(0, currentIndex - 2) + i;
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
                      transition-all duration-300
                      ${actualIndex === currentIndex 
                        ? "bg-terracotta text-cream" 
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
        </div>
      </section>
    </div>
  );
}
