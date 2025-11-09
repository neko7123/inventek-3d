"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function NotifyMeButton() {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return toast.error("Please enter your email");
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) return toast.error("Enter a valid email address");

    try {
      setLoading(true);

      // 🔍 Check for duplicate email
      const q = query(collection(db, "job-newsletter"), where("email", "==", trimmedEmail));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast("You're already subscribed! 🎉");
        setShowInput(false);
        setEmail("");
        return;
      }

      // 📨 Add new email
      await addDoc(collection(db, "job-newsletter"), {
        email: trimmedEmail,
        createdAt: Timestamp.now(),
      });

      toast.success("You're on the list! 🚀");
      setEmail("");
      setShowInput(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Notify Me
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 mt-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-72 text-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
