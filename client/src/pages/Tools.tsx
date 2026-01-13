import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, MessageSquare, Heart, Brain, Sparkles, ChevronRight, Check, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

/* 
 * Tulum Sanctuary Tools Page
 * - Self-assessments, communication exercises, daily reflections
 * - Interactive tools with progress tracking
 * - Warm, supportive design
 */

// Self-Assessment Questions
const selfAssessmentQuestions = [
  { id: 1, question: "I often feel like I'm carrying most of the household responsibilities.", category: "Responsibility" },
  { id: 2, question: "My partner frequently forgets important dates or commitments.", category: "Memory" },
  { id: 3, question: "I find myself nagging or reminding my partner about tasks.", category: "Communication" },
  { id: 4, question: "We struggle to have calm conversations about difficult topics.", category: "Communication" },
  { id: 5, question: "I feel emotionally disconnected from my partner.", category: "Connection" },
  { id: 6, question: "My partner seems easily distracted during conversations.", category: "Attention" },
  { id: 7, question: "I often feel frustrated or resentful in our relationship.", category: "Emotions" },
  { id: 8, question: "We have different perceptions of how time is spent.", category: "Time" },
  { id: 9, question: "I feel like I can't rely on my partner to follow through.", category: "Trust" },
  { id: 10, question: "We rarely do new or exciting activities together.", category: "Connection" },
];

// Communication Exercises
const communicationExercises = [
  {
    id: 1,
    title: "The Learning Conversation",
    description: "Practice understanding your partner's perspective without judgment.",
    steps: [
      "Choose a recent disagreement to discuss",
      "Partner A shares their perspective for 3 minutes without interruption",
      "Partner B reflects back what they heard: 'What I heard you say is...'",
      "Partner A confirms or clarifies",
      "Switch roles and repeat",
      "Discuss: What did you learn about your partner's experience?",
    ],
    duration: "20 minutes",
  },
  {
    id: 2,
    title: "Validation Practice",
    description: "Learn to validate without necessarily agreeing.",
    steps: [
      "Partner A shares a frustration about something (not about Partner B)",
      "Partner B responds with validation: 'That makes sense because...'",
      "Partner B does NOT offer solutions or advice",
      "Partner A rates how validated they felt (1-10)",
      "Switch roles and repeat",
      "Discuss what made validation feel genuine",
    ],
    duration: "15 minutes",
  },
  {
    id: 3,
    title: "Creating Verbal Cues",
    description: "Develop agreed-upon signals for difficult moments.",
    steps: [
      "Discuss situations where conversations escalate",
      "Create a neutral word or phrase to signal 'I need a break'",
      "Create a phrase for 'I'm feeling criticized'",
      "Create a phrase for 'I need your full attention'",
      "Practice using these cues in low-stakes situations",
      "Review and adjust as needed",
    ],
    duration: "30 minutes",
  },
];

