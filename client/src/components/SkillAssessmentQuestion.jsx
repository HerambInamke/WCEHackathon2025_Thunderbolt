import React from 'react';

function SkillAssessmentQuestion({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {question.id}
        </div>
        <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
      </div>
      
      <div className="ml-11 space-y-3">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              selectedAnswer === option 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onAnswerSelect(question.id, option)}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                selectedAnswer === option 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={selectedAnswer === option ? 'text-blue-700' : 'text-gray-700'}>
                {option}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 ml-11">
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
          question.difficulty === 'beginner' 
            ? 'bg-green-100 text-green-800' 
            : question.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
    </div>
  );
}

export default SkillAssessmentQuestion; 