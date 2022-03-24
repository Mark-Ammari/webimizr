export interface Accessibility {
    "accesskeys": Metadata
    "focus-traps": Metadata
    "aria-meter-name": Metadata
    "td-headers-attr": Metadata
    // "full-page-screenshot": Metadata
    "aria-required-children": Metadata
    "image-alt": Metadata
    "frame-title": Metadata
    "input-image-alt": Metadata
    "label": Metadata
    "aria-hidden-body": Metadata
    "aria-allowed-attr": Metadata
    "video-caption": Metadata
    "aria-input-field-name": Metadata
    "form-field-multiple-labels": Metadata
    "offscreen-content-hidden": Metadata
    "aria-required-parent": Metadata
    "managed-focus": Metadata
    "th-has-data-cells": Metadata
    "aria-tooltip-name": Metadata
    "html-has-lang": Metadata
    "aria-required-attr": Metadata
    "aria-hidden-focus": Metadata
    "focusable-controls": Metadata
    "aria-valid-attr": Metadata
    "html-lang-valid": Metadata
    "object-alt": Metadata
    "aria-command-name": Metadata
    "document-title": Metadata
    "duplicate-id-active": Metadata
    "aria-treeitem-name": Metadata
    "meta-viewport": Metadata
    "interactive-element-affordance": Metadata
    "aria-roles": Metadata
    "use-landmarks": Metadata
    "meta-refresh": Metadata
    "logical-tab-order": Metadata
    "dlitem": Metadata
    "bypass": Metadata
    "custom-controls-roles": Metadata
    "definition-list": Metadata
    "custom-controls-labels": Metadata
    "aria-progressbar-name": Metadata
    "aria-valid-attr-value": Metadata
    "list": Metadata
    "tabindex": Metadata
    "visual-order-follows-dom": Metadata
    "aria-toggle-field-name": Metadata
    "duplicate-id-aria": Metadata
    "button-name": Metadata
    "listitem": Metadata
    "color-contrast": Metadata
    "valid-lang": Metadata
    "heading-order": Metadata
    "link-name": Metadata
    "percentage": string | number | null
    "message": string
    "success": boolean | string
}

export interface Metadata {
    title: string
    description: string
    score: null | number
    displayValue: string | ""
}

