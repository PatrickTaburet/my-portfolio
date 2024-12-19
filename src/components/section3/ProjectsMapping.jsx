import React from 'react'
import NexusLab1 from './../../assets/images/nexusLab/NexusLab-full-purple.jpg';
import NexusLab2 from './../../assets/images/nexusLab/gallery-desktop.jpg';
import NexusLab3 from './../../assets/images/nexusLab/generative-desktop.jpg';
import NexusLab4 from './../../assets/images/nexusLab/dataart.jpg';
import CreativeCoding1 from './../../assets/images/creativeCoding/artwork.png';
import { TbFileTypePdf } from "react-icons/tb";

const ProjectsMapping = {
    NexusLab: {
      title: "NexusLab",
      description: (
        <>
          <p>NexusLab is a collaborative platform focused on the fusion of art and technology. It enables users to manipulate, create, and share digital artworks generated through creative coding algorithms.</p>
          <p>By integrating artistic practices that blend programming with visual art, NexusLab aims to make these forms of expression more accessible and to build a community around these disciplines, fostering co-creation and knowledge sharing.</p>
          <p>The project, available on both web and mobile platforms, leverages modern technologies such as React, Symfony, and React Native. Its structure and technical choices ensure a seamless and secure user experience across all devices.</p>
          <p>It was developed as part of my Application Designer and Developer program (Concepteur Développeur d'Applications) and was presented as my final project during the certification exam.</p>
        </>
      ),
      images: [
        {
            id: 1,
            image: NexusLab1,
            title: "image 1",
            text: "loremipsuuum"
        },
        {
            id: 2,
            image: NexusLab2,
            title: "image 2",
            text: "loremipsuufregrereggeegrgeum"
        },
        {
            id: 3,
            image: NexusLab3,
            title: "image 3",
            text: "loremisdsdsdpsuuum"
        },
        {
            id: 4,
            image: NexusLab4,
            title: "image 4",
            text: "loremisdsdsdpsuuum"
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
            <TbFileTypePdf size={27}/>
            Specifications Document (FR)
          </a>
          <a 
            className='link'
            href="/documents/DOSSIER_PROJET_NEXUS_LAB-Taburet_Patrick.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TbFileTypePdf size={27}/>
            NexusLab - CDA Final Project File (FR)
          </a>
        </>
      )
    },
    Creative_Coding: {
      title: "Creative Coding",
      description: (
        <>
          <p>Creative coding is a practice that combines art and technology to create interactive and animated experiences. It encompasses various creative processes, such as data art and generative art, both of which I focus on in my work. By using algorithms and data, these approaches enable the creation of unique and visually compelling pieces that blend creativity with logic.</p>
          <p>My work primarily involves Processing and p5.js, tools that allow me to develop visually engaging and dynamic content. I'm currently expanding into WebGL and Three.js to explore 3D environments and the power of shaders.</p>
          <p>Creative coding offers a unique way to bring animation and interactivity into web applications, enhancing the user experience with intuitive and visually appealing designs. It's an approach that transforms static interfaces into more engaging and immersive experiences, blending aesthetics with functionality.</p>
        </>
      ),
      images: [
        {
            id: 1,
            image: CreativeCoding1,
            title: "image 1",
            text: "loremipsuuum"
        },
      ],
      links:  [
        {
          title: "p5.js explorations",
          url: "https://github.com/PatrickTaburet/P5JS-explorations",
        },
        {
          title: "Vanilla JavaScript generative art",
          url: "https://github.com/PatrickTaburet/Generative_Art",
        },
        {
          title: "Data art visualization",
          url: "https://github.com/PatrickTaburet/data-art-population",
        },

      ],
      element: (
        <>
        
        </>
      )
    }
  };

export default ProjectsMapping