import AuditList from 'components/AuditList';
import List from 'components/List';
import Message from 'components/Message';
import React from 'react';
import { useSelector } from 'react-redux';
import { loadPWA, pwaData, pwaError } from 'store/reducers/lighthouse/pwaSlice';

const ProgressiveTab: React.FC = () => {
    const pwaResult = useSelector(pwaData);
    const loadingPWA = useSelector(loadPWA);
    const errorPWA = useSelector(pwaError);

    return (
        <>
            <section id='pwa-tab-container' className='section'>
                <Message success={pwaResult.success} errorMessage={pwaResult.message} />
                <h2 className='title'>Progressive Web App Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["installable-manifest"].title} description={pwaResult["installable-manifest"].description} score={pwaResult["installable-manifest"].score} displayValue={pwaResult["installable-manifest"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["service-worker"].title} description={pwaResult["service-worker"].description} score={pwaResult["service-worker"].score} displayValue={pwaResult["service-worker"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["splash-screen"].title} description={pwaResult["splash-screen"].description} score={pwaResult["splash-screen"].score} displayValue={pwaResult["splash-screen"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["themed-omnibox"].title} description={pwaResult["themed-omnibox"].description} score={pwaResult["themed-omnibox"].score} displayValue={pwaResult["themed-omnibox"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["content-width"].title} description={pwaResult["content-width"].description} score={pwaResult["content-width"].score} displayValue={pwaResult["content-width"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["viewport"].title} description={pwaResult["viewport"].description} score={pwaResult["viewport"].score} displayValue={pwaResult["viewport"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["apple-touch-icon"].title} description={pwaResult["apple-touch-icon"].description} score={pwaResult["apple-touch-icon"].score} displayValue={pwaResult["apple-touch-icon"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["maskable-icon"].title} description={pwaResult["maskable-icon"].description} score={pwaResult["maskable-icon"].score} displayValue={pwaResult["maskable-icon"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["pwa-cross-browser"].title} description={pwaResult["pwa-cross-browser"].description} score={pwaResult["pwa-cross-browser"].score} displayValue={pwaResult["pwa-cross-browser"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["pwa-page-transitions"].title} description={pwaResult["pwa-page-transitions"].description} score={pwaResult["pwa-page-transitions"].score} displayValue={pwaResult["pwa-page-transitions"].displayValue} />
                    <AuditList loading={loadingPWA} error={errorPWA}  title={pwaResult["pwa-each-page-has-url"].title} description={pwaResult["pwa-each-page-has-url"].description} score={pwaResult["pwa-each-page-has-url"].score} displayValue={pwaResult["pwa-each-page-has-url"].displayValue} />
                </List>
            </section>
            <style jsx>
                {`#pwa-tab-container {
                    overflow: hidden;
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

