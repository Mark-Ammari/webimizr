import React from 'react';

interface Props {
    margin?: string | number | undefined
    maxWidth?: string | number | undefined
}

const Divider: React.FC<Props> = ({ margin, maxWidth }) => {
    return (
        <>
            <div id='divider'></div>
            <style jsx>
                {`#divider {
                    max-width: ${maxWidth || "100%"};
                    background-color: #e7e7e7;
                    height: 1px;
                    margin: ${margin || 0}
                }`}
            </style>
        </>

    )
}

export default Divider;