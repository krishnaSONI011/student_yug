"use client"
import type { Metadata } from "next";

import "./dashboard.css";
import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import Sidebar from "../Components/Dashboard/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(!user) {
      router.push("/")
    }
  })
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
