import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import { useTest } from '../context/TestContext';
import { getAuth } from 'firebase/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import Snackbar from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRecommendations } from '../utils/getRecommendations';

const PersonalityTest = ({ setNavbarVisible }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'error'
  });
  const { answers, setAnswers, calculateRecommendations, setRecommendations } = useTest();

  // Function to enter fullscreen
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  // Function to exit fullscreen
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen change and tab visibility change
  useEffect(() => {
    enterFullscreen(); // Enter fullscreen on component mount

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        window.location.href = '/'; // Redirect to home if fullscreen is exited
      }
    };

    const handleTabChange = () => {
      if (document.visibilityState === 'hidden') {
        window.location.href = '/'; // Redirect to home if the user switches tabs
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleTabChange);

    setNavbarVisible(false); // Hide navbar when the test starts

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleTabChange);
      exitFullscreen(); // Ensure fullscreen exits on unmount
      setNavbarVisible(true); // Show navbar when the test ends
    };
  }, [setNavbarVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      setSnackbar({
        open: true,
        message: 'Please answer all questions before submitting.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const answersWithQuestions = questions.map(question => ({
        question: question,
        answer: answers[question.id] || null 
      }));

      const recommendedCareers = await getRecommendations(answersWithQuestions);
      const email = auth.currentUser.email
      await axios.post("http://localhost:3000/careers/addPersonalityTestResult",{
        email,
        recommendedCareers
      })
      setAnswers({}); // Clear form state after submission
      exitFullscreen(); // Exit fullscreen when submitting
      console.log(recommendedCareers, "recommended")
      setRecommendations(recommendedCareers); // Update context with recommendations
      navigate('/results');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch recommendations. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (isSubmitting) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <LoadingSpinner />
        <p className="text-center mt-4 text-gray-600">Processing your responses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Personality Test</h1>
      <form onSubmit={handleSubmit}>
        {questions.map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answers
        </button>
      </form>
      
      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.open}
        onClose={handleCloseSnackbar}
        type={snackbar.type}
      />
    </div>
  );
};

export default PersonalityTest;