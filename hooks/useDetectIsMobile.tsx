import { useEffect, useState } from "react";
const mobileAppBreakPointInPx = 415;

export const useDetectIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const listener = () => {
      setIsMobile(window.innerWidth < mobileAppBreakPointInPx);
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  return isMobile;
};
