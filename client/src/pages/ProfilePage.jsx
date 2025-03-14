import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/api/placeholder/100/100"
  });

  // Dummy test history
  const [testHistory, setTestHistory] = useState([
    {
      id: 1,
      testName: "Career Aptitude Test",
      date: "March 10, 2025",
      score: "87%",
      recommendations: ["Software Engineer", "Data Scientist", "UX Designer"]
    },
    {
      id: 2,
      testName: "Web Development Skills",
      date: "February 22, 2025",
      score: "92%",
      recommendations: ["Focus on React", "Learn GraphQL", "Practice Node.js"]
    },
    {
      id: 3,
      testName: "Communication Skills",
      date: "January 15, 2025",
      score: "75%",
      recommendations: ["Technical Writing", "Product Management", "Customer Success"]
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-blue-100"
            />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
            
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Test History */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Test History</h2>
        
        {testHistory.length > 0 ? (
          <div className="space-y-6">
            {testHistory.map((test) => (
              <div key={test.id} className="border border-gray-200 rounded-lg p-6 hover:bg-blue-50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{test.testName}</h3>
                    <p className="text-gray-600 mt-1">Taken on {test.date}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                      Score: {test.score}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {test.recommendations.map((rec, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-center md:text-right">
                  <Link 
                    to={`/test-results/${test.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Full Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't taken any tests yet.</p>
            <Link 
              to="/tests" 
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take a Test
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;