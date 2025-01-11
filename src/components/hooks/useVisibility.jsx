import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect the visibility of an element in the viewport.
 *
 * This hook uses the IntersectionObserver API to detect when the element is visible in the viewport.
 * It returns a reference to the element to observe and a boolean indicating whether the element is visible.
 *
 * @returns {Array} An array containing:
 *   - `elementRef`: A reference to the element to observe.
 *   - `isVisible`: A boolean indicating whether the element is visible in the viewport.
 */
function useVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return [elementRef, isVisible];
}
export default useVisibility;