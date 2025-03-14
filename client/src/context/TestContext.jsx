import { createContext, useContext, useState } from 'react';

const TestContext = createContext();

export function TestProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const updateAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateRecommendations = () => {
    // Simple mock recommendation logic
    const recommendedCareers = [1, 2, 3]; // Mock IDs
    setRecommendations(recommendedCareers);
  };

  return (
    <TestContext.Provider value={{ 
      answers, 
      setAnswers,
      updateAnswer, 
      recommendations, 
      calculateRecommendations 
    }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  return useContext(TestContext);
}