import React, { FC } from 'react'
import AnimatedTitle from '../animated-title/AnimatedTitle';
import Slider from "./image-slider/Slider"
import { TbBrandGithub } from "react-icons/tb";
import { TbCircleArrowLeftFilled } from "react-icons/tb";
import { ProjectMappingItem } from '../../types/ProjectMapping';

type ProjectInfoProps = {
    project: ProjectMappingItem;
    fadeBackground: boolean;
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isHovered: boolean;
    handleCloseProject: () => void;
};

const ProjectInfos: FC<ProjectInfoProps> = ({
    project,
    fadeBackground,
    setIsHovered,
    isHovered,
    handleCloseProject
}) => {
    return (
        <div className={`projectInfos ${fadeBackground ? 'fade-background' : ''}`}>
            <AnimatedTitle timeout={0} direction="up">
                <span className='projectTitle'>{project.title}</span>
            </AnimatedTitle>
            <div className='projectContent'>
                <AnimatedTitle timeout={200} direction="up">
                    <Slider images={project.slides} />
                </AnimatedTitle>
                <div className='projectDescription'>
                    <AnimatedTitle timeout={400} direction="up">
                        {project.description}
                    </AnimatedTitle>
                    <AnimatedTitle timeout={600} direction="up">
                        <div className='linksContainer'>
                            {project.element &&
                                (project.element as React.ReactElement<{ children?: React.ReactNode }>).props.children && (
                                    <div className='elementWrapper'>
                                        {project.element}
                                    </div>
                                )}
                            <div className='linksWrapper'>
                                <p>Source code :</p>
                                {project.links.map((link, index) => (
                                    <a
                                        key={index}
                                        className='link'
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <TbBrandGithub size={25} />
                                        {link.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </AnimatedTitle>
                </div>
            </div>
            <div
                className='bottomBack'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <TbCircleArrowLeftFilled
                    className="backArrow"
                    onClick={handleCloseProject}
                    // color='white' 
                    size={55}
                    style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', color: isHovered ? "#FFFFFF" : "#2BF7BC" }}
                />
                <span

                    onClick={handleCloseProject}
                >
                    Back
                </span>
            </div>
        </div>
    )
}

export default ProjectInfos