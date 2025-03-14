import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

function CareerCard({ career }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/career-details/${career.name}`);
  };

  // New handler for bookmarking
  const handleBookmark = () => {
    console.log(career._id); // Log the _id of the career
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full h-full relative">
      <div className="absolute top-4 right-4">
        <Bookmark className="h-6 w-6 text-gray-500 cursor-pointer" onClick={handleBookmark} />
      </div>
      <div className="p-6 flex flex-col h-full justify-between">
        <div className='space-y-4'>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {career.category}
          </span>
          <div className="flex items-center mb-2">
            <h3 className="text-2xl font-semibold text-gray-800 mr-3">{career.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{career.description}</p>
        </div>
        
        <div className="mt-5 flex space-x-2">
          <button 
            className="px-4 py-2 text-blue-600 bg-white font-medium rounded-md hover:bg-blue-700 hover:text-white transition-colors flex items-center border-blue-600 border-2"
            onClick={handleViewDetails}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerCard;