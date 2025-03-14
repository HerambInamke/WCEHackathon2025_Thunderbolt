import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.uid);
    }
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setProfileData(userDoc.data());
      } else {
        console.log("No profile data found.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-700 mt-6">Please sign in to view your profile.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-gray-800">Your Profile</h2>

      <div className="mt-4 text-gray-700">
        <p><strong>Name:</strong> {user.displayName || "Not Provided"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
      </div>

      {profileData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Past Personality Tests</h3>
          {profileData.personalityTests?.length ? (
            <ul className="mt-2 list-disc pl-6">
              {profileData.personalityTests.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
          ) : (
            <p>No past personality tests found.</p>
          )}

          <h3 className="text-xl font-semibold mt-4">Past Skill Gap Tests</h3>
          {profileData.skillGapTests?.length ? (
            <ul className="mt-2 list-disc pl-6">
              {profileData.skillGapTests.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
          ) : (
            <p>No past skill gap tests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
