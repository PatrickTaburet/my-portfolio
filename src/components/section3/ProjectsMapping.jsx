import React from 'react'
import NexusLab1 from './../../assets/images/nexusLab/NexusLab-full-purple.webp';
import NexusLab2 from './../../assets/images/nexusLab/gallery-desktop.webp';
import NexusLab3 from './../../assets/images/nexusLab/generative-desktop.webp';
import NexusLab4 from './../../assets/images/nexusLab/dataart.webp';
import NexusLab5 from './../../assets/images/nexusLab/homepage.webp';
import NexusLabMobile1 from './../../assets/images/nexusLab/tryptique-nexuslab-homepage.webp';
import NexusLabMobile2 from './../../assets/images/nexusLab/tryptique-nexuslab-gallery.webp';
import CreativeCoding2 from './../../assets/images/creativeCoding/linewalker.webp';
import CreativeCoding3 from './../../assets/images/creativeCoding/mousedraw.webp';
import CreativeCoding4 from './../../assets/images/creativeCoding/flowfield2.webp';
import CreativeCoding5 from './../../assets/images/creativeCoding/artwork2.webp';
import CreativeCoding6 from './../../assets/images/creativeCoding/artwork4.webp';
import CreativeCoding7 from './../../assets/images/creativeCoding/artwork3.webp';
import CreativeCoding1 from './../../assets/images/creativeCoding/lifeSimulator.webp';
import LiveSimulator1 from './../../assets/images/lifeSimulator/artwork1.webp';
import LiveSimulator2 from './../../assets/images/lifeSimulator/tuto.webp';
import LiveSimulator3 from './../../assets/images/lifeSimulator/myArtwork6.webp';
import LiveSimulator4 from './../../assets/images/lifeSimulator/myArtwork7.webp';
import LiveSimulator5 from './../../assets/images/lifeSimulator/artwork4.webp';
import LiveSimulator6 from './../../assets/images/lifeSimulator/artwork6.webp';
import LiveSimulator7 from './../../assets/images/lifeSimulator/myArtwork5.webp';
import LiveSimulator8 from './../../assets/images/lifeSimulator/mobile.webp';
import LiveSimulator9 from './../../assets/images/lifeSimulator/mobile2.webp';

import { TbFileTypePdf } from "react-icons/tb";
import { TbWorld } from "react-icons/tb";

