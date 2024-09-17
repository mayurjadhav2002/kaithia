"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  userId: string;
  avatar: string;
  password_reset: string;
  password_reset_token: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface Permissions {
  groupCreation: boolean;
  groupAdding: boolean;
}

interface Profile {
  _id: string;
  userId: string;
  bio: string;
  skills: string[];
  links: string[];
  permissions: Permissions;
  created_on: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  userId: string | null;
  userData: User | null;
  profileData: Profile | null;
  updateUserData: (data: { user: User; profile: Profile }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<Profile | null>(null);

  const updateUserData = (data: { user: User; profile: Profile }) => {
    setUserId(data.user.userId);
    setUserData(data.user);
    setProfileData(data.profile);
  };

  useEffect(() => {
    if (!userId && window?.Telegram?.WebApp) {
      const { user } = window.Telegram.WebApp.initDataUnsafe;
  
      if (user) {
        const userId = user.id || "mayur8908";
        console.log("User ID:", userId);
  
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
          .then((response) => response.json())
          .then(({ user, profile }) => {
            console.log("Data received:", { user, profile });
            updateUserData({ user, profile });
          })
          .catch((error) => console.error("Error:", error));
      }
    }
  }, [userId]);
  

  return (
    <UserContext.Provider value={{ userId, userData, profileData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an AppProvider");
  }
  return context;
};
