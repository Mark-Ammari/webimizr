import AuditList from 'components/AuditList';
import List from 'components/List';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData } from 'store/reducers/lighthouse/lighthouseSlice';

const SeoTab: React.FC = () => {
    const report = useSelector(lighthouseData)

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <h2 className='title'>SEO Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={report["viewport"].title} description={report["viewport"].description} score={report["viewport"].score} displayValue={report["viewport"].displayValue} />
                    <AuditList title={report["meta-description"].title} description={report["meta-description"].description} score={report["meta-description"].score} displayValue={report["meta-description"].displayValue} />
                    <AuditList title={report["structured-data"].title} description={report["structured-data"].description} score={report["structured-data"].score} displayValue={report["structured-data"].displayValue} />
                    <AuditList title={report["document-title"].title} description={report["document-title"].description} score={report["document-title"].score} displayValue={report["document-title"].displayValue} />
                    <AuditList title={report["http-status-code"].title} description={report["http-status-code"].description} score={report["http-status-code"].score} displayValue={report["http-status-code"].displayValue} />
                    <AuditList title={report["link-text"].title} description={report["link-text"].description} score={report["link-text"].score} displayValue={report["link-text"].displayValue} />
                    <AuditList title={report["crawlable-anchors"].title} description={report["crawlable-anchors"].description} score={report["crawlable-anchors"].score} displayValue={report["crawlable-anchors"].displayValue} />
                    <AuditList title={report["is-crawlable"].title} description={report["is-crawlable"].description} score={report["is-crawlable"].score} displayValue={report["is-crawlable"].displayValue} />
                    <AuditList title={report["robots-txt"].title} description={report["robots-txt"].description} score={report["robots-txt"].score} displayValue={report["robots-txt"].displayValue} />
                    <AuditList title={report["image-alt"].title} description={report["image-alt"].description} score={report["image-alt"].score} displayValue={report["image-alt"].displayValue} />
                    <AuditList title={report["hreflang"].title} description={report["hreflang"].description} score={report["hreflang"].score} displayValue={report["hreflang"].displayValue} />
                    <AuditList title={report["plugins"].title} description={report["plugins"].description} score={report["plugins"].score} displayValue={report["plugins"].displayValue} />
                    <AuditList title={report["canonical"].title} description={report["canonical"].description} score={report["canonical"].score} displayValue={report["canonical"].displayValue} />
                    <AuditList title={report["font-size"].title} description={report["font-size"].description} score={report["font-size"].score} displayValue={report["font-size"].displayValue} />
                    <AuditList title={report["tap-targets"].title} description={report["tap-targets"].description} score={report["tap-targets"].score} displayValue={report["tap-targets"].displayValue} />
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

export default SeoTab;