const ProjectsMapping = {
    NexusLab: {
      title: "NexusLab",
      description: (
        <>
          <p>NexusLab is a collaborative platform focused on the fusion of art and technology. It enables users to manipulate, create, and share digital artworks generated through creative coding algorithms.</p>
          <p>By integrating artistic practices that blend programming with visual art, NexusLab aims to make these forms of expression more accessible and to build a community around these disciplines, fostering co-creation and knowledge sharing.</p>
          <p>The project, available in web and mobile versions, leverages modern technologies such as React, Symfony, and React Native. Its structure and technical choices ensure a seamless and secure user experience across all devices.</p>
          <p>It was developed as part of my Application Designer and Developer program (Concepteur Développeur d'Applications) and was presented as my final project during the certification exam.</p>
        </>
      ),
      slides: [
        {
            id: 1,
            type: 'image',
            source: NexusLab1,
            title: "NexusLab logo",
        },
        {
            id: 2,
            type: 'image',
            source: NexusLab5,
            title: "NexusLab screenshot 2",
        },
        {
            id: 3,
            type: 'image',
            source: NexusLab2,
            title: "NexusLab screenshot 3",
        },
        {
            id: 4,
            type: 'image',
            source: NexusLab3,
            title: "NexusLab screenshot 4",
        },
        {
            id: 5,
            type: 'image',
            source: NexusLab4,
            title: "NexusLab screenshot 5",
        },
        {
            id: 6,
            type: 'image',
            source: NexusLabMobile1,
            title: "NexusLab screenshot 6",
        },
        {
            id: 7,
            type: 'image',
            source: NexusLabMobile2,
            title: "NexusLab screenshot 6",
        },
        {
            id: 8,
            type: 'video',
            source: "https://www.youtube.com/watch?v=WDfY6dC5Wak",
            title: "NexusLab desktop demo video",

        },
        {
            id: 9,
            type: 'video',
            source: "https://youtube.com/shorts/kL-P-wCw1_s?feature=share",
            title: "video NexusLab mobile app",
            text: "NexusLab mobile demo video"
        },
      ],
      links: [
        {
          title: "GitHub Repository",
          url: "https://github.com/PatrickTaburet/nexus-lab-project",
        },
      ],
      element: (
        <>
          <p>Click below to view the project documentation :</p>
          <a 
            className='link'
            href="/documents/Cahier des charges - projet NexusLab.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TbFileTypePdf size={25}/>
            Specifications Document (FR)
          </a>
          <a 
            className='link'
            href="/documents/DOSSIER_PROJET_NEXUS_LAB-Taburet_Patrick.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TbFileTypePdf size={25}/>
            NexusLab - CDA Final Project File (FR)
          </a>
        </>
      )
    },
    Creative_Coding: {
      title: "Creative Coding",
      description: (
        <>
          <p>Creative coding is a practice that combines art and programming to create interactive and animated experiences. It encompasses various creative processes, such as data art and generative art, both of which I focus on in my work. By using algorithms and data, these approaches allow the creation of unique and visually original pieces by combining creativity and logic.</p>
          <p>My work primarily involves Processing and p5.js, tools that allow me to develop visual and dynamic content. I'm currently expanding into WebGL and Three.js to explore 3D environments and the power of shaders.</p>
          <p>Creative coding offers a unique way to bring animation and interactivity into web applications, enhancing the user experience with intuitive and visually appealing designs. It's an approach that transforms static interfaces into more engaging and immersive experiences, blending aesthetics with functionality.</p>
        </>
      ),
      slides: [
        {
            id: 1,
            type: 'image',
            source: CreativeCoding4,
            title: "image 1",
        },
        {
            id: 2,
            type: 'image',
            source: CreativeCoding2,
            title: "image 2",
        },
        {
            id: 3,
            type: 'image',
            source: CreativeCoding3,
            title: "image 3",
        },
        {
            id: 4,
            type: 'image',
            source: CreativeCoding1,
            title: "image 4",
        },
        {
            id: 5,
            type: 'image',
            source: CreativeCoding5,
            title: "image 5",
        },
        {
            id: 6,
            type: 'image',
            source: CreativeCoding6,
            title: "image 6",
        },
        {
            id: 7,
            type: 'image',
            source: CreativeCoding7,
            title: "image 7",
        },

      ],
      links:  [
        {
          title: "p5.js explorations",
          url: "https://github.com/PatrickTaburet/P5JS-explorations",
        },
        {
          title: "Data art visualization",
          url: "https://github.com/PatrickTaburet/data-art-population",
        },
        {
          title: "Vanilla JavaScript generative art",
          url: "https://github.com/PatrickTaburet/Generative_Art",
        },

      ],
      element: (
        <>
        
        </>
      )
    },
    Life_Simulator: {
      title: "Life Simulator",
      description: (
        <>
          <p>This project is an interactive particle-based simulation inspired by molecular interactions in nature, simulating how particles attract, repel, and self-organize into evolving patterns. By adjusting interaction rules, users can observe emergent behaviors similar to those found in physics, chemistry, and biology.</p>
          <p>This application is built using p5.js to render visuals on an HTML5 canvas, with dat.GUI as a library for managing the user interface. The app is structured in a modular architecture with ES6 modules to promote clean code organization, scalability, and maintainability.</p>        
          <p>Customizable particle interactions and creative modes such as Drawing Mode and Nexus Mode enhance visual complexity. The Drawing Mode leaves persistent trails for artistic effects, while Nexus Mode connects particles dynamically, creating intricate web-like structures.</p>
          <p>Users can explore these behaviors in real-time and save their unique creations as images, blending science and art into an engaging interactive experience.</p>
        </>
      ),
      slides: [
        {
            id: 1,
            type: 'image',
            source: LiveSimulator1,
            title: "image 1",
        },
        {
            id: 2,
            type: 'image',
            source: LiveSimulator2,
            title: "image 2",
        },
        {
            id: 3,
            type: 'image',
            source: LiveSimulator3,
            title: "image 3",
        },
        {
            id: 4,
            type: 'image',
            source: LiveSimulator4,
            title: "image 4",
        },
        {
            id: 5,
            type: 'image',
            source: LiveSimulator5,
            title: "image 5",
        },
        {
            id: 6,
            type: 'image',
            source: LiveSimulator6,
            title: "image 6",
        },
        {
            id: 7,
            type: 'image',
            source: LiveSimulator7,
            title: "image 7",
        },
        {
            id: 8,
            type: 'image',
            source: LiveSimulator8,
            title: "image 8",
        },
        {
            id: 9,
            type: 'image',
            source: LiveSimulator9,
            title: "image 9",
        },

      ],
      links:  [
        {
          title: "Source code",
          url: "https://github.com/PatrickTaburet/Life_Generator",
        },
      ],
      element: (
        <>
        <p className='linksWrapper'>Website :</p>
          <a 
            href="https://life-simulator.com" 
            target="_blank" 
            className='linkWebSite' 
            rel="noopener noreferrer"
          >
            <TbWorld size={25} style={{marginRight: '10px'}}/>
            life-simulator.com
          </a>
        </>
      )
    }
  };

export default ProjectsMapping