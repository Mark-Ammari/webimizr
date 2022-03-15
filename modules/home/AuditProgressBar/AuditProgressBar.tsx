import Divider from 'components/Divider';
import { useRouter } from 'next/router';
import AuditBullet from 'public/charts/AuditBullet';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData, lighthouseError, loadLighthouse } from 'store/reducers/lighthouse/lighthouseSlice';

interface Props {
    url?: string | undefined
    jobResult?: 'Success' | 'Failed' | 'Running' | undefined
}

const AuditProgressBar: React.FC<Props> = ({ url, jobResult }) => {
    const query = useRouter()
    const loading = useSelector(loadLighthouse)
    const report = useSelector(lighthouseData)
    const error = useSelector(lighthouseError)
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
                            <p className='subheading'>{!query.query.url ? 'Idle' : loading ? 'Loading' : error || !report['success'] ? 'Failed' : 'Success'}</p>
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

