"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminShell from "./components/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return; // ⬅️ skip auth check for login page

    const user = JSON.parse(sessionStorage.getItem("adminUser") || "{}");
    if (!user?.email) router.push("/admin/login");
    else setIsVerified(true);
  }, [router, isLoginPage]);

  if (isLoginPage) return <>{children}</>; // ⬅️ render login normally

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Checking credentials...
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
