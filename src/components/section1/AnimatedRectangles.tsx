import React, { FC } from 'react'
type AnimatedRectanglesProps = {
    rectHeight: number[];
    containerRef: React.RefObject<HTMLDivElement | null>;
    isBottom?: boolean;
}

const AnimatedRectangles: FC<AnimatedRectanglesProps> = ({ rectHeight, containerRef, isBottom = false }) => {
    return (
        <div
            className={`rect-container ${isBottom ? "bottom-right" : "top-left"}`}
            ref={containerRef}
        >
            {rectHeight.map((_, i) => <div className="rect" key={`${isBottom ? 't' : 'b'}${i}`} />)}
        </div>
    )
}

export default AnimatedRectangles