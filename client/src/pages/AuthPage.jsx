import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google"; // Google Icon
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, githubProvider } from "../../Configs/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const storeUserInDB = async (email, provider) => {
    try {
      await axios.post("http://localhost:3000/api/users/addUser", { email, provider });
    } catch (error) {
      console.error("Error storing user:", error);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await storeUserInDB(formData.email, "email"); // Store only on signup
      }
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error);
    }
  };
  
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if the user is new before adding to DB
      if (result._tokenResponse.isNewUser) {
        await storeUserInDB(result.user.email, "google");
      }
  
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Google auth error:", error);
    }
  };
  

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <GoogleIcon className="w-5 h-5 mr-2 text-red-500" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
