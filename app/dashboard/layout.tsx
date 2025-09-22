import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./dashboard.css";
import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import Sidebar from "../Components/Dashboard/Sidebar";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudentYug Dashboard - Your Green Journey",
  description: "Track your tree planting progress and connect with fellow environmental enthusiasts.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
