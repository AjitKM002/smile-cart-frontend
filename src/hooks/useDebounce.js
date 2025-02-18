import { useEffect, useState } from "react";

const useDebounce = value => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), 350);

    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
};

export default useDebounce;
