import AuditList from 'components/AuditList';
import List from 'components/List';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData } from 'store/reducers/lighthouse/lighthouseSlice';

const BestPracticesTab: React.FC = () => {
    const report = useSelector(lighthouseData)

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <h2 className='title'>Best Practices Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={report["csp-xss"].title} description={report["csp-xss"].description} score={report["csp-xss"].score} displayValue={report["csp-xss"].displayValue} />
                    <AuditList title={report["js-libraries"].title} description={report["js-libraries"].description} score={report["js-libraries"].score} displayValue={report["js-libraries"].displayValue} />
                    <AuditList title={report["valid-source-maps"].title} description={report["valid-source-maps"].description} score={report["valid-source-maps"].score} displayValue={report["valid-source-maps"].displayValue} />
                    <AuditList title={report["is-on-https"].title} description={report["is-on-https"].description} score={report["is-on-https"].score} displayValue={report["is-on-https"].displayValue} />
                    <AuditList title={report["geolocation-on-start"].title} description={report["geolocation-on-start"].description} score={report["geolocation-on-start"].score} displayValue={report["geolocation-on-start"].displayValue} />
                    <AuditList title={report["notification-on-start"].title} description={report["notification-on-start"].description} score={report["notification-on-start"].score} displayValue={report["notification-on-start"].displayValue} />
                    <AuditList title={report["no-vulnerable-libraries"].title} description={report["no-vulnerable-libraries"].description} score={report["no-vulnerable-libraries"].score} displayValue={report["no-vulnerable-libraries"].displayValue} />
                    <AuditList title={report["password-inputs-can-be-pasted-into"].title} description={report["password-inputs-can-be-pasted-into"].description} score={report["password-inputs-can-be-pasted-into"].score} displayValue={report["password-inputs-can-be-pasted-into"].displayValue} />
                    <AuditList title={report["image-aspect-ratio"].title} description={report["image-aspect-ratio"].description} score={report["image-aspect-ratio"].score} displayValue={report["image-aspect-ratio"].displayValue} />
                    <AuditList title={report["image-size-responsive"].title} description={report["image-size-responsive"].description} score={report["image-size-responsive"].score} displayValue={report["image-size-responsive"].displayValue} />
                    <AuditList title={report["doctype"].title} description={report["doctype"].description} score={report["doctype"].score} displayValue={report["doctype"].displayValue} />
                    <AuditList title={report["charset"].title} description={report["charset"].description} score={report["charset"].score} displayValue={report["charset"].displayValue} />
                    <AuditList title={report["no-unload-listeners"].title} description={report["no-unload-listeners"].description} score={report["no-unload-listeners"].score} displayValue={report["no-unload-listeners"].displayValue} />
                    <AuditList title={report["deprecations"].title} description={report["deprecations"].description} score={report["deprecations"].score} displayValue={report["deprecations"].displayValue} />
                    <AuditList title={report["errors-in-console"].title} description={report["errors-in-console"].description} score={report["errors-in-console"].score} displayValue={report["errors-in-console"].displayValue} />
                    <AuditList title={report["inspector-issues"].title} description={report["inspector-issues"].description} score={report["inspector-issues"].score} displayValue={report["inspector-issues"].displayValue} />
                    <AuditList title={report["preload-fonts"].title} description={report["preload-fonts"].description} score={report["preload-fonts"].score} displayValue={report["preload-fonts"].displayValue} />
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

export default BestPracticesTab;

