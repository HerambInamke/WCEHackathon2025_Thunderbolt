import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Award, Briefcase, AlertCircle, TrendingUp, Heart, Users, Code, Calendar } from 'lucide-react';

const TestAnalytics = () => {
  // Dummy test history data
  const testHistory = [
    {
      id: 1,
      date: '2024-02-15',
      traitData: [
        { trait: 'Analytical Thinking', score: 85 },
        { trait: 'Creativity', score: 72 },
        { trait: 'Leadership', score: 68 },
        { trait: 'Communication', score: 78 },
        { trait: 'Problem Solving', score: 82 }
      ],
      strengths: [
        'Strong analytical and problem-solving abilities',
        'Excellent communication skills',
        'High attention to detail',
        'Creative problem-solving approach'
      ],
      weaknesses: [
        'Public speaking confidence',
        'Delegation of tasks',
        'Work-life balance management',
        'Handling ambiguous situations'
      ],
      careerMatches: [
        { role: 'Software Engineer', match: 92, icon: Code },
        { role: 'Data Scientist', match: 88, icon: TrendingUp },
        { role: 'Product Manager', match: 85, icon: Users },
        { role: 'UX Researcher', match: 82, icon: Heart }
      ]
    },
    {
      id: 2,
      date: '2024-01-10',
      traitData: [
        { trait: 'Analytical Thinking', score: 80 },
        { trait: 'Creativity', score: 75 },
        { trait: 'Leadership', score: 65 },
        { trait: 'Communication', score: 70 },
        { trait: 'Problem Solving', score: 78 }
      ],
      strengths: [
        'Creative thinking',
        'Technical aptitude',
        'Team collaboration',
        'Learning agility'
      ],
      weaknesses: [
        'Time management',
        'Strategic planning',
        'Conflict resolution',
        'Presentation skills'
      ],
      careerMatches: [
        { role: 'Software Engineer', match: 88, icon: Code },
        { role: 'Data Analyst', match: 85, icon: TrendingUp },
        { role: 'Technical Lead', match: 82, icon: Users },
        { role: 'Business Analyst', match: 80, icon: Heart }
      ]
    }
  ];

  const [selectedTest, setSelectedTest] = useState(testHistory[0]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Career Profile Analysis</h1>
          <p className="text-xl text-gray-600">View and compare your assessment results</p>
        </div>

        {/* Test History Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test History</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {testHistory.map((test) => (
              <div
                key={test.id}
                onClick={() => setSelectedTest(test)}
                className={`cursor-pointer transition-all duration-200 p-4 rounded-lg shadow-md 
                  ${selectedTest.id === test.id 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium">{formatDate(test.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Award className="text-green-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Key Strengths</h2>
            </div>
            <ul className="space-y-3">
              {selectedTest.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-amber-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Areas for Growth</h2>
            </div>
            <ul className="space-y-3">
              {selectedTest.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personality Traits Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personality Traits Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedTest.traitData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="trait" type="category" width={150} />
                <Bar dataKey="score" fill="#4F46E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Briefcase className="text-blue-600 w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Recommended Career Paths</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {selectedTest.careerMatches.map((career, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
                <career.icon className="w-8 h-8 text-blue-600 mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{career.role}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${career.match}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{career.match}% Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalytics;