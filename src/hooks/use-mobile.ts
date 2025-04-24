
import { useEffect, useState } from "react";

// Consistent mobile breakpoint
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with current window width if available (client-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    // Default to false for server-side rendering
    return false;
  });

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set up event listener for resize
    window.addEventListener("resize", checkSize);
    
    // Initial check
    checkSize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return isMobile;
}
