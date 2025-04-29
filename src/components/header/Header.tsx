import React, { FunctionComponent, useRef } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import './header.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  scrollToSection: (selector: string) => void;
  handleCloseFromHeader: () => void;
}

const Header: FunctionComponent<Props> = ({ scrollToSection, handleCloseFromHeader }) => {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header ref={headerRef} className="header" id="main-header">
      <AnimatedTitle timeout={900} direction="down" initiallyVisible={true}>
        <nav>
          <button
            className="link header-color"
            onClick={() => {
              scrollToSection(".section3");
              handleCloseFromHeader();
            }}
          >
            Projects
          </button>
          <span className="separator"> / </span>
          <button className="link header-color" onClick={() => scrollToSection('.section2')}>Contact</button>
        </nav>
      </AnimatedTitle>
    </header>
  );
}

export default React.memo(Header);
