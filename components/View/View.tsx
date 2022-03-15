import React from 'react';

interface Props {
    title?: string | undefined
    description?: string | undefined
}

const View: React.FC<Props> = ({ children, title, description }) => {
    return (
        <>
            <div className='view'>
                <h2 className='title'>{title}</h2>
                <p className='description'>{description}</p>
                {children}
            </div>
            <style jsx>
                {`.view {
                    min-width: 300px;
                    padding: var(--spacing);
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    align-items: flex-start;
                    margin: auto;
                    justify-content: center;
                    border-top: 3px solid var(--accentColor)
                }
                .title {
                    color: var(--primaryColor);
                    font-size: 1.25rem
                }
                .description {
                    color: var(--secondaryTextColor);
                    font-size: 0.9rem
                }`}
            </style>
        </>
    )
}

export default View;