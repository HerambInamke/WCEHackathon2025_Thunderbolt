import React from 'react';
import { useTest } from '../context/TestContext';

function QuestionCard({ question }) {
  const { answers, updateAnswer } = useTest();

  if (question.type === "text") {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>
        <textarea
          value={answers[question.id] || ""}
          onChange={(e) => updateAnswer(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={answers[question.id] === option.id}
              onChange={() => updateAnswer(question.id, option.id)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;