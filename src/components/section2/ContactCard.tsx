import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import { TbMail } from "react-icons/tb";
import { TbPhone } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import { deobfuscText } from "../../utils/obfuscation";


type ContactCardProps = {
    containerRef: React.RefObject<HTMLElement | null>;
};
type mousePositionType = {
    x: number;
    y: number;
}

export const ContactCard: FC<ContactCardProps> = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const phone = deobfuscText('-55"8"33"23"45"92');
    const mail = deobfuscText('vcdwtgv0rcvtkemBiockn0eqo');
    const { copied, handleCopy } = useClipboardCopy();
    const [mousePosition, setMousePosition] = useState<mousePositionType>({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handlePointerMove = (event: globalThis.MouseEvent) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                setMousePosition({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            }
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [cardRef]);

    return (
        <>
            <div className='contactCard' ref={cardRef}>
                <span>Feel free to contact me</span>
                <div className='contactContent'>
                    <div>
                        <div className='contactLine'>
                            <TbMail className='logoContact' color='white' size={45} />
                            <p
                                onClick={() => handleCopy(mail)}
                                onPointerEnter={() => setHovered(true)}
                                onPointerLeave={() => setHovered(false)}
                            >
                                {mail}
                            </p>
                        </div>
                        <div className='contactLine'>
                            <TbPhone className='logoContact' color='white' size={45} />
                            <p
                                onClick={() => handleCopy(phone)}
                                onPointerEnter={() => setHovered(true)}
                                onPointerLeave={() => setHovered(false)}
                            >
                                {phone}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='contactLine'>
                            <TbBrandGithub className='logoContact' color='white' size={45} />
                            <a
                                className="githubLink"
                                href='https://github.com/PatrickTaburet/'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://github.com/PatrickTaburet/
                            </a>
                        </div>
                        <div className='contactLine'>
                            <TbBrandLinkedin className='logoContact' color='white' size={45} />
                            <a className="linkedinLink" href='https://www.linkedin.com/in/patrick-taburet/' target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/patrick-taburet/</a>
                        </div>
                    </div>
                </div>
            </div>
            {(hovered || copied) && (
                <span
                    className="copyMessage"
                    style={{
                        position: 'fixed',
                        left: `${mousePosition.x + 15}px`,
                        top: `${mousePosition.y + 15}px`,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {copied ? 'Copied!' : 'Copy?'}
                </span>
            )}
        </>
    )
}