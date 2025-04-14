import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 100, pause = 3000 }) => {
  const [displayed, setDisplayed] = useState("");
  const [statText, setStatText] = useState("Prompt Everything!");
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
    <h1 className="text-md sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-orange-300 main-font max-w-full sm:max-w-xl truncate sm:line-clamp-1 text-center p-5 pb-5 lg:pb-7 sm:pb-6 md:pb-6">
      {statText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypingText;
