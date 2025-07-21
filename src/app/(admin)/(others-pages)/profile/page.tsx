"use client";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import { SuperAdminService } from "@/services/superadmins";


export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [superAdmin, setSuperAdmin] = useState<any>(null);

  useEffect(() => {
    const fetchSuperAdmin = async () => {
      setLoading(true);
      setError(null);
      try {
        const superAdminProfile = await SuperAdminService.getSuperAdminById();
        if (superAdminProfile && superAdminProfile.data) {
          const user = Array.isArray(superAdminProfile.data) ? superAdminProfile.data[0] : superAdminProfile.data;
          setSuperAdmin(user);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err: any) {
        setError("Error fetching superadmin info.");
      } finally {
        setLoading(false);
      }
    };
    fetchSuperAdmin();
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          {loading ? (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 text-center">Loading superadmin info...</div>
          ) : error ? (
            <div className="p-5 border border-red-200 rounded-2xl dark:border-red-800 text-center text-red-600">{error}</div>
          ) : (
            <UserMetaCard  data={superAdmin}/>
          )}
          <UserInfoCard data={superAdmin}/>
        </div>
      </div>
    </div>
  );
}
