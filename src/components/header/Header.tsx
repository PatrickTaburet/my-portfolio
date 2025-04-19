import React, { FunctionComponent } from 'react';
import AnimatedTitle from '../animated-title/AnimatedTitle';
import './header.css';
import { useMobile } from '../../context/MobileContext';
import { SectionOffsets } from '../../types/sectionOffsets';

type Props = {
  scrollY: number;
  windowHeight: number;
  isProjectInfoVisible: boolean;
  sectionOffsets: SectionOffsets;
  scrollToSection: (selector: string) => void;
  handleCloseFromHeader: () => void;
}

const Header: FunctionComponent<Props> = ({ scrollY, windowHeight, isProjectInfoVisible, sectionOffsets, scrollToSection, handleCloseFromHeader }) => {
  const isMobile = useMobile();

  const headerColor = isMobile
    ? ''
    : (scrollY > windowHeight && scrollY <= window.innerHeight * 1.6 ? "#2BF7BC" : '');

  return (
    <header
      className="header"
      style={{
        color: headerColor
      }}
    >
      <AnimatedTitle timeout={900} direction="down" initiallyVisible={true}>
        <nav>
          <button
            className={`link ${isMobile
              ? 'modeA' // Forcer modeA en mode mobile
              : (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6
                ? 'modeC'
                : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6)
                  || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6)
                  ? 'modeB' : 'modeA'))
              }`}
            onClick={() => {
              scrollToSection(".section3");
              handleCloseFromHeader();
            }}
          >
            Projects
          </button>
          /
          <button
            className={`link ${isMobile
              ? 'modeA'
              : (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6
                ? 'modeC'
                : ((scrollY > windowHeight && scrollY <= window.innerHeight * 1.6)
                  || (isProjectInfoVisible && scrollY >= window.innerHeight * 1.6)
                  ? 'modeB' : 'modeA'))
              }`}
            onClick={() => scrollToSection(".section2")}
          >
            Contact
          </button>
        </nav>
      </AnimatedTitle>
    </header>
  );
}

export default Header;
