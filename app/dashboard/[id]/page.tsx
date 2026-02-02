"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Proposal } from "@/lib/supabase";

export default function Dashboard() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`/api/proposals/${id}`);
        if (!response.ok) {
          throw new Error("Proposal not found");
        }
        const { proposal } = await response.json();
        setProposal(proposal);
      } catch (error) {
        console.error("Error fetching proposal:", error);
        alert("Invalid dashboard link!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProposal();
    }

    // Auto-refresh every 5 seconds to check for updates
    const interval = setInterval(() => {
      if (id) {
        fetchProposal();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/valentines/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleCreateNew = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="text-2xl text-gray-600">Loading dashboard...</div>
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="text-center space-y-4">
          <div className="text-6xl">😢</div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard not found</h1>
          <p className="text-gray-600">This proposal doesn't exist.</p>
          <button
            onClick={handleCreateNew}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Create New Proposal
          </button>
        </div>
      </main>
    );
  }

  const getStatusDisplay = () => {
    if (proposal.response === "pending") {
      return {
        icon: "⏳",
        title: "Waiting for Response",
        message: `${proposal.crush_name} hasn't responded yet. Keep your fingers crossed!`,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      };
    } else if (proposal.response === "yes") {
      return {
        icon: "🎉",
        title: "They Said YES!",
        message: `${proposal.crush_name} accepted your Valentine's proposal! Congratulations! 💖`,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
    } else {
      return {
        icon: "💔",
        title: "They Said No",
        message: `Unfortunately, ${proposal.crush_name} declined. Don't worry, there are plenty of fish in the sea! 🐟`,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    }
  };

  const status = getStatusDisplay();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-6xl">{status.icon}</div>
          <h1 className="text-4xl font-bold text-gray-800">Your Dashboard</h1>
          <p className="text-gray-500">Track your Valentine's proposal</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">From:</span>
            <span className="text-gray-800 font-bold">{proposal.sender_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">To:</span>
            <span className="text-gray-800 font-bold">{proposal.crush_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Created:</span>
            <span className="text-gray-800">
              {new Date(proposal.created_at).toLocaleDateString()}
            </span>
          </div>
          {proposal.responded_at && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Responded:</span>
              <span className="text-gray-800">
                {new Date(proposal.responded_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className={`${status.bgColor} border-2 ${status.borderColor} rounded-lg p-6 text-center space-y-3`}>
          <h2 className={`text-2xl font-bold ${status.color}`}>
            {status.title}
          </h2>
          <p className="text-gray-700">
            {status.message}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopyLink}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg"
          >
            📋 Copy Valentine's Link
          </button>
          
          <button
            onClick={handleCreateNew}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg"
          >
            💕 Create New Proposal
          </button>
        </div>

        {proposal.response === "pending" && (
          <p className="text-center text-sm text-gray-500 italic">
            This page auto-refreshes every 5 seconds
          </p>
        )}
      </div>
    </main>
  );
}
