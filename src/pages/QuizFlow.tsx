import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';
import type { QuizResponse } from '../types';
import { INITIAL_QUIZ_QUESTIONS } from '../constants';
import { cn } from '../lib/utils';

interface QuizProps {
  onComplete?: (responses: QuizResponse[]) => void;
}

export const QuizFlow: React.FC<QuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');

  const currentQuestion = INITIAL_QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === INITIAL_QUIZ_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / INITIAL_QUIZ_QUESTIONS.length) * 100;

  const handleAnswerSelect = (value: string) => {
    if (currentQuestion.type === 'multiple') {
      const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      if (current.includes(value)) {
        setSelectedAnswer(current.filter(v => v !== value));
      } else {
        setSelectedAnswer([...current, value]);
      }
    } else {
      setSelectedAnswer(value);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) {
      return;
    }

    const response: QuizResponse = {
      userId: 'temp-user',
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      timestamp: new Date(),
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (isLastQuestion) {
      if (onComplete) {
        onComplete(newResponses);
      } else {
        navigate('/blueprint');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousResponse = responses[currentQuestionIndex - 1];
      if (previousResponse) {
        setSelectedAnswer(previousResponse.answer);
      }
      setResponses(responses.slice(0, -1));
    }
  };

  const isSelected = (val: string) => {
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(val);
    }
    return selectedAnswer === val;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F7F1E8] font-sans flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-8">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#380D12] via-[#0D0D0D] to-[#0D0D0D]" />

      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/brand/kashkhati_motifs-seal.png" alt="Seal" className="w-8 h-8 object-contain" />
          <img src="/brand/kashkhati_logo.png" alt="KASHKHATI" className="h-4 w-auto object-contain brightness-125" />
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="text-xs text-[#F7F1E8]/60 hover:text-white transition-colors tracking-widest uppercase"
        >
          Exit Assessment
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8 z-10">
        
        {/* Progress Bar & Header */}
        <div className="mb-10 text-center">
          <img src="/brand/kashkhati_motifs-pearl-bow.png" alt="Bow" className="h-7 w-auto mx-auto mb-3 object-contain opacity-80" />
          
          <div className="flex items-center justify-between text-xs text-[#F7F1E8]/60 mb-2 tracking-widest">
            <span>QUESTION {currentQuestionIndex + 1} OF {INITIAL_QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(progress)}% COMPLETED</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-[#8B0E1A] to-[#D9C5A0] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#131015] border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl"
          >
            <span className="text-[10px] tracking-[0.25em] text-[#8B0E1A] uppercase font-semibold">
              ASSESSMENT DOSSIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F7F1E8] mt-3 mb-8 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Answer Options Grid */}
            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const active = isSelected(option.value);
                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerSelect(option.value)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl cursor-pointer border transition-all duration-300",
                      active
                        ? "bg-[#380D12]/60 border-[#8B0E1A] text-white shadow-[0_4px_20px_rgba(139,14,26,0.3)]"
                        : "bg-white/5 border-white/10 text-[#F7F1E8]/80 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        active ? "bg-[#8B0E1A] border-[#8B0E1A]" : "border-white/30"
                      )}>
                        {active && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm sm:text-base">{option.text}</div>
                        {option.traits && (
                          <div className="text-[11px] text-[#F7F1E8]/50 mt-0.5">
                            {option.traits.join(' • ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <Sparkles className={cn("w-4 h-4 opacity-0 transition-opacity", active && "opacity-100 text-[#D9C5A0]")} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Bar */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={cn(
              "px-6 py-3 rounded-full border text-xs tracking-wider font-semibold transition-all flex items-center gap-2",
              currentQuestionIndex === 0
                ? "border-white/5 text-white/20 cursor-not-allowed"
                : "border-white/15 text-[#F7F1E8] hover:bg-white/10"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREVIOUS</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
            className={cn(
              "px-8 py-3.5 rounded-full text-xs tracking-wider font-semibold transition-all flex items-center gap-2 shadow-lg",
              !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-[#F7F1E8] text-[#0D0D0D] hover:bg-white"
            )}
          >
            <span>{isLastQuestion ? 'COMPLETE ASSESSMENT' : 'NEXT QUESTION'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Footer info */}
      <footer className="max-w-4xl mx-auto w-full text-center z-10 text-[11px] text-[#F7F1E8]/40 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#8B0E1A]" />
        <span>Your responses are private and curated solely for your Beauty Blueprint.</span>
      </footer>

    </div>
  );
};
