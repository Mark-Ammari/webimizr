import Heading from 'components/Heading';
import React from 'react';
import View from 'components/View';
import PieGraph from 'public/charts/PieGraph';
import { useSelector } from 'react-redux';
import AuditBullet from 'public/charts/AuditBullet';
import { loadPerformance, performanceData } from 'store/reducers/lighthouse/performanceSlice';
import { accessibilityData, loadAccessibility } from 'store/reducers/lighthouse/accessibilitySlice';
import { bestPracticesData, loadBestPractices } from 'store/reducers/lighthouse/bestPracticesSlice';
import { loadPWA, pwaData } from 'store/reducers/lighthouse/pwaSlice';
import { loadSEO, seoData } from 'store/reducers/lighthouse/seoSlice';

const ReportSummary: React.FC = () => {
    const loadingPerformance = useSelector(loadPerformance);
    const performanceResult = useSelector(performanceData);
    const loadingSEO = useSelector(loadSEO);
    const seoResult = useSelector(seoData);
    const loadingPWA = useSelector(loadPWA);
    const pwaResult = useSelector(pwaData);
    const loadingBestPractices = useSelector(loadBestPractices);
    const bestPracticesResult = useSelector(bestPracticesData);
    const loadingAccessibiility = useSelector(loadAccessibility);
    const accessibilityResult = useSelector(accessibilityData);
    return (
        <>
            <section id='audit-metadata-bar-container' className='container'>
                <Heading
                    title='Metrics Summary'
                    subHeading='Quick Summary of all website audits and metrics.'
                />
                <div id='audit-metadata-diagnostics' className='section'>
                    <div id='audit-metadata-diagnostics-section'>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Number of Requests</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][0].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Number of Scripts</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][1].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Number of Stylesheets</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][2].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Number of Fonts</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][3].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Number of Tasks</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][4].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Round-Trip Time</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][5].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Throughput</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][6].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Max Round-Trip Time</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][7].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Max Server Latency</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][8].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Total Byte Weight</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][9].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Total Task Time</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][10].result}</p>
                        </div>
                        <div className='grid-item'>
                            <AuditBullet position='absolute' left={0} top='6px' />
                            <h2 className='title'>Transfer Size</h2>
                            <p className='subheading'>{loadingPerformance ? 0 : performanceResult['diagnostics']['details'][11].result}</p>
                        </div>
                    </div>
                </div>
                <div id='audit-metadata-bar' className='section'>
                    <View title='Performance'>
                        <PieGraph
                            data={[{
                                name: 'Performance',
                                value: loadingPerformance ? 0 : performanceResult.percentage as number
                            }]}
                        />
                    </View>
                    <View title='SEO'>
                        <PieGraph
                            data={[{
                                name: 'SEO',
                                value: loadingSEO ? 0 : seoResult.percentage as number
                            }]}
                        />
                    </View>
                    <View title='Best Practices'>
                        <PieGraph
                            data={[{
                                name: 'Best Practices',
                                value: loadingBestPractices ? 0 : bestPracticesResult.percentage as number
                            }]}
                        />
                    </View>
                    <View title='Accessibility'>
                        <PieGraph
                            data={[{
                                name: 'Accessibility',
                                value: loadingAccessibiility ? 0 : accessibilityResult.percentage as number
                            }]}
                        />
                    </View>
                    <View title='PWA'>
                        <PieGraph
                            data={[{
                                name: 'PWA',
                                value: loadingPWA ? 0 : pwaResult.percentage as number
                            }]}
                        />
                    </View>
                </div>
            </section>
            <style jsx>
                {`#audit-metadata-bar-container {
                    margin: 3rem 0;
                }
                #audit-metadata-diagnostics-section {
                    box-shadow: var(--shadow);
                    width: 100%;
                    padding: var(--spacing)
                }  
                #audit-metadata-diagnostics-section {
                    display: grid;
                    gap: var(--spacing);
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                }    
                #audit-metadata-bar {
                    display: grid;
                    gap: var(--spacing);
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                .grid-item {
                    position: relative;
                    max-width: 300px;
                    padding-left: 1rem;
                }
                .title {
                    font-size: 1rem;
                    font-weight: bold;
                    color: var(--primaryColor);
                    margin: 0;
                    padding: 0;
                }
                .subheading {
                    font-size: .9rem;
                    color: var(--secondaryTextColor)
                }`}
            </style>
        </>
    )
}

export default ReportSummary;

