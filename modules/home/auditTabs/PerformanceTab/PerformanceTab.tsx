import AuditList from 'components/AuditList';
import List from 'components/List';
import Score from 'components/Score';
import AuditBullet from 'public/charts/AuditBullet';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData } from 'store/reducers/lighthouse/lighthouseSlice';

const PerformanceTab: React.FC = () => {
    const report = useSelector(lighthouseData)

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <ul id='performance-list'>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["first-contentful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Contentful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["first-contentful-paint"].score}>{`${report['first-contentful-paint'].displayValue} ${report['first-contentful-paint'].score ? ' • ' + (report['first-contentful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["interactive"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Time to Interactive</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["interactive"].score}>{`${report['interactive'].displayValue} ${report['interactive'].score ? ' • ' + (report['interactive'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["speed-index"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Speed Index</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["speed-index"].score}>{`${report['speed-index'].displayValue} ${report['speed-index'].score ? ' • ' + (report['speed-index'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["total-blocking-time"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Total Blocking Time</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["total-blocking-time"].score}>{`${report['largest-contentful-paint'].displayValue} ${report['total-blocking-time'].score ? ' • ' + (report['total-blocking-time'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["largest-contentful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Largest Contentful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["largest-contentful-paint"].score}>{`${report['largest-contentful-paint'].displayValue} ${report['largest-contentful-paint'].score ? ' • ' + (report['largest-contentful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["cumulative-layout-shift"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>Cumulative Layout Shift</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["cumulative-layout-shift"].score}>{`${report['cumulative-layout-shift'].displayValue} ${report['cumulative-layout-shift'].score ? ' • ' + (report['cumulative-layout-shift'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["first-meaningful-paint"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Meaningful Paint</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["first-meaningful-paint"].score}>{`${report['first-meaningful-paint'].displayValue} ${report['first-meaningful-paint'].score ? ' • ' + (report['first-meaningful-paint'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                    <li className='list-item'>
                        <div className='heading'>
                            <AuditBullet score={report["max-potential-fid"].score} margin='0 var(--horizontalSpacing) 0 0' type='score' />
                            <h2 className='title'>First Input Delay</h2>
                        </div>
                        <Score fontSize='1.5rem' margin='0 0 0 1.5rem' score={report["max-potential-fid"].score}>{`${report['max-potential-fid'].displayValue} ${report['max-potential-fid'].score ? ' • ' + (report['max-potential-fid'].score * 100).toFixed(0) + '%' : ""}`}</Score>
                    </li>
                </ul>
                <h2 className='title'>Performance Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={report["unsized-images"].title} description={report["unsized-images"].description} score={report["unsized-images"].score} displayValue={report["unsized-images"].displayValue}/>
                    <AuditList title={report["viewport"].title} description={report["viewport"].description} score={report["viewport"].score} displayValue={report["viewport"].displayValue}/>
                    <AuditList title={report["critical-request-chains"].title} description={report["critical-request-chains"].description} score={report["critical-request-chains"].score} displayValue={report["critical-request-chains"].displayValue}/>
                    <AuditList title={report["user-timings"].title} description={report["user-timings"].description} score={report["user-timings"].score} displayValue={report["user-timings"].displayValue}/>
                    <AuditList title={report["resource-summary"].title} description={report["resource-summary"].description} score={report["resource-summary"].score} displayValue={report["resource-summary"].displayValue}/>
                    <AuditList title={report["largest-contentful-paint-element"].title} description={report["largest-contentful-paint-element"].description} score={report["largest-contentful-paint-element"].score} displayValue={report["largest-contentful-paint-element"].displayValue}/>
                    <AuditList title={report["layout-shift-elements"].title} description={report["layout-shift-elements"].description} score={report["layout-shift-elements"].score} displayValue={report["layout-shift-elements"].displayValue}/>
                    <AuditList title={report["long-tasks"].title} description={report["long-tasks"].description} score={report["long-tasks"].score} displayValue={report["long-tasks"].displayValue}/>
                    <AuditList title={report["non-composited-animations"].title} description={report["non-composited-animations"].description} score={report["non-composited-animations"].score} displayValue={report["non-composited-animations"].displayValue}/>
                    <AuditList title={report["render-blocking-resources"].title} description={report["render-blocking-resources"].description} score={report["render-blocking-resources"].score} displayValue={report["render-blocking-resources"].displayValue}/>
                    <AuditList title={report["uses-responsive-images"].title} description={report["uses-responsive-images"].description} score={report["uses-responsive-images"].score} displayValue={report["uses-responsive-images"].displayValue}/>
                    <AuditList title={report["offscreen-images"].title} description={report["offscreen-images"].description} score={report["offscreen-images"].score} displayValue={report["offscreen-images"].displayValue}/>
                    <AuditList title={report["unminified-css"].title} description={report["unminified-css"].description} score={report["unminified-css"].score} displayValue={report["unminified-css"].displayValue}/>
                    <AuditList title={report["unminified-javascript"].title} description={report["unminified-javascript"].description} score={report["unminified-javascript"].score} displayValue={report["unminified-javascript"].displayValue}/>
                    <AuditList title={report["unused-css-rules"].title} description={report["unused-css-rules"].description} score={report["unused-css-rules"].score} displayValue={report["unused-css-rules"].displayValue}/>
                    <AuditList title={report["unused-javascript"].title} description={report["unused-javascript"].description} score={report["unused-javascript"].score} displayValue={report["unused-javascript"].displayValue}/>
                    <AuditList title={report["uses-optimized-images"].title} description={report["uses-optimized-images"].description} score={report["uses-optimized-images"].score} displayValue={report["uses-optimized-images"].displayValue}/>
                    <AuditList title={report["modern-image-formats"].title} description={report["modern-image-formats"].description} score={report["modern-image-formats"].score} displayValue={report["modern-image-formats"].displayValue}/>
                    <AuditList title={report["uses-text-compression"].title} description={report["uses-text-compression"].description} score={report["uses-text-compression"].score} displayValue={report["uses-text-compression"].displayValue}/>
                    <AuditList title={report["uses-rel-preconnect"].title} description={report["uses-rel-preconnect"].description} score={report["uses-rel-preconnect"].score} displayValue={report["uses-rel-preconnect"].displayValue}/>
                    <AuditList title={report["server-response-time"].title} description={report["server-response-time"].description} score={report["server-response-time"].score} displayValue={report["server-response-time"].displayValue}/>
                    <AuditList title={report["redirects"].title} description={report["redirects"].description} score={report["redirects"].score} displayValue={report["redirects"].displayValue}/>
                    <AuditList title={report["uses-rel-preload"].title} description={report["uses-rel-preload"].description} score={report["uses-rel-preload"].score} displayValue={report["uses-rel-preload"].displayValue}/>
                    <AuditList title={report["uses-http2"].title} description={report["uses-http2"].description} score={report["uses-http2"].score} displayValue={report["uses-http2"].displayValue}/>
                    <AuditList title={report["efficient-animated-content"].title} description={report["efficient-animated-content"].description} score={report["efficient-animated-content"].score} displayValue={report["efficient-animated-content"].displayValue}/>
                    <AuditList title={report["duplicated-javascript"].title} description={report["duplicated-javascript"].description} score={report["duplicated-javascript"].score} displayValue={report["duplicated-javascript"].displayValue}/>
                    <AuditList title={report["legacy-javascript"].title} description={report["legacy-javascript"].description} score={report["legacy-javascript"].score} displayValue={report["legacy-javascript"].displayValue}/>
                    <AuditList title={report["preload-lcp-image"].title} description={report["preload-lcp-image"].description} score={report["preload-lcp-image"].score} displayValue={report["preload-lcp-image"].displayValue}/>
                    <AuditList title={report["total-byte-weight"].title} description={report["total-byte-weight"].description} score={report["total-byte-weight"].score} displayValue={report["total-byte-weight"].displayValue}/>
                    <AuditList title={report["uses-long-cache-ttl"].title} description={report["uses-long-cache-ttl"].description} score={report["uses-long-cache-ttl"].score} displayValue={report["uses-long-cache-ttl"].displayValue}/>
                    <AuditList title={report["dom-size"].title} description={report["dom-size"].description} score={report["dom-size"].score} displayValue={report["dom-size"].displayValue}/>
                    <AuditList title={report["bootup-time"].title} description={report["bootup-time"].description} score={report["bootup-time"].score} displayValue={report["bootup-time"].displayValue}/>
                    <AuditList title={report["mainthread-work-breakdown"].title} description={report["mainthread-work-breakdown"].description} score={report["mainthread-work-breakdown"].score} displayValue={report["mainthread-work-breakdown"].displayValue}/>
                    <AuditList title={report["font-display"].title} description={report["font-display"].description} score={report["font-display"].score} displayValue={report["font-display"].displayValue}/>
                    <AuditList title={report["third-party-summary"].title} description={report["third-party-summary"].description} score={report["third-party-summary"].score} displayValue={report["third-party-summary"].displayValue}/>
                    <AuditList title={report["third-party-facades"].title} description={report["third-party-facades"].description} score={report["third-party-facades"].score} displayValue={report["third-party-facades"].displayValue}/>
                    <AuditList title={report["lcp-lazy-loaded"].title} description={report["lcp-lazy-loaded"].description} score={report["lcp-lazy-loaded"].score} displayValue={report["lcp-lazy-loaded"].displayValue}/>
                    <AuditList title={report["uses-passive-event-listeners"].title} description={report["uses-passive-event-listeners"].description} score={report["uses-passive-event-listeners"].score} displayValue={report["uses-passive-event-listeners"].displayValue}/>
                    <AuditList title={report["no-document-write"].title} description={report["no-document-write"].description} score={report["no-document-write"].score} displayValue={report["no-document-write"].displayValue}/>
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

