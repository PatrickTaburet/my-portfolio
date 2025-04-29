import React, { FC, memo, useRef, useState } from 'react'
import { TbMail } from "react-icons/tb";
import { TbPhone } from "react-icons/tb";
import { TbBrandGithub } from "react-icons/tb";
import { TbBrandLinkedin } from "react-icons/tb";
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import { deobfuscText } from "../../utils/obfuscation";
import CopyToolTipPortal from './CopyToolTip';


const ContactCardComponent: FC = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const phone = deobfuscText('-55"8"33"23"45"92');
    const mail = deobfuscText('vcdwtgv0rcvtkemBiockn0eqo');
    const { copied, handleCopy } = useClipboardCopy();
    const cardRef = useRef<HTMLDivElement>(null);

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
            {(hovered || copied) && <CopyToolTipPortal isCopied={copied} />}
        </>
    )
}

export const ContactCard = memo(ContactCardComponent);
