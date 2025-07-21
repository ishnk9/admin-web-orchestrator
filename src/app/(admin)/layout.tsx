"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { AuthService } from "@/services/auth/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/app/(full-width-pages)/(auth)/signin/page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res: any = await AuthService.verifyToken();
        if (res && res?.verified == 1) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } catch (err) {
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Verifying access...</div>;
  }

  if (!verified) {
    return <SignIn />;
  }

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex overflow-x-hidden">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
