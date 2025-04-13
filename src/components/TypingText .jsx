import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 100, pause = 3000 }) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (index < text.length) {
      interval = setInterval(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
    } else {
      interval = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, pause);
    }

    return () => clearInterval(interval) || clearTimeout(interval);
  }, [index, text, speed, pause]);

  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl text-zinc-500 title-font max-w-full sm:max-w-xl truncate sm:line-clamp-1 text-center">
      {displayed}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypingText;
