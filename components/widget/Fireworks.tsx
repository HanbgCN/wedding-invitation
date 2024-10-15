"use client";

import { useEffect, useRef } from "react";
import Fireworks from "fireworks-js";

export default function FireworksWidget() {
  const fireworksRef = useRef<Fireworks | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) return;
    containerRef.current = document.querySelector("#fireworksContainer");
    fireworksRef.current = new Fireworks(containerRef.current!, {
      hue: {
        min: 0,
        max: 345,
      },
      delay: {
        min: 20,
        max: 25,
      },
      decay: {
        min: 0.015,
        max: 0.02,
      },
      rocketsPoint: {
        min: 50,
        max: 50,
      },
      lineWidth: {
        explosion: {
          min: 2,
          max: 3,
        },
      },
      acceleration: 1.02,
      friction: 0.96,
      gravity: 1,
      particles: 80,
      explosion: 6,
      opacity: 0.5,
      autoresize: true,
      brightness: {
        min: 75,
        max: 95,
      },
      boundaries: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        debug: false,
      },
      sound: {
        enabled: true,
        files: [
          "/resources/explosion0.mp3",
          "/resources/explosion1.mp3",
          "/resources/explosion2.mp3",
        ],
        volume: {
          min: 15,
          max: 40,
        },
      },
      mouse: {
        click: true,
        move: false,
        max: 1,
      },
    });
  }, []);

  const handleFireworks = async () => {
    fireworksRef.current!.start();
    setTimeout(async () => {
      fireworksRef.current!.stop();
    }, 10000);
  };

  return (
    <>
      <div
        id="fireworksContainer"
        className="fixed z-[9999999] pointer-events-none h-[100vh] w-full max-h-[932px] left-0 top-0"
      />
      <button
        onClick={handleFireworks}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        送出烟花
      </button>
    </>
  );
}
