"use client";

import { useEffect } from "react";

export default function DynamicBgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] w-full max-h-[932px] overflow-auto bg-gradient-to-br from-red-50 via-red-100 to-amber-100 animate-gradient">
      {children}
    </div>
  );
}
