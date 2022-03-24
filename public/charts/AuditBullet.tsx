import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import IconProps from 'types/iconProps';
import { loadPerformance, performanceData, performanceError } from 'store/reducers/lighthouse/performanceSlice';
import { loadPWA, pwaData, pwaError } from 'store/reducers/lighthouse/pwaSlice';
import { loadSEO, seoData, seoError } from 'store/reducers/lighthouse/seoSlice';
import { accessibilityData, accessibilityError, loadAccessibility } from 'store/reducers/lighthouse/accessibilitySlice';
import { bestPracticesData, bestPracticesError, loadBestPractices } from 'store/reducers/lighthouse/bestPracticesSlice';


interface BulletProps {
    position?: 'static' | 'absolute' | undefined
    top?: string | number | undefined
    right?: string | number | undefined
    bottom?: string | number | undefined
    left?: string | number | undefined
    score?: number | null | undefined
    type?: "score" | "load" | undefined
}

const AuditBullet: React.FC<IconProps & BulletProps> = ({ margin, position, top, right, bottom, left, type = 'load', score = null }) => {
    const query = useRouter()
    // const loading = useSelector(loadLighthouse)
    // const report = useSelector(lighthouseData)
    // const error = useSelector(lighthouseError)
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
            {type === 'load' ?
                <svg className='icon' width='7px' height='7px' fill={!query.query.url ? '#ccc' : (loadingPerformance || loadingSEO || loadingPWA || loadingBestPractices || loadingAccessibiility) ? 'var(--warningColor)' : (errorPerformance || !performanceResult['success']) || (errorSEO || !seoResult['success']) || (errorPWA || !pwaResult['success']) || (errorBestPractices || !bestPracticesResult['success']) || (errorAccessibility || !accessibilityResult['success']) ? 'var(--failedColor)' : 'var(--successColor)'} focusable="false" aria-hidden="true" viewBox="0 0 100 100" data-testid="AppsIcon">
                    <circle cx="50" cy="50" r="50" />
                </svg>
                :
                <svg className='icon' width='7px' height='7px' fill={!query.query.url ? '#ccc' : (loadingPerformance || loadingSEO || loadingPWA || loadingBestPractices || loadingAccessibiility) ? '#ccc' : (errorPerformance || !performanceResult['success']) || (errorSEO || !seoResult['success']) || (errorPWA || !pwaResult['success']) || (errorBestPractices || !bestPracticesResult['success']) || (errorAccessibility || !accessibilityResult['success']) ? 'var(--failedColor)' : score === null ? '#ccc' : score >= 0.90 ? 'var(--successColor)' : score >= 0.50 && score < 0.90 ? 'var(--warningColor)' : 'var(--failedColor)'} focusable="false" aria-hidden="true" viewBox="0 0 100 100" data-testid="AppsIcon">
                    <circle cx="50" cy="50" r="50" />
                </svg>
            }
            <style jsx>
                {`.icon {
                    margin: ${margin || 0};
                    position: ${position || 'static'};
                    top: ${top || 0};
                    right: ${right || 0};
                    min-width: 7px;
                    min-height: 7px;
                    bottom: ${bottom || 0};
                    left: ${left || 0}
                }`}
            </style>
        </>
    )
}

export default AuditBullet;