'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signOutUser } from "@/lib/auth";
import { onAuthStateChanged, User } from "firebase/auth";

export default function MainPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/auth/"); // Redirect to login page
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl text-gray-700">Please sign in first</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <h1 className="text-2xl font-bold">{user.displayName}</h1>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
