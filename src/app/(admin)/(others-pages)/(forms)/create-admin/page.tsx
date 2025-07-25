import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateAdminForm from "@/components/form/form-elements/CreateAdminForm";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Admin | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Create Admin page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function CreateAdmin() {
  return (
    <ProtectedRoute requireSuperAdmin={true}>
      <div>
        <PageBreadcrumb pageTitle="Create Admin" />
        <CreateAdminForm />
      </div>
    </ProtectedRoute>
  );
} 