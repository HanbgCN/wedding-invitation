"use client";

import { useEffect, useRef, useState } from "react";
import Fireworks from "fireworks-js";
import * as _ from "lodash";

export default function BigFireworksWidget() {
  const fireworksRef = useRef<Fireworks | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (containerRef.current) return;
    containerRef.current = document.querySelector("#bigFireworksContainer");
    fireworksRef.current = new Fireworks(containerRef.current!, {
      hue: {
        min: 0,
        max: 345,
      },
      delay: {
        min: 10,
        max: 12,
      },
      decay: {
        min: 0.025,
        max: 0.03,
      },
      rocketsPoint: {
        min: 50,
        max: 100,
      },
      lineWidth: {
        explosion: {
          min: 2,
          max: 3,
        },
      },
      acceleration: 3,
      friction: 0.96,
      gravity: 2.5,
      particles: 120,
      explosion: 8,
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
          max: 20,
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
      }, 500);
    },
    50,
    { leading: true, trailing: true }
  );

  return (
    <>
      <div
        id="bigFireworksContainer"
        className="fixed z-[9999999] pointer-events-none h-[100vh] w-full max-h-[932px] left-0 top-0"
      />
      <button
        className={`bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 to-pink-500 text-white font-bold py-2 px-4 rounded transition-transform duration-80 ${
          isPressed ? "transform scale-90" : ""
        }`}
        onClick={handleFireworks}
      >
        手动加特林
      </button>
    </>
  );
}
