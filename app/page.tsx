"use client";

import DynamicBgLayout from "@/components/Layout/DynamicBgLayout";
import FireworksWidget from "@/components/widget/Fireworks";
import MusicPlayer from "@/components/widget/MusicPlayer";
import WishForm from "@/components/widget/WishForm";
import Image from "next/image";
import { useEffect, useState } from "react";

const pages = [
  function Page1() {
    return (
      <DynamicBgLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden p-6 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              我们结婚啦
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/picture/1.png"
                alt="Wedding photo"
                width={1200}
                height={800}
                layout="responsive"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-center mt-6 text-gray-600 italic">
              &quot;爱共赴山河，共赴星辰大海&quot;
            </p>
          </div>
        </div>
      </DynamicBgLayout>
    );
  },
  function Page2() {
    return (
      <DynamicBgLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden p-6 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              我们结婚啦
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/picture/big-1.jpg"
                alt="Wedding photo"
                width={1200}
                height={800}
                layout="responsive"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-center mt-6 text-gray-600 italic">
              &quot;爱共赴山河，共赴星辰大海&quot;
            </p>
          </div>
        </div>
      </DynamicBgLayout>
    );
  },
  function Page3() {
    return (
      <DynamicBgLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden p-6 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              我们结婚啦
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/picture/big-1.jpg"
                alt="Wedding photo"
                width={1200}
                height={800}
                layout="responsive"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-center mt-6 text-gray-600 italic">
              &quot;爱共赴山河，共赴星辰大海&quot;
            </p>
          </div>
        </div>
      </DynamicBgLayout>
    );
  },
];

export default function Home() {
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
      <div className="h-screen relative overflow-auto">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeLayout === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {pages[index]()}
          </div>
        ))}

        <MusicPlayer className="absolute top-3 right-3 z-[99]" />
        <div className="absolute bottom-0 left-0 w-full z-[99999]">
          <div className="flex justify-between items-center px-4 py-2">
            <WishForm
              onSubmit={(name, message) => {
                console.log("收到祝福:", { name, message });
                alert("感谢您的祝福！");
              }}
            />

            <FireworksWidget />

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              送嘉年华
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <a
            href="tel:17354001840"
            className="text-blue-600 hover:underline mt-12"
          >
            韩金泽
          </a> */
}
