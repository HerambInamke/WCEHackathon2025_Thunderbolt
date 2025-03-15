import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BookmarkCheck, Award, History, ChevronRight, User, Mail, Calendar, LogOut } from "lucide-react";
import CareerCard from "../components/CareerCard";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [bookmarkedCareers, setBookmarkedCareers] = useState([]);
  const [testHistory, setTestHistory] = useState({ personalityTests: [], skillGapTests: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;

      try {
        const bookmarkResponse = await axios.post("http://localhost:3000/bookmark/get-bookmarks", {
          userId: user.email,
        });
        setBookmarkedCareers(bookmarkResponse.data.bookmarks || []);

        // Fetch test history
        const testHistoryResponse = await axios.post("http://localhost:3000/api/users/test-history", {
          userId: user.email,
        });
        console.log(testHistoryResponse.data) 

        // Assuming the response structure is { history: [...] }
        setTestHistory({
          personalityTests: testHistoryResponse.data.history.filter(test => test.name === 'Personality Assessment') || [],
          skillGapTests: testHistoryResponse.data.history.filter(test => test.name === 'Skill Assessment') || [],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  const handleUnbookmark = async (careerId) => {
    try {
      await axios.post("http://localhost:3000/bookmark/remove-bookmark", {
        userId: user.email,
        careerId: careerId,
      });
      
      // Update the local state to remove the unbookmarked career
      setBookmarkedCareers(bookmarkedCareers.filter(career => career._id !== careerId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in Required</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile</p>
          <Link
            to="/auth"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-blue-500" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-4 border-white rounded-full shadow"></div>
            </div>

            <div className="flex-1">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.displayName || "Anonymous User"}</h1>
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    Joined {new Date(user.metadata.creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <History className="w-4 h-4 mr-2" />
                  {testHistory.personalityTests.length + testHistory.skillGapTests.length} Tests Completed
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  {bookmarkedCareers.length} Careers Bookmarked
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarked Careers Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
            <BookmarkCheck className="w-6 h-6 mr-3 text-blue-500" />
            Bookmarked Careers
          </h2>
          {bookmarkedCareers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedCareers.map((career) => (
                <div key={career._id}>
                  <CareerCard 
                    career={career} 
                    isBookmarked={true}
                    onToggleBookmark={() => handleUnbookmark(career._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">No bookmarked careers yet</p>
              <Link to="/explore" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Explore Careers
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>

        {/* Test History Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
            <Award className="w-6 h-6 mr-3 text-green-500" />
            Test History
          </h2>

          {/* Personality Tests */}
          <h3 className="text-xl font-semibold mb-2">Personality Tests</h3>
          {testHistory.personalityTests.length > 0 ? (
            <ul className="mt-4 space-y-3 mb-6">
              {testHistory.personalityTests.map((test, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-medium">{test.name}</p>
                      {test.recommendedCareers.map((car, idx)=>{
                        return <p>{car}</p>
                      })}
                      <p className="text-gray-500">Date: {new Date(test.date).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Personality
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border mb-6">
              <p className="text-gray-600 mb-3">No personality tests taken yet</p>
              <Link 
                to="/test" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Take Personality Test
              </Link>
            </div>
          )}

          {/* Skill Gap Tests */}
          <h3 className="text-xl font-semibold mb-2">Skill Gap Tests</h3>
          {testHistory.skillGapTests.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {testHistory.skillGapTests.map((test, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-medium">{test.name}</p>
                      <p className="text-gray-500">Score: {test.score}</p>
                      <p className="text-gray-500">Date: {new Date(test.date).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Skill Assessment
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-600">No skill gap tests taken yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Skill gap tests are available for specific careers. Explore careers to find skill assessments.
              </p>
              <Link to="/explore" className="text-blue-600 hover:underline mt-2 inline-block">
                Explore careers
              </Link>
            </div>
          )}

          {/* Show a message if no tests at all */}
          {testHistory.personalityTests.length === 0 && testHistory.skillGapTests.length === 0 && (
            <div className="mt-6 text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-2">You haven't taken any tests yet</p>
              <p className="text-gray-600 mb-4">Taking tests will help you discover suitable career paths</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  to="/test" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Take Personality Test
                </Link>
                <Link 
                  to="/explore" 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Explore Careers
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
