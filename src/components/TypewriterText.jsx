import React, { useEffect, useState } from "react";

const TypewriterText = ({ text, speed = 100 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <h1 className="text-4xl font-extrabold mb-4">
      {text.slice(0, index)}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypewriterText;
