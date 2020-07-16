import { useEffect, useState } from "react";
export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function listener() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  return {
    width,
    height,
  };
}
