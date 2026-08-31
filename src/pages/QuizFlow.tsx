import { useState } from 'react';
import type { QuizResponse } from '../types';
import { Button, Card, CardBody } from '../components/ui';
import { INITIAL_QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  onComplete?: (responses: QuizResponse[]) => void;
}

export const QuizFlow: React.FC<QuizProps> = ({ onComplete }) => {
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
      alert('يرجى اختيار إجابة / Please select an answer');
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
      onComplete?.(newResponses);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousResponse = responses[currentQuestionIndex - 1];
      setSelectedAnswer(previousResponse.answer);
      setResponses(responses.slice(0, -1));
    }
  };

  return (
    <div className="container-md mx-auto py-2xl">
      {/* Progress Bar */}
      <div className="mb-2xl">
        <div className="flex-between mb-md">
          <span className="text-sm font-medium text-neutral-600">
            سؤال {currentQuestionIndex + 1} من {INITIAL_QUIZ_QUESTIONS.length} / Question {currentQuestionIndex + 1} of {INITIAL_QUIZ_QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-neutral-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-base"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-2xl">
        <CardBody>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-xl">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-md">
            {currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className="flex items-start p-lg border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <input
                  type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
                  name={`question-${currentQuestion.id}`}
                  value={option.value}
                  checked={
                    Array.isArray(selectedAnswer)
                      ? selectedAnswer.includes(option.value)
                      : selectedAnswer === option.value
                  }
                  onChange={() => handleAnswerSelect(option.value)}
                  className="mt-xs mr-lg"
                />
                <div>
                  <p className="font-medium text-neutral-900">{option.text}</p>
                  {option.traits && (
                    <p className="text-sm text-neutral-500 mt-xs">
                      خصائص / Traits: {option.traits.join(', ')}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex-between gap-lg">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← السابق / Previous
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
        >
          {isLastQuestion ? 'إكمال / Complete' : 'التالي / Next →'}
        </Button>
      </div>
    </div>
  );
};
