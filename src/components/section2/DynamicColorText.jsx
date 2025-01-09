import React, { useEffect, useRef, useState } from 'react';

/**
 * Display text with dynamic colors based on the position of characters relative to a circle.
 *
 * @param {string} props.text - The text to display
 * @param {Object} props.circleData - The circle data (x, y, size)
 * @param {Object} props.sectionRef - The reference to the section containing the text
 *
 * @returns {JSX.Element} A JSX element containing the text with dynamic colors
 */
const DynamicColorText = ({ text, circleData, sectionRef }) => {
  const containerRef = useRef(null);
  const [charPositions, setCharPositions] = useState([]);

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const spans = containerRef.current.querySelectorAll('span');
        const positions = Array.from(spans).map((span) => {
          const rect = span.getBoundingClientRect();
          return {
            x: rect.left - sectionRect.left + rect.width / 2,
            y: rect.top - sectionRect.top + rect.height / 2,
          };
        });
        setCharPositions(positions);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [text, circleData, sectionRef]);

  return (
    <div ref={containerRef} style={{lineHeight: '1.3em', whiteSpace: 'pre-wrap' }}>
      {text.split('').map((char, index) => {
        const charPosition = charPositions[index];
        let isInside = false;

        if (charPosition) {
          const distance = Math.sqrt(
            Math.pow(charPosition.x - circleData.x, 2) +
              Math.pow(charPosition.y - circleData.y, 2)
          );
          isInside = distance < circleData.size / 2;
        }

        return (
          <span
            key={index}
            style={{
              color: isInside ? '#e0f2f8' : 'black',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default DynamicColorText;
