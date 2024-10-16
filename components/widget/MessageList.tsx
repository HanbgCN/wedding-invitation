"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function MessageList({
  data,
}: {
  data: { owner: string; message: string }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPositionRef = useRef(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollPositionRef.current = scrollHeight - clientHeight;
      scrollRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [data]);

  const animate = useCallback(() => {
    if (scrollRef.current && !isPaused) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollPositionRef.current -= 0.1;

      if (scrollPositionRef.current <= 0) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          scrollPositionRef.current = scrollHeight - clientHeight;
        }, 3000);
      }

      scrollRef.current.scrollTop = scrollPositionRef.current;
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  return (
    <div
      ref={scrollRef}
      className="max-w-full w-full px-3 max-h-[114px] overflow-y-auto"
    >
      {data.map(
        (message: { owner: string; message: string }, index: number) => (
          <div
            key={index}
            className="bg-red-500 bg-opacity-85 w-fit max-w-full mb-1 break-words text-white rounded-xl pl-2 pr-2 py-[2px] text-[14px]"
          >
            <span>{message.owner}</span>
            <span className="mx-1">: </span>
            <span>{message.message}</span>
          </div>
        )
      )}
    </div>
  );
}
