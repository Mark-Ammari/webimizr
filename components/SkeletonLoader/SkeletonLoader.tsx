import React from 'react';

interface Props {
    width?: string | number | undefined
    height?: string | number | undefined
    borderRadius?: string | number | undefined
    margin?: string | number | undefined
}

const SkeletonLoader: React.FC<Props> = ({ width, height, borderRadius, margin }) => {
    return (
        <>
            <div className='skeleton-loader'></div>
            <style jsx>
                {`.skeleton-loader {
                    width: ${width || '100%'};
                    height: ${height || '100%'};
                    margin: ${margin || 'auto'};
                    border-radius: ${borderRadius || 'var(--radius)'};
                    animation: skeleton-loading 1s linear infinite alternate;
                }
                @keyframes skeleton-loading {
                    0% {
                        background-color: rgba(231, 231, 231, 1);
                    }
              
                    100% {
                        background-color: rgba(231, 231, 231, 0.25);
                    }
                }`}
            </style>
        </>
    )
}

export default SkeletonLoader;