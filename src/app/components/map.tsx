"use client";

import { useState, useEffect } from "react";

const FallingMushisApp = () => {
  const [mushis, setMushis] = useState<
    { id: number; left: number; top: number }[]
  >([]);

  useEffect(() => {
    const generateMushi = () => {
      const newMushi = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        top: -50,
      };
      setMushis((prev) => [...prev, newMushi]);
    };

    const fallMushis = () => {
      setMushis((prev) =>
        prev
          .map((mushi) => ({ ...mushi, top: mushi.top + 10 }))
          .filter((mushi) => mushi.top < window.innerHeight)
      );
    };

    const mushroomInterval = setInterval(generateMushi, 100);
    const fallInterval = setInterval(fallMushis, 50);

    return () => {
      clearInterval(mushroomInterval);
      clearInterval(fallInterval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
        {mushis.map((mushi) => (
          <div
            key={mushi.id}
            className="absolute text-6xl opacity-70 drop-shadow-lg"
            style={{
              left: `${mushi.left}px`,
              top: `${mushi.top}px`,
              transition: "top 0.05s linear",
            }}
          >
            🍄‍🟫
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white text-4xl text-center font-bold">
          MUSHIS DID IT
        </h1>
        <div className="flex justify-center items-center h-full space-x-4 relative z-10">
          <img
            src="/juan.png"
            alt="Juan"
            className="max-w-[80%] max-h-[100%] object-contain"
          />
          <img
            src="/flo.png"
            alt="Flo"
            className="max-w-[80%] max-h-[100%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FallingMushisApp;
