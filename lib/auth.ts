'use client';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "@/config/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document already exists
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // Only create document if it doesn't exist (new user)
    if (!userDoc.exists()) {
      // Parse display name into first and last names
      const nameParts = user.displayName?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await setDoc(userDocRef, {
        displayName: user.displayName || "",
        firstName,
        lastName,
        photo: user.photoURL || "",
        email: user.email || "",
        createdAt: serverTimestamp(),
        fields: {} // Empty object by default, user can add fields later
      });
    }

    return user;
  } catch (error) {
    console.error("Google sign-in failed:", error);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
};

export { auth };
