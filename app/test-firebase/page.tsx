"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

export default function TestFirebase() {
  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "test"));
        console.log("Firestore connected ✅ — found", snapshot.size, "docs");
      } catch (err) {
        console.error("Firebase error ❌", err);
      }
    })();
  }, []);

  return (
    <div className="p-6 text-center text-xl font-semibold text-purple-600">
      Check your console — Firebase connection test running!
    </div>
  );
}
