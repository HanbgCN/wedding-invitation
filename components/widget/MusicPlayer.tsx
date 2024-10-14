"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

const MusicPlayer: React.FC<{ className?: string }> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`music-player ${className}`}>
      <button
        onClick={togglePlay}
        className="transition-transform active:scale-95"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <div className="animate-heartbeat">
            <Image src="/love-song.png" alt="Play" width={32} height={32} />
          </div>
        ) : (
          <Image
            src="/music-not-allowed.png"
            alt="Pause"
            width={32}
            height={32}
          />
        )}
      </button>
      <audio ref={audioRef} src="/BeMyForever.mp3" />
    </div>
  );
};

export default MusicPlayer;
