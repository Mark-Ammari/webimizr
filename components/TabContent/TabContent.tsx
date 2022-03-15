import React from 'react';

interface Props {
    checked: boolean | undefined
}

const TabContent: React.FC<Props> = ({ children, checked }) => {
    return (
        <>
            <section className='tab-content'>
                {children}
            </section>
            <style jsx>
                {`.tab-content {
                    width: 100%;
                    display: ${checked ? 'block' : 'none'};
                    overflow: hidden
                }`}
            </style>
        </>
    )
}

export default TabContent;