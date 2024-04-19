import { useLayoutEffect } from "react";

export function useImageObserver(elementRef, setElementWidth) {
  useLayoutEffect(() => {
    function handleResize() {
      if (elementRef.current) {
        const width = elementRef.current.offsetWidth;
        setElementWidth(width);
      }
    }

    handleResize(); // Initial call to set the dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, [elementRef, setElementWidth]);
}
