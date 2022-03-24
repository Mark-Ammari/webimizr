import Divider from 'components/Divider';
import { useRouter } from 'next/router';
import AuditBullet from 'public/charts/AuditBullet';
import React from 'react';
import { useSelector } from 'react-redux';
import { accessibilityData, accessibilityError, loadAccessibility } from 'store/reducers/lighthouse/accessibilitySlice';
import { bestPracticesData, bestPracticesError, loadBestPractices } from 'store/reducers/lighthouse/bestPracticesSlice';
import { loadPerformance, performanceData, performanceError } from 'store/reducers/lighthouse/performanceSlice';
import { loadPWA, pwaData, pwaError } from 'store/reducers/lighthouse/pwaSlice';
import { loadSEO, seoData, seoError } from 'store/reducers/lighthouse/seoSlice';

interface Props {
    url?: string | undefined
    jobResult?: 'Success' | 'Failed' | 'Running' | undefined
}

const AuditProgressBar: React.FC<Props> = ({ url, jobResult }) => {
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
            <section id='audit-progress-bar-container' className='container'>
                <div id='audit-progress-bar' className='section'>
                    <div className='progress-item'>
                        <h2 className='title'>URL</h2>
                        <p className='subheading'>{query.query.url || 'No URL Present.'}</p>
                    </div>
                    <div className='progress-item'>
                        <h2 className='title'>Job Queue</h2>
                        <div id='job-result'>
                            <AuditBullet margin='auto .5rem auto auto' />
                            <p className='subheading'>{!query.query.url ? 'Idle' : (loadingPerformance || loadingSEO || loadingPWA || loadingBestPractices || loadingAccessibiility) ? 'Loading' : (errorPerformance || !performanceResult['success']) || (errorSEO || !seoResult['success']) || (errorPWA || !pwaResult['success']) || (errorBestPractices || !bestPracticesResult['success']) || (errorAccessibility || !accessibilityResult['success']) ? 'Failed' : 'Success'}</p>
                        </div>
                    </div>
                </div>
                <Divider maxWidth='1366px' margin='.5rem auto auto auto' />
            </section>
            <style jsx>
                {`#audit-progress-bar-container {
                    margin: 3rem 0
                }
                #audit-progress-bar {
                    background: var(--whiteBackgroundColor);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .title {
                    font-size: 1rem;
                    font-weight: bold;
                    color: var(--primaryColor)
                }
                .subheading {
                    font-size: .9rem;
                    color: var(--secondaryTextColor)
                }
                #job-result {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start
                }`}
            </style>
        </>
    )
}

export default AuditProgressBar;

