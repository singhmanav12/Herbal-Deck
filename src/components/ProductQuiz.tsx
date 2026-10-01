import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const quizQuestions = [
  {
    id: 'goal',
    question: "What is your primary wellness goal right now?",
    options: [
      { label: "Deep, Restorative Sleep", value: "sleep" },
      { label: "Sustained Daily Energy", value: "energy" },
      { label: "Gut Health & Digestion", value: "digestion" },
      { label: "Immunity & Balance", value: "immunity" },
    ]
  },
  {
    id: 'routine',
    question: "When do you prefer to take your rituals?",
    options: [
      { label: "First thing in the morning", value: "morning" },
      { label: "Mid-day pick me up", value: "afternoon" },
      { label: "Winding down at night", value: "evening" },
    ]
  }
];

export const ProductQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance after small delay for smooth feel
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="py-24 bg-sage relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9673E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">
            <Sparkles size={14} className="text-accent" /> Personalized Prescription
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Find Your Perfect Remedy</h2>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-white max-w-2xl mx-auto min-h-[400px] flex flex-col relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div 
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-grow flex flex-col"
              >
                <div className="mb-8">
                  <div className="text-xs font-bold text-accent tracking-widest uppercase mb-4">
                    Step {currentStep + 1} of {quizQuestions.length}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-primary">
                    {quizQuestions[currentStep].question}
                  </h3>
                </div>

                <div className="space-y-4 mt-auto">
                  {quizQuestions[currentStep].options.map(option => {
                    const isSelected = answers[quizQuestions[currentStep].id] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(quizQuestions[currentStep].id, option.value)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group ${
                          isSelected 
                            ? 'border-accent bg-accent/5' 
                            : 'border-transparent bg-white hover:border-primary/20 shadow-sm'
                        }`}
                      >
                        <span className={`font-medium text-lg ${isSelected ? 'text-accent' : 'text-primary'}`}>
                          {option.label}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-accent bg-accent' : 'border-gray-200 group-hover:border-primary/30'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-accent/30">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-3xl font-serif text-primary mb-4">Your Ritual is Ready</h3>
                <p className="text-text-muted mb-8 max-w-md">
                  Based on your goals for {answers.goal} in the {answers.routine}, we've curated a specific blend to elevate your biology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link 
                    to="/shop" 
                    className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    View Recommendation <ArrowRight size={16} />
                  </Link>
                  <button 
                    onClick={resetQuiz}
                    className="bg-white hover:bg-gray-50 text-primary border border-primary/10 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Progress Indicator */}
          {!showResults && (
            <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: `${(currentStep / quizQuestions.length) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
