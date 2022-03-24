import AuditList from 'components/AuditList';
import List from 'components/List';
import Message from 'components/Message';
import Score from 'components/Score';
import AuditBullet from 'public/charts/AuditBullet';
import React from 'react';
import { useSelector } from 'react-redux';
import { performanceData } from 'store/reducers/lighthouse/performanceSlice';

const PerformanceTab: React.FC = () => {
    const performanceResult = useSelector(performanceData);

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <Message success={performanceResult.success} errorMessage={performanceResult.message}/>
                <ul id='performance-list'>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["first-contentful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Contentful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["first-contentful-paint"].score}>{`${performanceResult['first-contentful-paint'].displayValue} ${performanceResult['first-contentful-paint'].score ? ' • ' + (performanceResult['first-contentful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["interactive"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Time to Interactive</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["interactive"].score}>{`${performanceResult['interactive'].displayValue} ${performanceResult['interactive'].score ? ' • ' + (performanceResult['interactive'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["speed-index"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Speed Index</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["speed-index"].score}>{`${performanceResult['speed-index'].displayValue} ${performanceResult['speed-index'].score ? ' • ' + (performanceResult['speed-index'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["total-blocking-time"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Total Blocking Time</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["total-blocking-time"].score}>{`${performanceResult['largest-contentful-paint'].displayValue} ${performanceResult['total-blocking-time'].score ? ' • ' + (performanceResult['total-blocking-time'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["largest-contentful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Largest Contentful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["largest-contentful-paint"].score}>{`${performanceResult['largest-contentful-paint'].displayValue} ${performanceResult['largest-contentful-paint'].score ? ' • ' + (performanceResult['largest-contentful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["cumulative-layout-shift"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Cumulative Layout Shift</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["cumulative-layout-shift"].score}>{`${performanceResult['cumulative-layout-shift'].displayValue} ${performanceResult['cumulative-layout-shift'].score ? ' • ' + (performanceResult['cumulative-layout-shift'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["first-meaningful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Meaningful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["first-meaningful-paint"].score}>{`${performanceResult['first-meaningful-paint'].displayValue} ${performanceResult['first-meaningful-paint'].score ? ' • ' + (performanceResult['first-meaningful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={performanceResult["max-potential-fid"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Input Delay</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={performanceResult["max-potential-fid"].score}>{`${performanceResult['max-potential-fid'].displayValue} ${performanceResult['max-potential-fid'].score ? ' • ' + (performanceResult['max-potential-fid'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                </ul>
                <h2 className='title'>Performance Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={performanceResult["unsized-images"].title} description={performanceResult["unsized-images"].description} score={performanceResult["unsized-images"].score} displayValue={performanceResult["unsized-images"].displayValue}/>
                    <AuditList title={performanceResult["viewport"].title} description={performanceResult["viewport"].description} score={performanceResult["viewport"].score} displayValue={performanceResult["viewport"].displayValue}/>
                    <AuditList title={performanceResult["critical-request-chains"].title} description={performanceResult["critical-request-chains"].description} score={performanceResult["critical-request-chains"].score} displayValue={performanceResult["critical-request-chains"].displayValue}/>
                    <AuditList title={performanceResult["user-timings"].title} description={performanceResult["user-timings"].description} score={performanceResult["user-timings"].score} displayValue={performanceResult["user-timings"].displayValue}/>
                    <AuditList title={performanceResult["resource-summary"].title} description={performanceResult["resource-summary"].description} score={performanceResult["resource-summary"].score} displayValue={performanceResult["resource-summary"].displayValue}/>
                    <AuditList title={performanceResult["largest-contentful-paint-element"].title} description={performanceResult["largest-contentful-paint-element"].description} score={performanceResult["largest-contentful-paint-element"].score} displayValue={performanceResult["largest-contentful-paint-element"].displayValue}/>
                    <AuditList title={performanceResult["layout-shift-elements"].title} description={performanceResult["layout-shift-elements"].description} score={performanceResult["layout-shift-elements"].score} displayValue={performanceResult["layout-shift-elements"].displayValue}/>
                    <AuditList title={performanceResult["long-tasks"].title} description={performanceResult["long-tasks"].description} score={performanceResult["long-tasks"].score} displayValue={performanceResult["long-tasks"].displayValue}/>
                    <AuditList title={performanceResult["non-composited-animations"].title} description={performanceResult["non-composited-animations"].description} score={performanceResult["non-composited-animations"].score} displayValue={performanceResult["non-composited-animations"].displayValue}/>
                    <AuditList title={performanceResult["render-blocking-resources"].title} description={performanceResult["render-blocking-resources"].description} score={performanceResult["render-blocking-resources"].score} displayValue={performanceResult["render-blocking-resources"].displayValue}/>
                    <AuditList title={performanceResult["uses-responsive-images"].title} description={performanceResult["uses-responsive-images"].description} score={performanceResult["uses-responsive-images"].score} displayValue={performanceResult["uses-responsive-images"].displayValue}/>
                    <AuditList title={performanceResult["offscreen-images"].title} description={performanceResult["offscreen-images"].description} score={performanceResult["offscreen-images"].score} displayValue={performanceResult["offscreen-images"].displayValue}/>
                    <AuditList title={performanceResult["unminified-css"].title} description={performanceResult["unminified-css"].description} score={performanceResult["unminified-css"].score} displayValue={performanceResult["unminified-css"].displayValue}/>
                    <AuditList title={performanceResult["unminified-javascript"].title} description={performanceResult["unminified-javascript"].description} score={performanceResult["unminified-javascript"].score} displayValue={performanceResult["unminified-javascript"].displayValue}/>
                    <AuditList title={performanceResult["unused-css-rules"].title} description={performanceResult["unused-css-rules"].description} score={performanceResult["unused-css-rules"].score} displayValue={performanceResult["unused-css-rules"].displayValue}/>
                    <AuditList title={performanceResult["unused-javascript"].title} description={performanceResult["unused-javascript"].description} score={performanceResult["unused-javascript"].score} displayValue={performanceResult["unused-javascript"].displayValue}/>
                    <AuditList title={performanceResult["uses-optimized-images"].title} description={performanceResult["uses-optimized-images"].description} score={performanceResult["uses-optimized-images"].score} displayValue={performanceResult["uses-optimized-images"].displayValue}/>
                    <AuditList title={performanceResult["modern-image-formats"].title} description={performanceResult["modern-image-formats"].description} score={performanceResult["modern-image-formats"].score} displayValue={performanceResult["modern-image-formats"].displayValue}/>
                    <AuditList title={performanceResult["uses-text-compression"].title} description={performanceResult["uses-text-compression"].description} score={performanceResult["uses-text-compression"].score} displayValue={performanceResult["uses-text-compression"].displayValue}/>
                    <AuditList title={performanceResult["uses-rel-preconnect"].title} description={performanceResult["uses-rel-preconnect"].description} score={performanceResult["uses-rel-preconnect"].score} displayValue={performanceResult["uses-rel-preconnect"].displayValue}/>
                    <AuditList title={performanceResult["server-response-time"].title} description={performanceResult["server-response-time"].description} score={performanceResult["server-response-time"].score} displayValue={performanceResult["server-response-time"].displayValue}/>
                    <AuditList title={performanceResult["redirects"].title} description={performanceResult["redirects"].description} score={performanceResult["redirects"].score} displayValue={performanceResult["redirects"].displayValue}/>
                    <AuditList title={performanceResult["uses-rel-preload"].title} description={performanceResult["uses-rel-preload"].description} score={performanceResult["uses-rel-preload"].score} displayValue={performanceResult["uses-rel-preload"].displayValue}/>
                    {/* <AuditList title={performanceResult["uses-http2"].title} description={performanceResult["uses-http2"].description} score={performanceResult["uses-http2"].score} displayValue={performanceResult["uses-http2"].displayValue}/> */}
                    <AuditList title={performanceResult["efficient-animated-content"].title} description={performanceResult["efficient-animated-content"].description} score={performanceResult["efficient-animated-content"].score} displayValue={performanceResult["efficient-animated-content"].displayValue}/>
                    <AuditList title={performanceResult["duplicated-javascript"].title} description={performanceResult["duplicated-javascript"].description} score={performanceResult["duplicated-javascript"].score} displayValue={performanceResult["duplicated-javascript"].displayValue}/>
                    <AuditList title={performanceResult["legacy-javascript"].title} description={performanceResult["legacy-javascript"].description} score={performanceResult["legacy-javascript"].score} displayValue={performanceResult["legacy-javascript"].displayValue}/>
                    <AuditList title={performanceResult["preload-lcp-image"].title} description={performanceResult["preload-lcp-image"].description} score={performanceResult["preload-lcp-image"].score} displayValue={performanceResult["preload-lcp-image"].displayValue}/>
                    <AuditList title={performanceResult["total-byte-weight"].title} description={performanceResult["total-byte-weight"].description} score={performanceResult["total-byte-weight"].score} displayValue={performanceResult["total-byte-weight"].displayValue}/>
                    <AuditList title={performanceResult["uses-long-cache-ttl"].title} description={performanceResult["uses-long-cache-ttl"].description} score={performanceResult["uses-long-cache-ttl"].score} displayValue={performanceResult["uses-long-cache-ttl"].displayValue}/>
                    <AuditList title={performanceResult["dom-size"].title} description={performanceResult["dom-size"].description} score={performanceResult["dom-size"].score} displayValue={performanceResult["dom-size"].displayValue}/>
                    <AuditList title={performanceResult["bootup-time"].title} description={performanceResult["bootup-time"].description} score={performanceResult["bootup-time"].score} displayValue={performanceResult["bootup-time"].displayValue}/>
                    <AuditList title={performanceResult["mainthread-work-breakdown"].title} description={performanceResult["mainthread-work-breakdown"].description} score={performanceResult["mainthread-work-breakdown"].score} displayValue={performanceResult["mainthread-work-breakdown"].displayValue}/>
                    <AuditList title={performanceResult["font-display"].title} description={performanceResult["font-display"].description} score={performanceResult["font-display"].score} displayValue={performanceResult["font-display"].displayValue}/>
                    <AuditList title={performanceResult["third-party-summary"].title} description={performanceResult["third-party-summary"].description} score={performanceResult["third-party-summary"].score} displayValue={performanceResult["third-party-summary"].displayValue}/>
                    <AuditList title={performanceResult["third-party-facades"].title} description={performanceResult["third-party-facades"].description} score={performanceResult["third-party-facades"].score} displayValue={performanceResult["third-party-facades"].displayValue}/>
                    <AuditList title={performanceResult["lcp-lazy-loaded"].title} description={performanceResult["lcp-lazy-loaded"].description} score={performanceResult["lcp-lazy-loaded"].score} displayValue={performanceResult["lcp-lazy-loaded"].displayValue}/>
                    <AuditList title={performanceResult["uses-passive-event-listeners"].title} description={performanceResult["uses-passive-event-listeners"].description} score={performanceResult["uses-passive-event-listeners"].score} displayValue={performanceResult["uses-passive-event-listeners"].displayValue}/>
                    <AuditList title={performanceResult["no-document-write"].title} description={performanceResult["no-document-write"].description} score={performanceResult["no-document-write"].score} displayValue={performanceResult["no-document-write"].displayValue}/>
                </List>
            </section>
            <style jsx>
                {`#performance-tab-container {
                    overflow: hidden;
                }
                #performance-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: var(--spacing);
                    width: 100%;
                    margin-bottom: 2rem;
                }
                .list-item {
                    width: 100%;
                    padding: var(--spacing);
                    display: flex;
                    flex-direction: column;
                    border-top: 1px solid var(--accentColor)
                }
                .heading {
                    display: flex;
                    align-items: center;
                }
                .title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: var(--primaryColor);
                    margin: 0;
                    padding: 0;
                }`}
            </style>
        </>
    )
}

export default PerformanceTab;

