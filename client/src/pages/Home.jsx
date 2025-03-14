import React from 'react';
import { Link } from 'react-router-dom'
import {
  Compass,
  ClipboardList,
  ChevronRight,
  Briefcase,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Briefcase className="text-blue-600 w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take our intelligent personality assessment to find career recommendations
            that perfectly align with your unique interests, skills, and work style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Compass className="text-blue-600 w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Explore Careers
                </h2>
              </div>
              <p className="text-gray-600 mb-6 h-20">
                Browse through curated career paths and discover detailed insights about
                different professional opportunities. Learn what it takes to succeed in
                various fields.
              </p>
              <Link
              to={"/explore"}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-300"
              >
                Start Exploring
                <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <ClipboardList className="text-green-600 w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Take the Assessment
                </h2>
              </div>
              <p className="text-gray-600 mb-6 h-20">
                Complete our comprehensive personality assessment to receive tailored
                career recommendations based on your unique traits and preferences.
              </p>
              <Link
                to="/test"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group-hover:translate-x-1 duration-300"
              >
                Start Assessment
                <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
            <Lightbulb className="text-yellow-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Personalized Insights
            </h3>
            <p className="text-gray-600">
              Get detailed analysis of your strengths and potential career matches
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
            <TrendingUp className="text-purple-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Growth Opportunities
            </h3>
            <p className="text-gray-600">
              Discover high-demand careers and emerging professional paths
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
            <Briefcase className="text-blue-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Expert Guidance
            </h3>
            <p className="text-gray-600">
              Access resources and tips from industry professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;