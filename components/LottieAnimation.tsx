// components/SuccessAnimation.tsx
import React from "react";
import "../app/[locale]/globals.css";

const SuccessAnimation: React.FC = () => {
  const originalSize = 400;
  const newSize = 100;
  const scaleFactor = newSize / originalSize;

  // Original center
  const originalCenterX = 200;
  const originalCenterY = 200;

  // New center in the scaled view
  const newCenterX = newSize / 2;
  const newCenterY = newSize / 2;

  // Offset needed to shift coordinates
  const offsetX = newCenterX - originalCenterX * scaleFactor;
  const offsetY = newCenterY - originalCenterY * scaleFactor;

  // Function to scale and offset a coordinate
  const scaleAndOffset = (value: number, offset: number) =>
    value * scaleFactor + offset;

  // Function to scale and offset a points string
  const scaleAndOffsetPoints = (points: string) => {
    return points
      .split(" ")
      .map((pair) => {
        const [x, y] = pair.split(",").map(Number);
        return `${scaleAndOffset(x, offsetX)},${scaleAndOffset(y, offsetY)}`;
      })
      .join(" ");
  };

  return (
    <div
      className="content flex items-center justify-center" // Apply centering classes here
      style={{ width: newSize, height: newSize }}
    >
      <svg
        width={newSize}
        height={newSize}
        viewBox={`0 0 ${newSize} ${newSize}`} // Adjust viewBox to the new size
      >
        <circle
          fill="none"
          stroke="#68E534"
          strokeWidth={20 * scaleFactor} // Scale strokeWidth directly
          cx={scaleAndOffset(200, offsetX)} // Scale and offset cx
          cy={scaleAndOffset(200, offsetY)} // Scale and offset cy
          r={190 * scaleFactor} // Scale r directly
          strokeLinecap="round"
          // Adjust transform rotation center as well
          transform={`rotate(-90 ${newCenterX} ${newCenterY})`}
          className="circle"
        />
        <polyline
          fill="none"
          stroke="#68E534"
          points={scaleAndOffsetPoints("88,214 173,284 304,138")} // Scale and offset points
          strokeWidth={24 * scaleFactor} // Scale strokeWidth directly
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick"
        />
      </svg>
    </div>
  );
};

export default SuccessAnimation;
