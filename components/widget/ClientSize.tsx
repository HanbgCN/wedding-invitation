"use client";

export default function ClientSize() {
  return (
    <div>
      {window.innerWidth || document.documentElement.clientWidth}
      {window.innerHeight || document.documentElement.clientHeight}
    </div>
  );
}
