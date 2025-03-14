import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SkillAssessmentInstructions = () => {
  const navigate = useNavigate();
  const { careerId } = useParams();

  const handleStartTest = () => {
    navigate(`/skill-assessment/${careerId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Skill Assessment Instructions</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Skill Assessment Test! Please read the following instructions carefully:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Ensure you are in a quiet environment with minimal distractions.</li>
        <li>The test consists of multiple-choice questions related to your chosen career path.</li>
        <li>You will have 5 minutes to complete the test.</li>
        <li>Once you start the test, you must remain in full-screen mode.</li>
        <li>If you switch tabs or exit full-screen, the test will end automatically.</li>
        <li>Your results will be displayed at the end of the test.</li>
      </ul>
      <button 
        onClick={handleStartTest}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Start Test
      </button>
    </div>
  );
};

export default SkillAssessmentInstructions; 