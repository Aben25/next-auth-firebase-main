import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  // Add this line to keep profile state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadProfileData(currentUser.uid);  // Load profile when user logs in
      }
    });
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
    setProfile(null); // Clear profile when user logs out
  };

  const saveProfileData = async (data) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const newData = { ...data, userId: user.uid }; // Add userId to the data
    await setDoc(docRef, newData);
    setProfile(newData);
  };
  

  const loadProfileData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, googleSignIn, logOut, saveProfileData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
