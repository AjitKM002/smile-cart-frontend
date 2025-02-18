import { useState, useEffect, useRef, useCallback } from "react";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

export const Carousel = ({ image, title }) => {
  const timeRef = useRef(null);
  const [currIndex, setCurrIndex] = useState(0);

  const resetTimer = useCallback(() => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(handleNext, 3000);
  }, []);

  const handleNext = useCallback(() => {
    setCurrIndex(prevIndex => (prevIndex + 1) % image.length);
  }, []);

  const handlePrev = () => {
    setCurrIndex(prevIndex => (prevIndex - 1 + image.length) % image.length);
    resetTimer();
  };

  useEffect(() => {
    timeRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timeRef.current);
  }, [handleNext]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrev}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={image[currIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="flex space-x-1">
        {image.map((_, index) => {
          const defaultClasses =
            "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border";

          const dotClassNames =
            index === currIndex
              ? defaultClasses.concat(" neeto-ui-bg-black")
              : defaultClasses;

          return (
            <span
              className={dotClassNames}
              key={index}
              onClick={() => {
                setCurrIndex(index);
                resetTimer();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
