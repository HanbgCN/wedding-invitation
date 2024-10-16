"use client";

import { useEffect, useRef, useState } from "react";
import Fireworks from "fireworks-js";
import * as _ from "lodash";

export default function FireworksWidget() {
  const fireworksRef = useRef<Fireworks | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
        min: 0.02,
        max: 0.025,
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

  const handleFireworks = _.throttle(
    () => {
      if (isAnimating) return;

      setIsPressed(true);
      setIsAnimating(true);

      setTimeout(() => {
        setIsPressed(false);
        setIsAnimating(false);
      }, 70);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      fireworksRef.current!.start();
      timerRef.current = setTimeout(async () => {
        fireworksRef.current!.waitStop();
      }, 5000);
    },
    10000,
    { leading: true, trailing: false }
  );

  return (
    <>
      <div
        id="fireworksContainer"
        className="fixed z-[9999999] pointer-events-none h-[100vh] w-full max-h-[932px] left-0 top-0"
      />
      <button
        onClick={handleFireworks}
        className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded transition-transform duration-80 ${
          isPressed ? "transform scale-90" : ""
        }`}
      >
        送上烟花
      </button>
    </>
  );
}
