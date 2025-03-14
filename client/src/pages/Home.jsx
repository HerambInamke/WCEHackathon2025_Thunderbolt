import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ClipboardList,
  ChevronRight,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-left font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const faqs = [
    {
      question: "How does the career assessment work?",
      answer: "Our career assessment uses advanced algorithms to analyze your personality traits, skills, and interests. Through a series of carefully designed questions, we create a comprehensive profile that matches you with suitable career paths."
    },
    {
      question: "How long does a consultation session take?",
      answer: "Each consultation session typically lasts 45-60 minutes. During this time, you'll discuss your career goals, receive personalized guidance, and develop an action plan with our expert career counselors."
    },
    {
      question: "What makes CareerCompass different?",
      answer: "CareerCompass combines AI-powered assessments with personalized human guidance. We offer comprehensive career insights, skill gap analysis, and direct access to industry professionals for a truly tailored career development experience."
    },
    {
      question: "Can I change my consultation appointment?",
      answer: "Yes, you can reschedule your consultation up to 24 hours before the scheduled time. Simply access your booking confirmation email or contact our support team to make changes."
    },
    {
      question: "What should I prepare for my consultation?",
      answer: "To make the most of your session, prepare a brief summary of your background, career interests, and specific questions you'd like to discuss. You may also want to have your resume ready if you'd like to review it."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Trusted Career Guidance</span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Discover Your Perfect <span className="text-blue-600">Career Path</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Take our intelligent personality assessment to find career recommendations
              that perfectly align with your unique interests, skills, and work style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/test"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 duration-200"
              >
                Start Assessment
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all transform hover:scale-105 duration-200"
              >
                Explore Careers
                <Compass className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-1/2 pl-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform rotate-3 rounded-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Career Planning"
                className="relative rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl -mt-8 shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How We Help You Succeed</h2>
          <p className="mt-4 text-lg text-gray-600">Comprehensive career guidance tailored to your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 transform transition-all duration-200 hover:scale-105">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Assessment</h3>
            <p className="text-gray-600">
              Take our comprehensive personality test to understand your strengths, interests, and ideal work environment.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 transform transition-all duration-200 hover:scale-105">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Insights</h3>
            <p className="text-gray-600">
              Get detailed information about various career paths, including skills required and growth opportunities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 transform transition-all duration-200 hover:scale-105">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Guidance</h3>
            <p className="text-gray-600">
              Connect with career counselors and industry professionals for personalized advice and mentorship.
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl shadow-xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
            }}
          >
            {/* Dark overlay with blue tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/90"></div>
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 sm:p-16 xl:p-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                Ready to Take the Next Step?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Schedule a consultation with our career experts and get personalized guidance for your career journey.
              </p>
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:scale-105 duration-200"
              >
                Book a Consultation
                <Calendar className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">Everything you need to know about our career guidance services</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>/
      {/* Footer Section */}
<footer className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Top Footer Area with Columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {/* Company Information */}
      <div>
        <h3 className="text-xl font-bold mb-4">CareerCompass</h3>
        <p className="text-gray-400 mb-6">
          Helping professionals discover and pursue meaningful career paths through personalized guidance and expert insights.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Our Services
            </Link>
          </li>
          <li>
            <Link to="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Career Blog
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/assessments" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Career Assessments
            </Link>
          </li>
          <li>
            <Link to="/counseling" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Career Counseling
            </Link>
          </li>
          <li>
            <Link to="/resume" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Resume Building
            </Link>
          </li>
          <li>
            <Link to="/mentorship" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Industry Mentorship
            </Link>
          </li>
          <li>
            <Link to="/workshops" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Career Workshops
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <MapPin className="w-5 h-5 mr-3 text-blue-400 mt-1" />
            <span className="text-gray-400">
              123 Career Street, Suite 200<br />
              San Francisco, CA 94103
            </span>
          </li>
          <li className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-blue-400" />
            <span className="text-gray-400">(555) 123-4567</span>
          </li>
          <li className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-blue-400" />
            <a href="mailto:info@careercompass.com" className="text-gray-400 hover:text-white transition-colors">
              info@careercompass.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Footer Area */}
    <div className="pt-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} CareerCompass. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
    
  );
  
};

export default Home;