import Link from 'next/link';
import Webimizr from 'public/icons/Logo';
import React from 'react';

interface Props {
    margin?: string | number | undefined;
    textAlign?: 'center' | 'left' | 'right' | undefined
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Logo: React.FC<Props> = ({ margin, textAlign, onClick }) => {
    return (
        <>
            <Link href='/'>
                <a>
                    <div onClick={onClick} id='logo-container'>
                        <Webimizr size='32px' color='var(--secondaryColor)' margin='0 .5rem 0 0' />
                        <div>
                            <p className='heading' id='seo-logo'>WEB<span className='logo' id='lyzer-logo'>IMIZR</span></p>
                        </div>
                    </div>
                </a>
            </Link>
            <style jsx>
                {`#logo-container {
                    width: 100%;
                    text-align: ${textAlign || 'center'};
                    margin: ${margin || 0};
                    cursor: pointer;
                    align-items: flex-end;
                    justify-content: flex-start;
                    display: flex;
                }
                .heading {
                    font-size: 1.75rem;
                    margin: 0;
                    padding: 0;
                }

                #seo-logo {
                    line-height: 1.033rem;
                    font-family: var(--tekoFont);
                    color: var(--primaryColor);
                }
                #lyzer-logo {
                    color: var(--secondaryColor);                  
                }`}
            </style>
        </>

    )
}

export default Logo;