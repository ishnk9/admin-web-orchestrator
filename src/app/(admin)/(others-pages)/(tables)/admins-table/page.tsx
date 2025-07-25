import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AdminsTable from "@/components/tables/AdminsTable";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admins Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Admins Table page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function AdminsTablePage() {
  return (
    <ProtectedRoute requireSuperAdmin={true}>
      <div>
        <PageBreadcrumb pageTitle="Admins Table" />
        <div className="space-y-6">
          <ComponentCard title="Admins Management">
            <AdminsTable />
          </ComponentCard>
        </div>
      </div>
    </ProtectedRoute>
  );
} 