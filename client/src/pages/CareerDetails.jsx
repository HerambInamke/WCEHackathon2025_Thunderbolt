import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchYouTubeResources } from '../services/youtube';
import LoadingSpinner from '../components/LoadingSpinner';

function CareerDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await fetch('http://localhost:3000/careers/careername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), // Send the career name in the request body
        });

        if (!response.ok) {
          throw new Error('Career not found');
        }

        const foundCareer = await response.json();
        setCareer(foundCareer);
      } catch (error) {
        console.error(error);
        navigate('/explore'); // Navigate if career not found
      }
    };

    fetchCareer();
  }, [name, navigate]);

  const handleTakeTest = () => {
    navigate(`/skill-assessment/instructions/${name}`);
  };

  const handleGetResources = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!import.meta.env.VITE_YOUTUBE_API_KEY) {
        throw new Error('Please configure your YouTube API key in the .env file');
      }
      const videos = await fetchYouTubeResources(career, career.skills);
      setResources(videos);
    } catch (err) {
      setError(err.message || 'Failed to fetch resources. Please try again later.');
      console.error('Error fetching resources:', err);
    } finally {
      setIsLoading(false);
    }
  };


  if (!career) {
    return <div className="max-w-6xl mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      {/* Back button */}
      <button 
        onClick={() => navigate('/explore')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Career Exploration
      </button>

      {/* Career Header - Section 1 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-800">{career.name}</h1>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {career.category}
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">{career.description}</p>
          </div>
          
          <div className="flex-shrink-0">
            <button 
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center shadow-sm"
              onClick={handleTakeTest}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Take A Test
            </button>
          </div>
        </div>
      </div>

      {/* Key Skills Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Key Skills</h2>
          <div className="flex flex-wrap gap-3">
            {career.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mt-4 max-w-4xl">
            These are the essential skills required to excel as a {career.name}. Developing these skills will help you build a strong foundation for your career.
          </p>
          {/* Get Resources Button */}
          {/* Resources Grid */}
          <div className="space-y-6">
            {resources.length === 0 && !isLoading && (
              <button 
                onClick={handleGetResources} 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                Get Resources
              </button>
            )}

            {isLoading && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                {error}
              </div>
            )}

            {resources.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 line-clamp-2 hover:text-blue-600">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
            </div>
        </div>
      </div>

      {/* Career Path Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Career Progression</h2>
          <div className="relative py-6">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 h-0.5 bg-blue-300 top-12 z-0"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {career.potentialPaths.map((path, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Circle with number */}
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-4 z-10 shadow-md">
                    {index + 1}
                  </div>
                  {/* Path name */}
                  <h5 className="font-medium text-gray-800">{path}</h5>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            This career path shows the typical progression for a {career.name}. Keep in mind that career paths can vary based on industry, company size, and personal goals.
          </p>
        </div>
      </div>

      {/* Learning Roadmap Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Learning Roadmap</h2>
          <div className="relative py-6">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 h-0.5 bg-green-300 top-12 z-0"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {career.roadmap && career.roadmap.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Circle with number */}
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-4 z-10 shadow-md">
                    {index + 1}
                  </div>
                  {/* Step description */}
                  <p className="text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            This learning roadmap provides a structured approach to developing the skills needed for a successful career as a {career.name}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CareerDetails; 