"use client";

import Page0 from "@/components/Pages/Page0";
import Page1 from "@/components/Pages/Page1";
import { useEffect, useState } from "react";

export default function ContentPage() {
  const pages = [<Page0 />, <Page1 />];
  const [activeLayout, setActiveLayout] = useState(0);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;

      // 阻止默认行为，包括下拉刷新
      e.preventDefault();

      // 如果向上滑动超过阈值，切换到下一页
      if (touchDiff > 50) {
        setActiveLayout(1);
      }
      // 如果向下滑动超过阈值，切换到上一页
      else if (touchDiff < -50) {
        setActiveLayout(0);
      }
    };

    // 添加 touchstart 和 touchmove 事件监听器
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 清理函数
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      {pages.map((_, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeLayout === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {pages[index]}
        </div>
      ))}
    </>
  );
}
