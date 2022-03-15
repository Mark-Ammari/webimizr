import React from 'react';

interface Props {
    title: string | undefined
    subHeading: string | undefined
}

const Heading: React.FC<Props> = ({ title, subHeading }) => {
    return (
        <>
            <section className='heading-container container'>
                <div className='heading section'>
                    <h2 className='title'>{title}</h2>
                    <h3 className='subheading'>{subHeading}</h3>
                    <hr className='divider' />
                </div>
            </section>
            <style jsx>
                {`.heading {
                    
                }
                .divider {
                    width: 100px;
                    background-color: var(--accentcolor);
                    background: linear-gradient(90deg, rgba(219,226,239,1) 20%, rgba(0,0,0,0) 100%);
                    border: none;
                    height: 2px;
                }
                .title {
                    color: var(--primaryColor)
                }
                .subheading {
                    color: var(--secondaryColor);
                    font-size: 1rem;
                    margin-bottom: .5rem;
                }`}
            </style>
        </>
    )
}

export default Heading;

