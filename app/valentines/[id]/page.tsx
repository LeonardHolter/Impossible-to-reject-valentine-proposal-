"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Proposal } from "@/lib/supabase";

export default function ValentinesProposal() {
  const params = useParams();
  const id = params.id as string;
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [showAcceptance, setShowAcceptance] = useState(false);
  const [originalPosition, setOriginalPosition] = useState<{ x: number; y: number } | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch proposal data
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`/api/proposals/${id}`);
        if (!response.ok) {
          throw new Error("Proposal not found");
        }
        const { proposal } = await response.json();
        
        // If already responded, show the result immediately
        if (proposal.response !== "pending") {
          setShowAcceptance(proposal.response === "yes");
        }
        
        setProposal(proposal);
      } catch (error) {
        console.error("Error fetching proposal:", error);
        alert("Invalid or expired link!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProposal();
    }
  }, [id]);

  // Store original position on mount
  useEffect(() => {
    if (noButtonRef.current && !originalPosition) {
      const rect = noButtonRef.current.getBoundingClientRect();
      setOriginalPosition({ x: rect.left, y: rect.top });
    }
  }, [originalPosition, proposal]);

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, []);

  const startReturnTimer = useCallback(() => {
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }
    
    returnTimeoutRef.current = setTimeout(() => {
      setIsReturning(true);
      
      setTimeout(() => {
        setNoButtonPosition(null);
        setIsReturning(false);
      }, 800);
    }, 2000);
  }, []);

  const moveNoButton = () => {
    if (!noButtonRef.current) return;
    
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }
    
    setIsReturning(false);

    const button = noButtonRef.current;
    const buttonRect = button.getBoundingClientRect();
    
    if (!originalPosition) {
      setOriginalPosition({ x: buttonRect.left, y: buttonRect.top });
    }
    
    const isFirstMove = noButtonPosition === null;
    if (isFirstMove) {
      setNoButtonPosition({ x: buttonRect.left, y: buttonRect.top });
    }
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const maxX = viewportWidth - buttonRect.width - 20;
    const maxY = viewportHeight - buttonRect.height - 20;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    const currentX = buttonRect.left;
    const currentY = buttonRect.top;
    const minDistance = 150;
    
    let attempts = 0;
    while (
      (Math.abs(newX - currentX) < minDistance ||
      Math.abs(newY - currentY) < minDistance) &&
      attempts < 50
    ) {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
      attempts++;
    }
    
    if (isFirstMove) {
      requestAnimationFrame(() => {
        setNoButtonPosition({ x: newX, y: newY });
      });
    } else {
      setNoButtonPosition({ x: newX, y: newY });
    }
    
    startReturnTimer();
  };

  const handleYesClick = async () => {
    if (!proposal) return;
    
    try {
      // Update response in database
      await fetch(`/api/proposals/${id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "yes" }),
      });
      
      setShowAcceptance(true);
    } catch (error) {
      console.error("Error updating response:", error);
      setShowAcceptance(true); // Show acceptance anyway
    }
  };

  const getButtonStyle = () => {
    if (noButtonPosition === null && !isReturning) {
      return {
        position: "relative" as const,
        left: "auto",
        top: "auto",
        transition: "all 0.3s ease-out",
        zIndex: 50,
      };
    }
    
    if (isReturning && originalPosition) {
      return {
        position: "fixed" as const,
        left: `${originalPosition.x}px`,
        top: `${originalPosition.y}px`,
        transition: "all 0.8s ease-in-out",
        zIndex: 50,
      };
    }
    
    if (noButtonPosition) {
      return {
        position: "fixed" as const,
        left: `${noButtonPosition.x}px`,
        top: `${noButtonPosition.y}px`,
        transition: "all 0.25s ease-out",
        zIndex: 50,
      };
    }
    
    return {
      position: "relative" as const,
      left: "auto",
      top: "auto",
      transition: "all 0.3s ease-out",
      zIndex: 50,
    };
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-2xl text-gray-600">Loading...</div>
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center space-y-4">
          <div className="text-6xl">😢</div>
          <h1 className="text-2xl font-bold text-gray-800">Link not found</h1>
          <p className="text-gray-600">This Valentine's proposal doesn't exist or has expired.</p>
        </div>
      </main>
    );
  }

  if (showAcceptance) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
        <div className="text-center space-y-6">
          <div className="text-8xl animate-bounce">🎉</div>
          <h1 className="text-5xl font-bold text-pink-600">Yay! 💕</h1>
          <p className="text-2xl text-gray-700">
            I knew you would say yes! Happy Valentine's Day! 💖
          </p>
          <div className="flex gap-4 justify-center text-4xl">
            <span className="animate-pulse">❤️</span>
            <span className="animate-pulse">💕</span>
            <span className="animate-pulse">💖</span>
            <span className="animate-pulse">💗</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative w-[450px] h-[450px]">
            <img 
              src="/puss.gif" 
              alt="Cute cat"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {proposal.crush_name}, will you be my valentine?
        </h1>

        <p className="text-base text-gray-600">
          From: <span className="font-bold text-pink-600">{proposal.sender_name}</span> 💕
        </p>

        <div className="relative h-24 flex items-center justify-center gap-6">
          <button
            onClick={handleYesClick}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-200 transform hover:scale-110 shadow-lg"
          >
            Yes
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            style={getButtonStyle()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-10 rounded-full text-lg shadow-lg"
          >
            No
          </button>
        </div>

        <p className="text-gray-500 text-xs italic">
          *No seems a bit shy
        </p>
      </div>
    </main>
  );
}
