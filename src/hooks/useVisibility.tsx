import { useState, useEffect, useRef, RefObject } from 'react';

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
function useVisibility<T extends Element = Element>(): [RefObject<T | null>, boolean] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return [elementRef, isVisible];
}
export default useVisibility;