import AuditList from 'components/AuditList';
import List from 'components/List';
import Message from 'components/Message';
import React from 'react';
import { useSelector } from 'react-redux';
import { bestPracticesData, bestPracticesError, loadBestPractices } from 'store/reducers/lighthouse/bestPracticesSlice';

const BestPracticesTab: React.FC = () => {
    const bestPracticesResult = useSelector(bestPracticesData);
    const loadingBestPractices = useSelector(loadBestPractices);
    const errorBestPractices = useSelector(bestPracticesError);

    return (
        <>
            <section id='best-practices-tab-container' className='section'>
                <Message success={bestPracticesResult.success} errorMessage={bestPracticesResult.message} />
                <h2 className='title'>Best Practices Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["csp-xss"].title} description={bestPracticesResult["csp-xss"].description} score={bestPracticesResult["csp-xss"].score} displayValue={bestPracticesResult["csp-xss"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["js-libraries"].title} description={bestPracticesResult["js-libraries"].description} score={bestPracticesResult["js-libraries"].score} displayValue={bestPracticesResult["js-libraries"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["valid-source-maps"].title} description={bestPracticesResult["valid-source-maps"].description} score={bestPracticesResult["valid-source-maps"].score} displayValue={bestPracticesResult["valid-source-maps"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["is-on-https"].title} description={bestPracticesResult["is-on-https"].description} score={bestPracticesResult["is-on-https"].score} displayValue={bestPracticesResult["is-on-https"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["geolocation-on-start"].title} description={bestPracticesResult["geolocation-on-start"].description} score={bestPracticesResult["geolocation-on-start"].score} displayValue={bestPracticesResult["geolocation-on-start"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["notification-on-start"].title} description={bestPracticesResult["notification-on-start"].description} score={bestPracticesResult["notification-on-start"].score} displayValue={bestPracticesResult["notification-on-start"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["no-vulnerable-libraries"].title} description={bestPracticesResult["no-vulnerable-libraries"].description} score={bestPracticesResult["no-vulnerable-libraries"].score} displayValue={bestPracticesResult["no-vulnerable-libraries"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["password-inputs-can-be-pasted-into"].title} description={bestPracticesResult["password-inputs-can-be-pasted-into"].description} score={bestPracticesResult["password-inputs-can-be-pasted-into"].score} displayValue={bestPracticesResult["password-inputs-can-be-pasted-into"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["image-aspect-ratio"].title} description={bestPracticesResult["image-aspect-ratio"].description} score={bestPracticesResult["image-aspect-ratio"].score} displayValue={bestPracticesResult["image-aspect-ratio"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["image-size-responsive"].title} description={bestPracticesResult["image-size-responsive"].description} score={bestPracticesResult["image-size-responsive"].score} displayValue={bestPracticesResult["image-size-responsive"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["doctype"].title} description={bestPracticesResult["doctype"].description} score={bestPracticesResult["doctype"].score} displayValue={bestPracticesResult["doctype"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["charset"].title} description={bestPracticesResult["charset"].description} score={bestPracticesResult["charset"].score} displayValue={bestPracticesResult["charset"].displayValue} />
                    {/* <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["no-unload-listeners"].title} description={bestPracticesResult["no-unload-listeners"].description} score={bestPracticesResult["no-unload-listeners"].score} displayValue={bestPracticesResult["no-unload-listeners"].displayValue} /> */}
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["deprecations"].title} description={bestPracticesResult["deprecations"].description} score={bestPracticesResult["deprecations"].score} displayValue={bestPracticesResult["deprecations"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["errors-in-console"].title} description={bestPracticesResult["errors-in-console"].description} score={bestPracticesResult["errors-in-console"].score} displayValue={bestPracticesResult["errors-in-console"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["inspector-issues"].title} description={bestPracticesResult["inspector-issues"].description} score={bestPracticesResult["inspector-issues"].score} displayValue={bestPracticesResult["inspector-issues"].displayValue} />
                    <AuditList loading={loadingBestPractices} error={errorBestPractices}  title={bestPracticesResult["preload-fonts"].title} description={bestPracticesResult["preload-fonts"].description} score={bestPracticesResult["preload-fonts"].score} displayValue={bestPracticesResult["preload-fonts"].displayValue} />
                </List>
            </section>
            <style jsx>
                {`#best-practices-tab-container {
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

export default BestPracticesTab;

