import AuditList from 'components/AuditList';
import List from 'components/List';
import Message from 'components/Message';
import React from 'react';
import { useSelector } from 'react-redux';
import { accessibilityData } from 'store/reducers/lighthouse/accessibilitySlice';

const AccessibilityTab: React.FC = () => {
    const accessibilityResult = useSelector(accessibilityData)

    return (
        <>
            <section id='accessibility-tab-container' className='section'>
                <Message success={accessibilityResult.success} errorMessage={accessibilityResult.message} />
                <h2 className='title'>Accessibility Audit</h2>
                <List padding='var(--verticalSpacing) 0'>
                    <AuditList title={accessibilityResult["aria-required-attr"].title} description={accessibilityResult["aria-required-attr"].description} score={accessibilityResult["aria-required-attr"].score} displayValue={accessibilityResult["aria-required-attr"].displayValue} />
                    <AuditList title={accessibilityResult["logical-tab-order"].title} description={accessibilityResult["logical-tab-order"].description} score={accessibilityResult["logical-tab-order"].score} displayValue={accessibilityResult["logical-tab-order"].displayValue} />
                    <AuditList title={accessibilityResult["focusable-controls"].title} description={accessibilityResult["focusable-controls"].description} score={accessibilityResult["focusable-controls"].score} displayValue={accessibilityResult["focusable-controls"].displayValue} />
                    <AuditList title={accessibilityResult["interactive-element-affordance"].title} description={accessibilityResult["interactive-element-affordance"].description} score={accessibilityResult["interactive-element-affordance"].score} displayValue={accessibilityResult["interactive-element-affordance"].displayValue} />
                    <AuditList title={accessibilityResult["managed-focus"].title} description={accessibilityResult["managed-focus"].description} score={accessibilityResult["managed-focus"].score} displayValue={accessibilityResult["managed-focus"].displayValue} />
                    <AuditList title={accessibilityResult["focus-traps"].title} description={accessibilityResult["focus-traps"].description} score={accessibilityResult["focus-traps"].score} displayValue={accessibilityResult["focus-traps"].displayValue} />
                    <AuditList title={accessibilityResult["custom-controls-labels"].title} description={accessibilityResult["custom-controls-labels"].description} score={accessibilityResult["custom-controls-labels"].score} displayValue={accessibilityResult["custom-controls-labels"].displayValue} />
                    <AuditList title={accessibilityResult["custom-controls-roles"].title} description={accessibilityResult["custom-controls-roles"].description} score={accessibilityResult["custom-controls-roles"].score} displayValue={accessibilityResult["custom-controls-roles"].displayValue} />
                    <AuditList title={accessibilityResult["visual-order-follows-dom"].title} description={accessibilityResult["visual-order-follows-dom"].description} score={accessibilityResult["visual-order-follows-dom"].score} displayValue={accessibilityResult["visual-order-follows-dom"].displayValue} />
                    <AuditList title={accessibilityResult["offscreen-content-hidden"].title} description={accessibilityResult["offscreen-content-hidden"].description} score={accessibilityResult["offscreen-content-hidden"].score} displayValue={accessibilityResult["offscreen-content-hidden"].displayValue} />
                    <AuditList title={accessibilityResult["use-landmarks"].title} description={accessibilityResult["use-landmarks"].description} score={accessibilityResult["use-landmarks"].score} displayValue={accessibilityResult["use-landmarks"].displayValue} />
                    <AuditList title={accessibilityResult["aria-allowed-attr"].title} description={accessibilityResult["aria-allowed-attr"].description} score={accessibilityResult["aria-allowed-attr"].score} displayValue={accessibilityResult["aria-allowed-attr"].displayValue} />
                    <AuditList title={accessibilityResult["aria-hidden-body"].title} description={accessibilityResult["aria-hidden-body"].description} score={accessibilityResult["aria-hidden-body"].score} displayValue={accessibilityResult["aria-hidden-body"].displayValue} />
                    <AuditList title={accessibilityResult["aria-required-children"].title} description={accessibilityResult["aria-required-children"].description} score={accessibilityResult["aria-required-children"].score} displayValue={accessibilityResult["aria-required-children"].displayValue} />
                    <AuditList title={accessibilityResult["aria-roles"].title} description={accessibilityResult["aria-roles"].description} score={accessibilityResult["aria-roles"].score} displayValue={accessibilityResult["aria-roles"].displayValue} />
                    <AuditList title={accessibilityResult["aria-valid-attr-value"].title} description={accessibilityResult["aria-valid-attr-value"].description} score={accessibilityResult["aria-valid-attr-value"].score} displayValue={accessibilityResult["aria-valid-attr-value"].displayValue} />
                    <AuditList title={accessibilityResult["aria-valid-attr"].title} description={accessibilityResult["aria-valid-attr"].description} score={accessibilityResult["aria-valid-attr"].score} displayValue={accessibilityResult["aria-valid-attr"].displayValue} />
                    <AuditList title={accessibilityResult["button-name"].title} description={accessibilityResult["button-name"].description} score={accessibilityResult["button-name"].score} displayValue={accessibilityResult["button-name"].displayValue} />
                    <AuditList title={accessibilityResult["duplicate-id-aria"].title} description={accessibilityResult["duplicate-id-aria"].description} score={accessibilityResult["duplicate-id-aria"].score} displayValue={accessibilityResult["duplicate-id-aria"].displayValue} />
                    <AuditList title={accessibilityResult["image-alt"].title} description={accessibilityResult["image-alt"].description} score={accessibilityResult["image-alt"].score} displayValue={accessibilityResult["image-alt"].displayValue} />
                    <AuditList title={accessibilityResult["label"].title} description={accessibilityResult["label"].description} score={accessibilityResult["label"].score} displayValue={accessibilityResult["label"].displayValue} />
                    <AuditList title={accessibilityResult["aria-command-name"].title} description={accessibilityResult["aria-command-name"].description} score={accessibilityResult["aria-command-name"].score} displayValue={accessibilityResult["aria-command-name"].displayValue} />
                    <AuditList title={accessibilityResult["bypass"].title} description={accessibilityResult["bypass"].description} score={accessibilityResult["bypass"].score} displayValue={accessibilityResult["bypass"].displayValue} />
                    <AuditList title={accessibilityResult["color-contrast"].title} description={accessibilityResult["color-contrast"].description} score={accessibilityResult["color-contrast"].score} displayValue={accessibilityResult["color-contrast"].displayValue} />
                    <AuditList title={accessibilityResult["document-title"].title} description={accessibilityResult["document-title"].description} score={accessibilityResult["document-title"].score} displayValue={accessibilityResult["document-title"].displayValue} />
                    <AuditList title={accessibilityResult["duplicate-id-active"].title} description={accessibilityResult["duplicate-id-active"].description} score={accessibilityResult["duplicate-id-active"].score} displayValue={accessibilityResult["duplicate-id-active"].displayValue} />
                    <AuditList title={accessibilityResult["html-has-lang"].title} description={accessibilityResult["html-has-lang"].description} score={accessibilityResult["html-has-lang"].score} displayValue={accessibilityResult["html-has-lang"].displayValue} />
                    <AuditList title={accessibilityResult["html-lang-valid"].title} description={accessibilityResult["html-lang-valid"].description} score={accessibilityResult["html-lang-valid"].score} displayValue={accessibilityResult["html-lang-valid"].displayValue} />
                    <AuditList title={accessibilityResult["link-name"].title} description={accessibilityResult["link-name"].description} score={accessibilityResult["link-name"].score} displayValue={accessibilityResult["link-name"].displayValue} />
                    <AuditList title={accessibilityResult["tabindex"].title} description={accessibilityResult["tabindex"].description} score={accessibilityResult["tabindex"].score} displayValue={accessibilityResult["tabindex"].displayValue} />
                    <AuditList title={accessibilityResult["accesskeys"].title} description={accessibilityResult["accesskeys"].description} score={accessibilityResult["accesskeys"].score} displayValue={accessibilityResult["accesskeys"].displayValue} />
                    <AuditList title={accessibilityResult["aria-hidden-focus"].title} description={accessibilityResult["aria-hidden-focus"].description} score={accessibilityResult["aria-hidden-focus"].score} displayValue={accessibilityResult["aria-hidden-focus"].displayValue} />
                    <AuditList title={accessibilityResult["aria-input-field-name"].title} description={accessibilityResult["aria-input-field-name"].description} score={accessibilityResult["aria-input-field-name"].score} displayValue={accessibilityResult["aria-input-field-name"].displayValue} />
                    <AuditList title={accessibilityResult["aria-meter-name"].title} description={accessibilityResult["aria-meter-name"].description} score={accessibilityResult["aria-meter-name"].score} displayValue={accessibilityResult["aria-meter-name"].displayValue} />
                    <AuditList title={accessibilityResult["aria-progressbar-name"].title} description={accessibilityResult["aria-progressbar-name"].description} score={accessibilityResult["aria-progressbar-name"].score} displayValue={accessibilityResult["aria-progressbar-name"].displayValue} />
                    <AuditList title={accessibilityResult["aria-required-parent"].title} description={accessibilityResult["aria-required-parent"].description} score={accessibilityResult["aria-required-parent"].score} displayValue={accessibilityResult["aria-required-parent"].displayValue} />
                    <AuditList title={accessibilityResult["aria-toggle-field-name"].title} description={accessibilityResult["aria-toggle-field-name"].description} score={accessibilityResult["aria-toggle-field-name"].score} displayValue={accessibilityResult["aria-toggle-field-name"].displayValue} />
                    <AuditList title={accessibilityResult["aria-tooltip-name"].title} description={accessibilityResult["aria-tooltip-name"].description} score={accessibilityResult["aria-tooltip-name"].score} displayValue={accessibilityResult["aria-tooltip-name"].displayValue} />
                    <AuditList title={accessibilityResult["aria-treeitem-name"].title} description={accessibilityResult["aria-treeitem-name"].description} score={accessibilityResult["aria-treeitem-name"].score} displayValue={accessibilityResult["aria-treeitem-name"].displayValue} />
                    <AuditList title={accessibilityResult["definition-list"].title} description={accessibilityResult["definition-list"].description} score={accessibilityResult["definition-list"].score} displayValue={accessibilityResult["definition-list"].displayValue} />
                    <AuditList title={accessibilityResult["dlitem"].title} description={accessibilityResult["dlitem"].description} score={accessibilityResult["dlitem"].score} displayValue={accessibilityResult["dlitem"].displayValue} />
                    <AuditList title={accessibilityResult["form-field-multiple-labels"].title} description={accessibilityResult["form-field-multiple-labels"].description} score={accessibilityResult["form-field-multiple-labels"].score} displayValue={accessibilityResult["form-field-multiple-labels"].displayValue} />
                    <AuditList title={accessibilityResult["frame-title"].title} description={accessibilityResult["frame-title"].description} score={accessibilityResult["frame-title"].score} displayValue={accessibilityResult["frame-title"].displayValue} />
                    <AuditList title={accessibilityResult["heading-order"].title} description={accessibilityResult["heading-order"].description} score={accessibilityResult["heading-order"].score} displayValue={accessibilityResult["heading-order"].displayValue} />
                    <AuditList title={accessibilityResult["input-image-alt"].title} description={accessibilityResult["input-image-alt"].description} score={accessibilityResult["input-image-alt"].score} displayValue={accessibilityResult["input-image-alt"].displayValue} />
                    <AuditList title={accessibilityResult["list"].title} description={accessibilityResult["list"].description} score={accessibilityResult["list"].score} displayValue={accessibilityResult["list"].displayValue} />
                    <AuditList title={accessibilityResult["listitem"].title} description={accessibilityResult["listitem"].description} score={accessibilityResult["listitem"].score} displayValue={accessibilityResult["listitem"].displayValue} />
                    <AuditList title={accessibilityResult["meta-refresh"].title} description={accessibilityResult["meta-refresh"].description} score={accessibilityResult["meta-refresh"].score} displayValue={accessibilityResult["meta-refresh"].displayValue} />
                    <AuditList title={accessibilityResult["meta-viewport"].title} description={accessibilityResult["meta-viewport"].description} score={accessibilityResult["meta-viewport"].score} displayValue={accessibilityResult["meta-viewport"].displayValue} />
                    <AuditList title={accessibilityResult["object-alt"].title} description={accessibilityResult["object-alt"].description} score={accessibilityResult["object-alt"].score} displayValue={accessibilityResult["object-alt"].displayValue} />
                    <AuditList title={accessibilityResult["td-headers-attr"].title} description={accessibilityResult["td-headers-attr"].description} score={accessibilityResult["td-headers-attr"].score} displayValue={accessibilityResult["td-headers-attr"].displayValue} />
                    <AuditList title={accessibilityResult["th-has-data-cells"].title} description={accessibilityResult["th-has-data-cells"].description} score={accessibilityResult["th-has-data-cells"].score} displayValue={accessibilityResult["th-has-data-cells"].displayValue} />
                </List>
            </section>
            <style jsx>
                {`#accessibility-tab-container {
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

export default AccessibilityTab;

