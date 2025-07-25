"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "@/services/auth/authService";
import { SuperAdminService } from "@/services/superadmins";

type UserContextType = {
  user: any;
  isSuperAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // First try to get super admin profile
      try {
        const superAdminProfile = await SuperAdminService.getSuperAdminById();
        if (superAdminProfile && superAdminProfile.data) {
          const userData = Array.isArray(superAdminProfile.data) 
            ? superAdminProfile.data[0] 
            : superAdminProfile.data;
          setUser(userData);
          setIsSuperAdmin(true);
          return;
        }
      } catch (err) {
        // If super admin fetch fails, try regular profile
        console.log("Not a super admin, trying regular profile");
      }

      // Try to get regular user profile
      const profile = await AuthService.getProfile();
      if (profile && profile.data) {
        setUser(profile.data.user);
        setIsSuperAdmin(false);
      }
    } catch (err: any) {
      setError("Failed to fetch user profile");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isSuperAdmin,
        isLoading,
        error,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 