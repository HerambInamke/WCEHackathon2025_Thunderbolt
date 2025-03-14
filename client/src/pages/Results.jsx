import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import CareerCard from '../components/CareerCard';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Results() {

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const { recommendations } = useTest();
  const [recommendedCareers , setRecommendedCareers] = useState([])

  useEffect(()=>{
    const fetchCareer = async () => {
      try {
        const response = await fetch('http://localhost:3000/careers/multipleCareername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recommendations: recommendations }), 
        });

        if (!response.ok) {
          throw new Error('Career not found');
        }

        const foundCareers = await response.json();
        setRecommendedCareers(foundCareers);
      } catch (error) {
        console.error(error); // Navigate if career not found
      }
    };

    fetchCareer();
  },[])

  useEffect(() => {
    const addRecommendedCareers = async () => {
        const user = auth.currentUser;
        if (user) {
            const email = user.email;
            try {
                const response = await fetch('http://localhost:3000/careers/addRecommendedCareers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, recommendedCareerIds: recommendedCareers.map(career => career._id) }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add recommended careers');
                }

                const result = await response.json();
                console.log(result.message);
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (recommendedCareers.length > 0) {
        addRecommendedCareers();
    }
  }, [recommendedCareers]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Career Recommendations</h1>
      <p className="text-gray-600 mb-8">
        Based on your personality test responses, here are the careers that best match your profile:
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {recommendedCareers.map(career => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Link
          to="/explore"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore More Careers
        </Link>
        <Link
          to="/test"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Retake Test
        </Link>
      </div>
    </div>
  );
}

export default Results;