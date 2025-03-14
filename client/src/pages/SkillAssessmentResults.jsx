import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getSkillGapAnalysis } from '../utils/getSkillGapAnalysis';

const SkillAssessmentResults = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const location = useLocation();
  const { result, career, questions, answers } = location.state || {};
  const [reviewRating, setReviewRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [showError, setShowError] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [skillGapAnalysisResult , setSkillGapAnalysisResult] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
  const fetchSkillGapAnalysis = async () => {
    setIsLoading(true);
    try {
      const email = auth.currentUser.email;
      const careerName = career.name;
      const score = result.percentage;

      // First send the test result to the backend
      await axios.post('http://localhost:3000/careers/addSkillTestResult', {
        email,
        careerName,
        score,
      });
      
      // Make sure we have questions and answers before proceeding
      if (!questions || !answers || questions.length === 0) {
        console.error("Missing questions or answers data");
        setShowError(true);
        return;
      }
      
      // Log data for debugging
      console.log("Questions:", questions);
      console.log("Answers:", answers);
      setShowError(false);
    } catch (error) {
      console.error("Error submitting skill test result:", error);
      setShowError(true);
    }
  };
  
  if (career && questions && answers && result) {
    fetchSkillGapAnalysis();
  } else {
    console.error("Missing required data for skill gap analysis");
    setIsLoading(false);
  }
}, [career, questions, answers, result]);

useEffect(()=>{
  let fetchGapAnaylsis = async () =>{
    const ans = await getSkillGapAnalysis(career.name, questions, answers);
    console.log("Skill Gap Analysis Result:", ans);
    
    // Set the result
    setSkillGapAnalysisResult(Array.isArray(ans) ? ans : []);
    setIsLoading(false)
  }

  fetchGapAnaylsis()
},[career, questions, answers])

  const handleRatingChange = (rating) => {
    setReviewRating(rating);
    if (showError) setShowError(false);
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
    if (showError) setShowError(false);
  };

  const handleSubmitReview = async () => {
    if (reviewRating && reviewText.trim()) {
      // Here you would typically send the review data to your backend
      console.log("Review submitted:", { rating: reviewRating, text: reviewText });
      setReviewSubmitted(true)
    } else {
      setShowError(true);
    }
  };

  const handleContinue = () => {
    if (!reviewSubmitted) {
      setShowError(true);
      return;
    }
    // Navigation logic would go here
    console.log("Continuing to Career Exploration");
    navigate("/explore")
    // You could use navigation here, e.g., router.push('/career-exploration')
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Skill Assessment Results</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Score: {result?.percentage}%</h2>
          <p className="text-gray-600 mt-2">You answered {result?.correctCount} out of {result?.totalQuestions} questions correctly.</p>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Answers</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {questions.map((question, index) => (
            <li key={index}>
              <strong>{question.question}</strong> {/* Assuming question has a text property */}
              <p className={`${answers[index] == question.correctAnswer ? "text-green-700" : "text-red-500"}`}>Your answer: {answers[index]}</p> {/* Assuming question has options */}
              <p>Correct answer: {question.correctAnswer}</p> {/* Assuming question has correctAnswer */}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mb-4 mt-10">Skill Gap Analysis</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          {isLoading ? (
            <p className="text-blue-800">Analyzing skill gap...</p>
          ) : (
            <>
              <h4 className="font-medium text-blue-800 mb-2">Skills to Improve:</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                {
                  skillGapAnalysisResult.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                }
              </ul>
            </>
          )}
        </div>
        
        {!reviewSubmitted ? (
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Test Review</h3>
            <p className="text-gray-600 mb-4">Please provide your feedback about this assessment.</p>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">How would you rate this assessment?</label>
              <div className="flex gap-4">
                {['Bad', 'Average', 'Good'].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      reviewRating === rating 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleRatingChange(rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                id="reviewText"
                className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us what you think about this assessment..."
                value={reviewText}
                onChange={handleTextChange}
              ></textarea>
            </div>
            
            {showError && (
              <div className="text-red-600 mb-4">
                Please provide both a rating and written review before continuing.
              </div>
            )}
            
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-green-800">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">Thank you for your feedback!</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button 
            className={`px-6 py-3 text-white rounded-lg ${
              reviewSubmitted 
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!reviewSubmitted}
          >
            Back to Career Exploration
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessmentResults;