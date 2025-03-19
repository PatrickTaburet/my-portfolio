import React, { FC, useEffect, useRef, useState } from 'react';
import { CircleDataType } from '../../types/CircleData';

/**
 * Display text with dynamic colors based on the position of characters relative to a circle.
 *
 * @returns {JSX.Element} A JSX element containing the text with dynamic colors
 */
type Props = {
  text: string;
  circleData: CircleDataType;
  sectionRef: React.RefObject<HTMLElement | null>;
}

const DynamicColorText: FC<Props> = ({ text, circleData, sectionRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [charPositions, setCharPositions] = useState<{ x: number; y: number }[]>([]);

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
    <div ref={containerRef} className='bioLetters'>
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
              color: isInside ? '#2BF7BC' : '#e0f2f8',
              fontWeight: 300, // Utilisez 300 ici
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
