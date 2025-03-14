import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsForCareer } from '../data/skillAssessmentQuestions';
import { careers } from '../data/careers';
import SkillAssessmentQuestion from '../components/SkillAssessmentQuestion';

function SkillAssessmentTest({ setNavbarVisible }) {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    setNavbarVisible(false); // Hide navbar when the test starts

    // Find the career by ID
    const selectedCareer = careers.find(c => c.id === parseInt(careerId));
    if (selectedCareer) {
      setCareer(selectedCareer);
      // Get questions for this career
      const careerQuestions = getQuestionsForCareer(parseInt(careerId));
      setQuestions(careerQuestions);
    } else {
      // Redirect if career not found
      navigate('/');
    }

    return () => {
      setNavbarVisible(true); // Show navbar when the test ends
    };
  }, [careerId, navigate, setNavbarVisible]);

  // Fullscreen logic
  useEffect(() => {
    const enterFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Automatically submit with a score of 0 if fullscreen is exited
        setResult({
          correctCount: 0,
          totalQuestions: questions.length,
          percentage: 0,
          skillLevel: "Failed"
        });
        handleSubmit(); // End test if fullscreen is exited
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Automatically submit with a score of 0 if the tab is not active
        setResult({
          correctCount: 0,
          totalQuestions: questions.length,
          percentage: 0,
          skillLevel: "Failed"
        });
        handleSubmit(); // End test if tab is changed
      }
    };

    enterFullscreen();
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.exitFullscreen(); // Ensure fullscreen exits on unmount
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || result) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, result]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Calculate test results
  const calculateResults = () => {
    let correctCount = 0;
    let totalQuestions = questions.length;
    
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    let skillLevel;
    if (percentage >= 80) {
      skillLevel = "Advanced";
    } else if (percentage >= 50) {
      skillLevel = "Intermediate";
    } else {
      skillLevel = "Beginner";
    }
    
    return {
      correctCount,
      totalQuestions,
      percentage,
      skillLevel
    };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const testResult = calculateResults();
      setResult(testResult);
      setIsSubmitting(false);
    }, 1500);
  };

  // Handle retaking the test
  const handleRetakeTest = () => {
    setAnswers({});
    setResult(null);
    setTimeLeft(300);
  };

  // Handle going back to career exploration
  const handleBackToExploration = () => {
    navigate('/');
  };

  if (!career) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{career.name} Skill Assessment</h1>
          <p className="text-gray-600 mt-2">Test your knowledge of key skills for this career path</p>
        </div>
        
        {!result && (
          <div className="mt-4 md:mt-0 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Time Remaining: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Test content */}
      {!result ? (
        <form onSubmit={handleSubmit}>
          {/* Questions */}
          {questions.map(question => (
            <SkillAssessmentQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id]}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}
          
          {/* Submit button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(answers).length !== questions.length}
              className={`px-6 py-3 rounded-lg font-medium ${
                isSubmitting || Object.keys(answers).length !== questions.length
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="inline-block animate-spin mr-2">⟳</span>
              ) : (
                'Submit Answers'
              )}
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{Object.keys(answers).length} of {questions.length} questions answered</span>
              <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </form>
      ) : (
        // Results section
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              result.percentage >= 80 
                ? 'bg-green-100 text-green-800' 
                : result.percentage >= 50 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              <span className="text-3xl font-bold">{result.percentage}%</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Your Skill Level: {result.skillLevel}</h2>
            <p className="text-gray-600 mt-2">
              You answered {result.correctCount} out of {result.totalQuestions} questions correctly
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Recommended Learning Path:</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                {career.roadmap && career.roadmap.slice(0, 3).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetakeTest}
                className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
              >
                Retake Test
              </button>
              <button
                onClick={handleBackToExploration}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Back to Career Exploration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillAssessmentTest; 