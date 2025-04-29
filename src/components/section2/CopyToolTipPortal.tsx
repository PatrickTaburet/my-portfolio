import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type CopyToolTipPortalProps = {
    isCopied: boolean;
};

const CopyToolTipPortal: FC<CopyToolTipPortalProps> = ({ isCopied }) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (tooltipRef.current) {
                // position relative to the viewport
                tooltipRef.current.style.left = `${e.clientX + 10}px`;
                tooltipRef.current.style.top = `${e.clientY + 10}px`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const tooltipElement = (
        <span
            ref={tooltipRef}
            className="copyMessage"
            style={{
                position: 'fixed',
            }}
        >
            {isCopied ? 'Copied !' : 'Copy ?'}
        </span>
    );

    return createPortal(tooltipElement, document.body);
};

export default CopyToolTipPortal;
