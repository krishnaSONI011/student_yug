"use client";

import "./dashboard.css";
import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import Sidebar from "../Components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDriverTour } from "../hook/useDriverTour";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const startTour = useDriverTour();

  const [showTourModal, setShowTourModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
      return;
    }

    // Check if tour was already handled
    const tourDecision = localStorage.getItem("dashboard_tour_done");
    if (!tourDecision) {
      setShowTourModal(true);
    }
  }, [router]);

  /* ---------- HANDLERS ---------- */
  const handleStartTour = () => {
    localStorage.setItem("dashboard_tour_done", "yes");
    setShowTourModal(false);
    startTour(); // 🔥 start driver tour
  };

  const handleSkipTour = () => {
    localStorage.setItem("dashboard_tour_done", "skip");
    setShowTourModal(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* ================= TOUR MODAL ================= */}
      {showTourModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Welcome 🎉
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Would you like a quick tour of the dashboard?
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleSkipTour}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Skip
              </button>

              <button
                onClick={handleStartTour}
                className="flex-1 py-3 rounded-xl bg-[#204b73] text-white hover:bg-[#183a5b] transition font-semibold"
              >
                Yes, Start Tour
              </button>
            </div>
          </div>

          {/* Animation */}
          <style jsx>{`
            .animate-fadeIn {
              animation: fadeIn 0.25s ease-out;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
      {/* ================================================= */}
    </div>
  );
}