// Daily Reflection Prompts
const reflectionPrompts = [
  "What is one thing my partner did today that I appreciated?",
  "How did I show empathy toward my partner today?",
  "What triggered frustration in me today, and how did I respond?",
  "Did I validate my partner's feelings today? How?",
  "What is one thing I could do differently tomorrow?",
  "How did ADHD symptoms affect our interactions today?",
  "What boundary did I maintain or need to set?",
  "How did we connect emotionally today?",
  "What am I grateful for about my partner?",
  "How did I take care of my own needs today?",
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState<"assessment" | "exercises" | "reflection">("assessment");
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, number>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const assessmentProgress = (Object.keys(assessmentAnswers).length / selfAssessmentQuestions.length) * 100;
  
  const calculateAssessmentScore = () => {
    const total = Object.values(assessmentAnswers).reduce((sum, val) => sum + val, 0);
    const max = selfAssessmentQuestions.length * 5;
    return Math.round((total / max) * 100);
  };

  const handleAssessmentAnswer = (questionId: number, value: number) => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleAssessmentSubmit = () => {
    if (Object.keys(assessmentAnswers).length === selfAssessmentQuestions.length) {
      setAssessmentComplete(true);
    }
  };

  const resetAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentComplete(false);
  };

  const getNextPrompt = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % reflectionPrompts.length);
    setReflectionText("");
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
              <Wrench className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Interactive Tools</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Helpful <span className="text-terracotta">Tools</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Self-assessments, communication exercises, and daily reflection prompts to support your journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-4xl">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {[
              { id: "assessment", label: "Self-Assessment", icon: Brain },
              { id: "exercises", label: "Communication", icon: MessageSquare },
              { id: "reflection", label: "Daily Reflection", icon: Heart },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-full font-body font-medium
                    transition-all duration-300
                    ${activeTab === tab.id 
                      ? "bg-terracotta text-cream shadow-lg shadow-terracotta/20" 
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-terracotta/30"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* Self-Assessment Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "assessment" && (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {!assessmentComplete ? (
                  <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-lg">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          Relationship Impact Assessment
                        </h2>
                        <span className="font-body text-sm text-muted-foreground">
                          {Object.keys(assessmentAnswers).length} / {selfAssessmentQuestions.length}
                        </span>
                      </div>
                      <Progress value={assessmentProgress} className="h-2" />
                    </div>
                    
                    <p className="font-body text-muted-foreground mb-6">
                      Rate how often each statement applies to your relationship (1 = Never, 5 = Always)
                    </p>
                    
                    <div className="space-y-6">
                      {selfAssessmentQuestions.map((q, index) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="pb-6 border-b border-border last:border-0"
                        >
                          <p className="font-body text-foreground mb-3">
                            {index + 1}. {q.question}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-body text-xs text-muted-foreground w-12">Never</span>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                onClick={() => handleAssessmentAnswer(q.id, value)}
                                className={`
                                  w-10 h-10 rounded-full font-body font-medium
                                  transition-all duration-300
                                  ${assessmentAnswers[q.id] === value 
                                    ? "bg-terracotta text-cream" 
                                    : "bg-muted text-muted-foreground hover:bg-terracotta/20"
                                  }
                                `}
                              >
                                {value}
                              </button>
                            ))}
                            <span className="font-body text-xs text-muted-foreground w-12 text-right">Always</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={handleAssessmentSubmit}
                      disabled={Object.keys(assessmentAnswers).length < selfAssessmentQuestions.length}
                      className="w-full mt-6 rounded-full bg-terracotta hover:bg-terracotta/90 text-cream py-6"
                    >
                      View Results
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-lg text-center">
                    <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10 text-terracotta" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                      Assessment Complete
                    </h2>
                    <p className="font-body text-muted-foreground mb-6">
                      Your relationship impact score
                    </p>
                    
                    <div className="w-32 h-32 rounded-full border-8 border-terracotta/20 flex items-center justify-center mx-auto mb-6">
                      <span className="font-display text-4xl font-bold text-terracotta">
                        {calculateAssessmentScore()}%
                      </span>
                    </div>
                    
                    <div className="bg-sand/50 rounded-2xl p-6 mb-6 text-left">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                        What This Means
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        {calculateAssessmentScore() < 40 
                          ? "Your relationship shows relatively low impact from ADHD-related challenges. Continue building on your strengths and maintaining open communication."
                          : calculateAssessmentScore() < 70
                          ? "Your relationship is experiencing moderate impact from ADHD-related patterns. The strategies in this guide can help you address these challenges together."
                          : "Your relationship is significantly affected by ADHD-related dynamics. Consider seeking support from an ADHD-informed therapist alongside using these resources."
                        }
                      </p>
                    </div>
                    
                    <Button
                      onClick={resetAssessment}
                      variant="outline"
                      className="rounded-full"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Take Again
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Communication Exercises Tab */}
            {activeTab === "exercises" && (
              <motion.div
                key="exercises"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {communicationExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-md"
                  >
                    <button
                      onClick={() => setSelectedExercise(
                        selectedExercise === exercise.id ? null : exercise.id
                      )}
                      className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          transition-colors duration-300
                          ${selectedExercise === exercise.id 
                            ? "bg-sage text-cream" 
                            : "bg-sage/10 text-sage group-hover:bg-sage/20"
                          }
                        `}>
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-sage transition-colors">
                            {exercise.title}
                          </h3>
                          <p className="font-body text-sm text-muted-foreground">
                            {exercise.duration}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`
                        w-5 h-5 text-muted-foreground transition-transform duration-300
                        ${selectedExercise === exercise.id ? "rotate-90" : ""}
                      `} />
                    </button>
                    
                    <AnimatePresence>
                      {selectedExercise === exercise.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-6 pt-0">
                            <p className="font-body text-muted-foreground mb-4">
                              {exercise.description}
                            </p>
                            <div className="bg-sand/50 rounded-xl p-4">
                              <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                                Steps:
                              </h4>
                              <ol className="space-y-2">
                                {exercise.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-sage/20 text-sage flex items-center justify-center flex-shrink-0 font-body text-xs font-medium">
                                      {stepIndex + 1}
                                    </span>
                                    <span className="font-body text-sm text-muted-foreground">
                                      {step}
                                    </span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Daily Reflection Tab */}
            {activeTab === "reflection" && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Daily Reflection
                      </h2>
                      <p className="font-body text-sm text-muted-foreground">
                        Take a moment to reflect on your relationship
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-terracotta/5 to-sage/5 rounded-2xl p-6 mb-6">
                    <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed">
                      "{reflectionPrompts[currentPromptIndex]}"
                    </p>
                  </div>
                  
                  <Textarea
                    placeholder="Write your reflection here..."
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    className="min-h-[150px] rounded-xl border-border resize-none mb-4"
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">
                      Prompt {currentPromptIndex + 1} of {reflectionPrompts.length}
                    </span>
                    <Button
                      onClick={getNextPrompt}
                      className="rounded-full bg-terracotta hover:bg-terracotta/90 text-cream"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Prompt
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-xl bg-sage/10 border border-sage/20">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-sage">
                      <strong>Tip:</strong> Try to reflect at the same time each day to build a consistent practice. 
                      Even 5 minutes of reflection can strengthen your awareness and connection.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
