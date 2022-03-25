import AuditList from 'components/AuditList';
import List from 'components/List';
import Message from 'components/Message';
import React from 'react';
import { useSelector } from 'react-redux';
import { loadSEO, seoData, seoError } from 'store/reducers/lighthouse/seoSlice';

const SeoTab: React.FC = () => {
    const seoResult = useSelector(seoData);
    const loadingSEO = useSelector(loadSEO);
    const errorSEO = useSelector(seoError);
    return (
        <>
            <section id='seo-tab-container' className='section'>
                <Message success={seoResult.success} errorMessage={seoResult.message} />
                <h2 className='title'>Search Engine Optimization Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["viewport"].title} description={seoResult["viewport"].description} score={seoResult["viewport"].score} displayValue={seoResult["viewport"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["meta-description"].title} description={seoResult["meta-description"].description} score={seoResult["meta-description"].score} displayValue={seoResult["meta-description"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["structured-data"].title} description={seoResult["structured-data"].description} score={seoResult["structured-data"].score} displayValue={seoResult["structured-data"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["document-title"].title} description={seoResult["document-title"].description} score={seoResult["document-title"].score} displayValue={seoResult["document-title"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["http-status-code"].title} description={seoResult["http-status-code"].description} score={seoResult["http-status-code"].score} displayValue={seoResult["http-status-code"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["link-text"].title} description={seoResult["link-text"].description} score={seoResult["link-text"].score} displayValue={seoResult["link-text"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["crawlable-anchors"].title} description={seoResult["crawlable-anchors"].description} score={seoResult["crawlable-anchors"].score} displayValue={seoResult["crawlable-anchors"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["is-crawlable"].title} description={seoResult["is-crawlable"].description} score={seoResult["is-crawlable"].score} displayValue={seoResult["is-crawlable"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["robots-txt"].title} description={seoResult["robots-txt"].description} score={seoResult["robots-txt"].score} displayValue={seoResult["robots-txt"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["image-alt"].title} description={seoResult["image-alt"].description} score={seoResult["image-alt"].score} displayValue={seoResult["image-alt"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["hreflang"].title} description={seoResult["hreflang"].description} score={seoResult["hreflang"].score} displayValue={seoResult["hreflang"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["plugins"].title} description={seoResult["plugins"].description} score={seoResult["plugins"].score} displayValue={seoResult["plugins"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["canonical"].title} description={seoResult["canonical"].description} score={seoResult["canonical"].score} displayValue={seoResult["canonical"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["font-size"].title} description={seoResult["font-size"].description} score={seoResult["font-size"].score} displayValue={seoResult["font-size"].displayValue} />
                    <AuditList loading={loadingSEO} error={errorSEO}  title={seoResult["tap-targets"].title} description={seoResult["tap-targets"].description} score={seoResult["tap-targets"].score} displayValue={seoResult["tap-targets"].displayValue} />
                </List>
            </section>
            <style jsx>
                {`#seo-tab-container {
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

export default SeoTab;

