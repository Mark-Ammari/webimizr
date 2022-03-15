import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData, lighthouseError, loadLighthouse } from 'store/reducers/lighthouse/lighthouseSlice';

interface Props {
   score?: number | string | null | undefined
   fontSize?: number | string | undefined
   margin?: number | string | undefined
}

const Score: React.FC<Props> = ({ children, score=null, fontSize, margin }) => {
    const query = useRouter()
    const loading = useSelector(loadLighthouse)
    const report = useSelector(lighthouseData)
    const error = useSelector(lighthouseError)
    return (
        <>
            <p className='score'>{score === null ? 'N/A' : children}</p>
            <style jsx>
                {`.score {
                    display: inline;
                    margin: ${margin || 0};
                    font-size: ${fontSize || '1rem'};
                    color: ${!query.query.url ? '#ccc' : loading ? '#ccc' : error || !report['success'] ? 'var(--failedColor)' : score === null ? '#ccc' : score >= 0.90 ? 'var(--successColor)' : score >= 0.50 && score < 0.90 ? 'var(--warningColor)' : 'var(--failedColor)'}
                }`}
            </style>
        </>

    )
}

export default Score;