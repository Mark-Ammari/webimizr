import AuditList from 'components/AuditList';
import List from 'components/List';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData } from 'store/reducers/lighthouse/lighthouseSlice';

const ProgressiveTab: React.FC = () => {
    const report = useSelector(lighthouseData)

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <h2 className='title'>Progressive Web App Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={report["installable-manifest"].title} description={report["installable-manifest"].description} score={report["installable-manifest"].score} displayValue={report["installable-manifest"].displayValue} />
                    <AuditList title={report["service-worker"].title} description={report["service-worker"].description} score={report["service-worker"].score} displayValue={report["service-worker"].displayValue} />
                    <AuditList title={report["splash-screen"].title} description={report["splash-screen"].description} score={report["splash-screen"].score} displayValue={report["splash-screen"].displayValue} />
                    <AuditList title={report["themed-omnibox"].title} description={report["themed-omnibox"].description} score={report["themed-omnibox"].score} displayValue={report["themed-omnibox"].displayValue} />
                    <AuditList title={report["content-width"].title} description={report["content-width"].description} score={report["content-width"].score} displayValue={report["content-width"].displayValue} />
                    <AuditList title={report["viewport"].title} description={report["viewport"].description} score={report["viewport"].score} displayValue={report["viewport"].displayValue} />
                    <AuditList title={report["apple-touch-icon"].title} description={report["apple-touch-icon"].description} score={report["apple-touch-icon"].score} displayValue={report["apple-touch-icon"].displayValue} />
                    <AuditList title={report["maskable-icon"].title} description={report["maskable-icon"].description} score={report["maskable-icon"].score} displayValue={report["maskable-icon"].displayValue} />
                    <AuditList title={report["pwa-cross-browser"].title} description={report["pwa-cross-browser"].description} score={report["pwa-cross-browser"].score} displayValue={report["pwa-cross-browser"].displayValue} />
                    <AuditList title={report["pwa-page-transitions"].title} description={report["pwa-page-transitions"].description} score={report["pwa-page-transitions"].score} displayValue={report["pwa-page-transitions"].displayValue} />
                    <AuditList title={report["pwa-each-page-has-url"].title} description={report["pwa-each-page-has-url"].description} score={report["pwa-each-page-has-url"].score} displayValue={report["pwa-each-page-has-url"].displayValue} />
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
               
                .title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: var(--primaryColor);
                    margin-top: 2rem;
                    padding: 0;
                }`}
            </style>
        </>
    )
}

export default ProgressiveTab;

