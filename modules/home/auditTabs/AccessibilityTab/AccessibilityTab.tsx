import AuditList from 'components/AuditList';
import List from 'components/List';
import React from 'react';
import { useSelector } from 'react-redux';
import { lighthouseData } from 'store/reducers/lighthouse/lighthouseSlice';

const AccessibilityTab: React.FC = () => {
    const report = useSelector(lighthouseData)

    return (
        <>
            <section id='performance-tab-container' className='section'>
                <h2 className='title'>Accessibility Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={report["aria-required-attr"].title} description={report["aria-required-attr"].description} score={report["aria-required-attr"].score} displayValue={report["aria-required-attr"].displayValue} />
                    <AuditList title={report["logical-tab-order"].title} description={report["logical-tab-order"].description} score={report["logical-tab-order"].score} displayValue={report["logical-tab-order"].displayValue} />
                    <AuditList title={report["focusable-controls"].title} description={report["focusable-controls"].description} score={report["focusable-controls"].score} displayValue={report["focusable-controls"].displayValue} />
                    <AuditList title={report["interactive-element-affordance"].title} description={report["interactive-element-affordance"].description} score={report["interactive-element-affordance"].score} displayValue={report["interactive-element-affordance"].displayValue} />
                    <AuditList title={report["managed-focus"].title} description={report["managed-focus"].description} score={report["managed-focus"].score} displayValue={report["managed-focus"].displayValue} />
                    <AuditList title={report["focus-traps"].title} description={report["focus-traps"].description} score={report["focus-traps"].score} displayValue={report["focus-traps"].displayValue} />
                    <AuditList title={report["custom-controls-labels"].title} description={report["custom-controls-labels"].description} score={report["custom-controls-labels"].score} displayValue={report["custom-controls-labels"].displayValue} />
                    <AuditList title={report["custom-controls-roles"].title} description={report["custom-controls-roles"].description} score={report["custom-controls-roles"].score} displayValue={report["custom-controls-roles"].displayValue} />
                    <AuditList title={report["visual-order-follows-dom"].title} description={report["visual-order-follows-dom"].description} score={report["visual-order-follows-dom"].score} displayValue={report["visual-order-follows-dom"].displayValue} />
                    <AuditList title={report["offscreen-content-hidden"].title} description={report["offscreen-content-hidden"].description} score={report["offscreen-content-hidden"].score} displayValue={report["offscreen-content-hidden"].displayValue} />
                    <AuditList title={report["use-landmarks"].title} description={report["use-landmarks"].description} score={report["use-landmarks"].score} displayValue={report["use-landmarks"].displayValue} />
                    <AuditList title={report["aria-allowed-attr"].title} description={report["aria-allowed-attr"].description} score={report["aria-allowed-attr"].score} displayValue={report["aria-allowed-attr"].displayValue} />
                    <AuditList title={report["aria-hidden-body"].title} description={report["aria-hidden-body"].description} score={report["aria-hidden-body"].score} displayValue={report["aria-hidden-body"].displayValue} />
                    <AuditList title={report["aria-required-children"].title} description={report["aria-required-children"].description} score={report["aria-required-children"].score} displayValue={report["aria-required-children"].displayValue} />
                    <AuditList title={report["aria-roles"].title} description={report["aria-roles"].description} score={report["aria-roles"].score} displayValue={report["aria-roles"].displayValue} />
                    <AuditList title={report["aria-valid-attr-value"].title} description={report["aria-valid-attr-value"].description} score={report["aria-valid-attr-value"].score} displayValue={report["aria-valid-attr-value"].displayValue} />
                    <AuditList title={report["aria-valid-attr"].title} description={report["aria-valid-attr"].description} score={report["aria-valid-attr"].score} displayValue={report["aria-valid-attr"].displayValue} />
                    <AuditList title={report["button-name"].title} description={report["button-name"].description} score={report["button-name"].score} displayValue={report["button-name"].displayValue} />
                    <AuditList title={report["duplicate-id-aria"].title} description={report["duplicate-id-aria"].description} score={report["duplicate-id-aria"].score} displayValue={report["duplicate-id-aria"].displayValue} />
                    <AuditList title={report["image-alt"].title} description={report["image-alt"].description} score={report["image-alt"].score} displayValue={report["image-alt"].displayValue} />
                    <AuditList title={report["label"].title} description={report["label"].description} score={report["label"].score} displayValue={report["label"].displayValue} />
                    <AuditList title={report["aria-command-name"].title} description={report["aria-command-name"].description} score={report["aria-command-name"].score} displayValue={report["aria-command-name"].displayValue} />
                    <AuditList title={report["bypass"].title} description={report["bypass"].description} score={report["bypass"].score} displayValue={report["bypass"].displayValue} />
                    <AuditList title={report["color-contrast"].title} description={report["color-contrast"].description} score={report["color-contrast"].score} displayValue={report["color-contrast"].displayValue} />
                    <AuditList title={report["document-title"].title} description={report["document-title"].description} score={report["document-title"].score} displayValue={report["document-title"].displayValue} />
                    <AuditList title={report["duplicate-id-active"].title} description={report["duplicate-id-active"].description} score={report["duplicate-id-active"].score} displayValue={report["duplicate-id-active"].displayValue} />
                    <AuditList title={report["html-has-lang"].title} description={report["html-has-lang"].description} score={report["html-has-lang"].score} displayValue={report["html-has-lang"].displayValue} />
                    <AuditList title={report["html-lang-valid"].title} description={report["html-lang-valid"].description} score={report["html-lang-valid"].score} displayValue={report["html-lang-valid"].displayValue} />
                    <AuditList title={report["link-name"].title} description={report["link-name"].description} score={report["link-name"].score} displayValue={report["link-name"].displayValue} />
                    <AuditList title={report["tabindex"].title} description={report["tabindex"].description} score={report["tabindex"].score} displayValue={report["tabindex"].displayValue} />
                    <AuditList title={report["accesskeys"].title} description={report["accesskeys"].description} score={report["accesskeys"].score} displayValue={report["accesskeys"].displayValue} />
                    <AuditList title={report["aria-hidden-focus"].title} description={report["aria-hidden-focus"].description} score={report["aria-hidden-focus"].score} displayValue={report["aria-hidden-focus"].displayValue} />
                    <AuditList title={report["aria-input-field-name"].title} description={report["aria-input-field-name"].description} score={report["aria-input-field-name"].score} displayValue={report["aria-input-field-name"].displayValue} />
                    <AuditList title={report["aria-meter-name"].title} description={report["aria-meter-name"].description} score={report["aria-meter-name"].score} displayValue={report["aria-meter-name"].displayValue} />
                    <AuditList title={report["aria-progressbar-name"].title} description={report["aria-progressbar-name"].description} score={report["aria-progressbar-name"].score} displayValue={report["aria-progressbar-name"].displayValue} />
                    <AuditList title={report["aria-required-parent"].title} description={report["aria-required-parent"].description} score={report["aria-required-parent"].score} displayValue={report["aria-required-parent"].displayValue} />
                    <AuditList title={report["aria-toggle-field-name"].title} description={report["aria-toggle-field-name"].description} score={report["aria-toggle-field-name"].score} displayValue={report["aria-toggle-field-name"].displayValue} />
                    <AuditList title={report["aria-tooltip-name"].title} description={report["aria-tooltip-name"].description} score={report["aria-tooltip-name"].score} displayValue={report["aria-tooltip-name"].displayValue} />
                    <AuditList title={report["aria-treeitem-name"].title} description={report["aria-treeitem-name"].description} score={report["aria-treeitem-name"].score} displayValue={report["aria-treeitem-name"].displayValue} />
                    <AuditList title={report["definition-list"].title} description={report["definition-list"].description} score={report["definition-list"].score} displayValue={report["definition-list"].displayValue} />
                    <AuditList title={report["dlitem"].title} description={report["dlitem"].description} score={report["dlitem"].score} displayValue={report["dlitem"].displayValue} />
                    <AuditList title={report["form-field-multiple-labels"].title} description={report["form-field-multiple-labels"].description} score={report["form-field-multiple-labels"].score} displayValue={report["form-field-multiple-labels"].displayValue} />
                    <AuditList title={report["frame-title"].title} description={report["frame-title"].description} score={report["frame-title"].score} displayValue={report["frame-title"].displayValue} />
                    <AuditList title={report["heading-order"].title} description={report["heading-order"].description} score={report["heading-order"].score} displayValue={report["heading-order"].displayValue} />
                    <AuditList title={report["input-image-alt"].title} description={report["input-image-alt"].description} score={report["input-image-alt"].score} displayValue={report["input-image-alt"].displayValue} />
                    <AuditList title={report["list"].title} description={report["list"].description} score={report["list"].score} displayValue={report["list"].displayValue} />
                    <AuditList title={report["listitem"].title} description={report["listitem"].description} score={report["listitem"].score} displayValue={report["listitem"].displayValue} />
                    <AuditList title={report["meta-refresh"].title} description={report["meta-refresh"].description} score={report["meta-refresh"].score} displayValue={report["meta-refresh"].displayValue} />
                    <AuditList title={report["meta-viewport"].title} description={report["meta-viewport"].description} score={report["meta-viewport"].score} displayValue={report["meta-viewport"].displayValue} />
                    <AuditList title={report["object-alt"].title} description={report["object-alt"].description} score={report["object-alt"].score} displayValue={report["object-alt"].displayValue} />
                    <AuditList title={report["td-headers-attr"].title} description={report["td-headers-attr"].description} score={report["td-headers-attr"].score} displayValue={report["td-headers-attr"].displayValue} />
                    <AuditList title={report["th-has-data-cells"].title} description={report["th-has-data-cells"].description} score={report["th-has-data-cells"].score} displayValue={report["th-has-data-cells"].displayValue} />
                    <AuditList title={report["valid-lang"].title} description={report["doctype"].description} score={report["doctype"].score} displayValue={report["doctype"].displayValue} />
                    <AuditList title={report["video-caption"].title} description={report["charset"].description} score={report["charset"].score} displayValue={report["charset"].displayValue} />
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

export default AccessibilityTab;

