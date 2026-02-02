"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [senderName, setSenderName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [proposalId, setProposalId] = useState("");
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderName.trim() || !crushName.trim()) {
      alert("Please fill in both names!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/proposals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: senderName.trim(),
          crushName: crushName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create proposal");
      }

      const { proposal } = await response.json();
      const link = `${window.location.origin}/valentines/${proposal.id}`;
      
      setGeneratedLink(link);
      setProposalId(proposal.id);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  const handleViewDashboard = () => {
    router.push(`/dashboard/${proposalId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center space-y-8">
        <div className="flex justify-center">
          <div className="text-8xl">💕</div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Valentine&apos;s Link Generator
          </h1>
          <p className="text-gray-600">
            Create a special Valentine&apos;s proposal that&apos;s impossible to reject!
          </p>
        </div>

        {!generatedLink ? (
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-4">
              <div className="text-left">
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="senderName"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="crushName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Crush&apos;s Name
                </label>
                <input
                  id="crushName"
                  type="text"
                  value={crushName}
                  onChange={(e) => setCrushName(e.target.value)}
                  placeholder="Enter their name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {loading ? "Generating..." : "Generate Valentine&apos;s Link 💖"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-4">
              <div className="text-4xl">✅</div>
              <h2 className="text-xl font-bold text-green-800">
                Link Generated!
              </h2>
              <p className="text-gray-700 text-sm">
                Share this link with <span className="font-bold">{crushName}</span>
              </p>
              
              <div className="bg-white p-3 rounded-lg border border-gray-300 break-all text-sm text-gray-600">
                {generatedLink}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg"
                >
                  📋 Copy Link
                </button>
                <button
                  onClick={handleViewDashboard}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg"
                >
                  📊 Dashboard
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setGeneratedLink("");
                setProposalId("");
                setSenderName("");
                setCrushName("");
              }}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Create another link
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
