import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface FireworkProps {
  id: number;
  x: number;
  y: number;
  targetY: number;
  status: "rising" | "exploding";
  speed: number;
  particles: number;
  spread: number;
  colors: string[];
}

const Firework: React.FC<FireworkProps> = ({
  id,
  x,
  y,
  targetY,
  status,
  speed,
  particles,
  spread,
  colors,
}) => {
  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number; color: string }[]
  >([]);

  useEffect(() => {
    if (status === "exploding") {
      const newParticles = Array.from({ length: particles }, () => ({
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticlePositions(newParticles);
    }
  }, [status, particles, spread, colors]);

  if (status === "rising") {
    return (
      <div
        className="firework-rocket"
        style={{
          position: "fixed",
          left: `${x}px`,
          bottom: `${y}px`,
          width: "4px",
          height: "20px",
          backgroundColor: "orange",
          transition: `all ${1.5 / speed}s ease-out`,
        }}
      />
    );
  }

  return (
    <>
      {particlePositions.map((particle, index) => (
        <div
          key={`${id}-${index}`}
          className="firework-particle"
          style={{
            position: "fixed",
            left: `${x + particle.x}px`,
            top: `${targetY + particle.y}px`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: particle.color,
            transition: "all 1s ease-out",
            opacity: 0,
          }}
        />
      ))}
    </>
  );
};

export interface FireworksRef {
  launch: (config: Omit<FireworkProps, "id" | "status">) => void;
}

interface LaunchConfig {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  particles: number;
  spread: number;
  colors: string[];
}

const Fireworks = forwardRef<FireworksRef, {}>((props, ref) => {
  const [fireworks, setFireworks] = useState<FireworkProps[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const launch = (config: LaunchConfig) => {
    const id = idCounter;
    setIdCounter((prev) => prev + 1);
    const { x, y, targetY, speed, particles, spread, colors } = config;
    setFireworks((prev) => [
      ...prev,
      { id, x, y, targetY, status: "rising", speed, particles, spread, colors },
    ]);

    // setTimeout(() => {
    //   setFireworks((prev) =>
    //     prev.map((fw) =>
    //       fw.id === id ? { ...fw, y: targetY, status: "exploding" } : fw
    //     )
    //   );
    // }, 1500 / speed);

    // setTimeout(() => {
    //   setFireworks((prev) => prev.filter((fw) => fw.id !== id));
    // }, 2500 / speed);
  };

  useImperativeHandle(ref, () => ({
    launch,
  }));

  return (
    <div
      className="fireworks-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {fireworks.map((fw) => (
        <Firework key={fw.id} {...fw} />
      ))}
    </div>
  );
});

Fireworks.displayName = "Fireworks";

export default Fireworks;
