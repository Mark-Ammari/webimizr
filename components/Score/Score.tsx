import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { accessibilityData, accessibilityError, loadAccessibility } from 'store/reducers/lighthouse/accessibilitySlice';
import { bestPracticesData, bestPracticesError, loadBestPractices } from 'store/reducers/lighthouse/bestPracticesSlice';
import { loadPerformance, performanceData, performanceError } from 'store/reducers/lighthouse/performanceSlice';
import { loadPWA, pwaData, pwaError } from 'store/reducers/lighthouse/pwaSlice';
import { loadSEO, seoData, seoError } from 'store/reducers/lighthouse/seoSlice';

interface Props {
    score?: number | string | null | undefined
    fontSize?: number | string | undefined
    margin?: number | string | undefined
}

const Score: React.FC<Props> = ({ children, score = null, fontSize, margin }) => {
    const query = useRouter()
    const loadingPerformance = useSelector(loadPerformance);
    const loadingSEO = useSelector(loadSEO);
    const loadingPWA = useSelector(loadPWA);
    const loadingBestPractices = useSelector(loadBestPractices);
    const loadingAccessibiility = useSelector(loadAccessibility);

    const errorPerformance = useSelector(performanceError);
    const errorSEO = useSelector(seoError);
    const errorPWA = useSelector(pwaError);
    const errorBestPractices = useSelector(bestPracticesError);
    const errorAccessibility = useSelector(accessibilityError);

    const performanceResult = useSelector(performanceData);
    const seoResult = useSelector(seoData);
    const pwaResult = useSelector(pwaData);
    const bestPracticesResult = useSelector(bestPracticesData);
    const accessibilityResult = useSelector(accessibilityData);

    return (
        <>
            <p className='score'>{score === null ? 'N/A' : children}</p>
            <style jsx>
                {`.score {
                    display: inline;
                    margin: ${margin || 0};
                    font-size: ${fontSize || '1rem'};
                    color: ${!query.query.url ? '#ccc' : (loadingPerformance || loadingSEO || loadingPWA || loadingBestPractices || loadingAccessibiility) ? '#ccc' : (errorPerformance || !performanceResult['success']) || (errorSEO || !seoResult['success']) || (errorPWA || !pwaResult['success']) || (errorBestPractices || !bestPracticesResult['success']) || (errorAccessibility || !accessibilityResult['success']) ? 'var(--failedColor)' : score === null ? '#ccc' : score >= 0.90 ? 'var(--successColor)' : score >= 0.50 && score < 0.90 ? 'var(--warningColor)' : 'var(--failedColor)'}
                }`}
            </style>
        </>

    )
}

export default Score;