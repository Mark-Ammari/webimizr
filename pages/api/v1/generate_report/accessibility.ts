import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Accessibility } from 'types/accessibility';

const accessibilityAPI = async (req: NextApiRequest, res: NextApiResponse<Accessibility>) => {
    return await Promise.race([
        axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&category=ACCESSIBILITY&strategy=${req.query.emulation || "DESKTOP"}&key=AIzaSyDEQGPuT8i2JOn0NAwZUVcVTEGK_LLQ14A`),
        new Promise((_, reject) => {
            const requestTimeout = setTimeout(() => {
                clearTimeout(requestTimeout);
                reject(new Error("Request Timeout"))
            }, 29000)
        })
    ]).then((response: any) => {
        const data = response.data
        res.status(200).send({
            "accesskeys": {
                title: data["lighthouseResult"]["audits"]["accesskeys"]["title"],
                description: data["lighthouseResult"]["audits"]["accesskeys"]["description"],
                score: data["lighthouseResult"]["audits"]["accesskeys"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["accesskeys"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["accesskeys"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["accesskeys"]["displayValue"] || ""
            },
            "focus-traps": {
                title: data["lighthouseResult"]["audits"]["focus-traps"]["title"],
                description: data["lighthouseResult"]["audits"]["focus-traps"]["description"],
                score: data["lighthouseResult"]["audits"]["focus-traps"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["focus-traps"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["focus-traps"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["focus-traps"]["displayValue"] || ""
            },
            "aria-meter-name": {
                title: data["lighthouseResult"]["audits"]["aria-meter-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-meter-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-meter-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-meter-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-meter-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-meter-name"]["displayValue"] || ""
            },
            "td-headers-attr": {
                title: data["lighthouseResult"]["audits"]["td-headers-attr"]["title"],
                description: data["lighthouseResult"]["audits"]["td-headers-attr"]["description"],
                score: data["lighthouseResult"]["audits"]["td-headers-attr"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["td-headers-attr"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["td-headers-attr"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["td-headers-attr"]["displayValue"] || ""
            },
            "aria-required-children": {
                title: data["lighthouseResult"]["audits"]["aria-required-children"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-required-children"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-required-children"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-required-children"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-required-children"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-required-children"]["displayValue"] || ""
            },
            "image-alt": {
                title: data["lighthouseResult"]["audits"]["image-alt"]["title"],
                description: data["lighthouseResult"]["audits"]["image-alt"]["description"],
                score: data["lighthouseResult"]["audits"]["image-alt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["image-alt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["image-alt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["image-alt"]["displayValue"] || ""
            },
            "frame-title": {
                title: data["lighthouseResult"]["audits"]["frame-title"]["title"],
                description: data["lighthouseResult"]["audits"]["frame-title"]["description"],
                score: data["lighthouseResult"]["audits"]["frame-title"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["frame-title"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["frame-title"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["frame-title"]["displayValue"] || ""
            },
            "input-image-alt": {
                title: data["lighthouseResult"]["audits"]["input-image-alt"]["title"],
                description: data["lighthouseResult"]["audits"]["input-image-alt"]["description"],
                score: data["lighthouseResult"]["audits"]["input-image-alt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["input-image-alt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["input-image-alt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["input-image-alt"]["displayValue"] || ""
            },
            "label": {
                title: data["lighthouseResult"]["audits"]["label"]["title"],
                description: data["lighthouseResult"]["audits"]["label"]["description"],
                score: data["lighthouseResult"]["audits"]["label"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["label"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["label"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["label"]["displayValue"] || ""
            },
            "aria-hidden-body": {
                title: data["lighthouseResult"]["audits"]["aria-hidden-body"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-hidden-body"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-hidden-body"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-hidden-body"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-hidden-body"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-hidden-body"]["displayValue"] || ""
            },
            "aria-allowed-attr": {
                title: data["lighthouseResult"]["audits"]["aria-allowed-attr"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-allowed-attr"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-allowed-attr"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-allowed-attr"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-allowed-attr"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-allowed-attr"]["displayValue"] || ""
            },
            "video-caption": {
                title: data["lighthouseResult"]["audits"]["video-caption"]["title"],
                description: data["lighthouseResult"]["audits"]["video-caption"]["description"],
                score: data["lighthouseResult"]["audits"]["video-caption"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["video-caption"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["video-caption"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["video-caption"]["displayValue"] || ""
            },
            "aria-input-field-name": {
                title: data["lighthouseResult"]["audits"]["aria-input-field-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-input-field-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-input-field-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-input-field-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-input-field-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-input-field-name"]["displayValue"] || ""
            },
            "form-field-multiple-labels": {
                title: data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["title"],
                description: data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["description"],
                score: data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["form-field-multiple-labels"]["displayValue"] || ""
            },
            "offscreen-content-hidden": {
                title: data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["title"],
                description: data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["description"],
                score: data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["offscreen-content-hidden"]["displayValue"] || ""
            },
            "aria-required-parent": {
                title: data["lighthouseResult"]["audits"]["aria-required-parent"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-required-parent"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-required-parent"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-required-parent"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-required-parent"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-required-parent"]["displayValue"] || ""
            },
            "managed-focus": {
                title: data["lighthouseResult"]["audits"]["managed-focus"]["title"],
                description: data["lighthouseResult"]["audits"]["managed-focus"]["description"],
                score: data["lighthouseResult"]["audits"]["managed-focus"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["managed-focus"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["managed-focus"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["managed-focus"]["displayValue"] || ""
            },
            "th-has-data-cells": {
                title: data["lighthouseResult"]["audits"]["th-has-data-cells"]["title"],
                description: data["lighthouseResult"]["audits"]["th-has-data-cells"]["description"],
                score: data["lighthouseResult"]["audits"]["th-has-data-cells"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["th-has-data-cells"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["th-has-data-cells"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["th-has-data-cells"]["displayValue"] || ""
            },
            "aria-tooltip-name": {
                title: data["lighthouseResult"]["audits"]["aria-tooltip-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-tooltip-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-tooltip-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-tooltip-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-tooltip-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-tooltip-name"]["displayValue"] || ""
            },
            "html-has-lang": {
                title: data["lighthouseResult"]["audits"]["html-has-lang"]["title"],
                description: data["lighthouseResult"]["audits"]["html-has-lang"]["description"],
                score: data["lighthouseResult"]["audits"]["html-has-lang"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["html-has-lang"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["html-has-lang"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["html-has-lang"]["displayValue"] || ""
            },
            "aria-required-attr": {
                title: data["lighthouseResult"]["audits"]["aria-required-attr"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-required-attr"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-required-attr"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-required-attr"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-required-attr"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-required-attr"]["displayValue"] || ""
            },
            "aria-hidden-focus": {
                title: data["lighthouseResult"]["audits"]["aria-hidden-focus"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-hidden-focus"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-hidden-focus"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-hidden-focus"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-hidden-focus"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-hidden-focus"]["displayValue"] || ""
            },
            "focusable-controls": {
                title: data["lighthouseResult"]["audits"]["focusable-controls"]["title"],
                description: data["lighthouseResult"]["audits"]["focusable-controls"]["description"],
                score: data["lighthouseResult"]["audits"]["focusable-controls"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["focusable-controls"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["focusable-controls"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["focusable-controls"]["displayValue"] || ""
            },
            "aria-valid-attr": {
                title: data["lighthouseResult"]["audits"]["aria-valid-attr"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-valid-attr"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-valid-attr"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-valid-attr"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-valid-attr"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-valid-attr"]["displayValue"] || ""
            },
            "html-lang-valid": {
                title: data["lighthouseResult"]["audits"]["html-lang-valid"]["title"],
                description: data["lighthouseResult"]["audits"]["html-lang-valid"]["description"],
                score: data["lighthouseResult"]["audits"]["html-lang-valid"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["html-lang-valid"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["html-lang-valid"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["html-lang-valid"]["displayValue"] || ""
            },
            "object-alt": {
                title: data["lighthouseResult"]["audits"]["object-alt"]["title"],
                description: data["lighthouseResult"]["audits"]["object-alt"]["description"],
                score: data["lighthouseResult"]["audits"]["object-alt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["object-alt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["object-alt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["object-alt"]["displayValue"] || ""
            },
            "document-title": {
                title: data["lighthouseResult"]["audits"]["document-title"]["title"],
                description: data["lighthouseResult"]["audits"]["document-title"]["description"],
                score: data["lighthouseResult"]["audits"]["document-title"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["document-title"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["document-title"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["document-title"]["displayValue"] || ""
            },
            "duplicate-id-active": {
                title: data["lighthouseResult"]["audits"]["duplicate-id-active"]["title"],
                description: data["lighthouseResult"]["audits"]["duplicate-id-active"]["description"],
                score: data["lighthouseResult"]["audits"]["duplicate-id-active"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["duplicate-id-active"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["duplicate-id-active"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["duplicate-id-active"]["displayValue"] || ""
            },
            "aria-treeitem-name": {
                title: data["lighthouseResult"]["audits"]["aria-treeitem-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-treeitem-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-treeitem-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-treeitem-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-treeitem-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-treeitem-name"]["displayValue"] || ""
            },
            "meta-viewport": {
                title: data["lighthouseResult"]["audits"]["meta-viewport"]["title"],
                description: data["lighthouseResult"]["audits"]["meta-viewport"]["description"],
                score: data["lighthouseResult"]["audits"]["meta-viewport"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["meta-viewport"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["meta-viewport"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["meta-viewport"]["displayValue"] || ""
            },
            "interactive-element-affordance": {
                title: data["lighthouseResult"]["audits"]["interactive-element-affordance"]["title"],
                description: data["lighthouseResult"]["audits"]["interactive-element-affordance"]["description"],
                score: data["lighthouseResult"]["audits"]["interactive-element-affordance"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["interactive-element-affordance"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["interactive-element-affordance"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["interactive-element-affordance"]["displayValue"] || ""
            },
            "aria-roles": {
                title: data["lighthouseResult"]["audits"]["aria-roles"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-roles"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-roles"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-roles"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-roles"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-roles"]["displayValue"] || ""
            },
            "use-landmarks": {
                title: data["lighthouseResult"]["audits"]["use-landmarks"]["title"],
                description: data["lighthouseResult"]["audits"]["use-landmarks"]["description"],
                score: data["lighthouseResult"]["audits"]["use-landmarks"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["use-landmarks"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["use-landmarks"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["use-landmarks"]["displayValue"] || ""
            },
            "meta-refresh": {
                title: data["lighthouseResult"]["audits"]["meta-refresh"]["title"],
                description: data["lighthouseResult"]["audits"]["meta-refresh"]["description"],
                score: data["lighthouseResult"]["audits"]["meta-refresh"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["meta-refresh"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["meta-refresh"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["meta-refresh"]["displayValue"] || ""
            },
            "logical-tab-order": {
                title: data["lighthouseResult"]["audits"]["logical-tab-order"]["title"],
                description: data["lighthouseResult"]["audits"]["logical-tab-order"]["description"],
                score: data["lighthouseResult"]["audits"]["logical-tab-order"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["logical-tab-order"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["logical-tab-order"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["logical-tab-order"]["displayValue"] || ""
            },
            "dlitem": {
                title: data["lighthouseResult"]["audits"]["dlitem"]["title"],
                description: data["lighthouseResult"]["audits"]["dlitem"]["description"],
                score: data["lighthouseResult"]["audits"]["dlitem"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["dlitem"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["dlitem"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["dlitem"]["displayValue"] || ""
            },
            "bypass": {
                title: data["lighthouseResult"]["audits"]["bypass"]["title"],
                description: data["lighthouseResult"]["audits"]["bypass"]["description"],
                score: data["lighthouseResult"]["audits"]["bypass"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["bypass"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["bypass"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["bypass"]["displayValue"] || ""
            },
            "custom-controls-roles": {
                title: data["lighthouseResult"]["audits"]["custom-controls-roles"]["title"],
                description: data["lighthouseResult"]["audits"]["custom-controls-roles"]["description"],
                score: data["lighthouseResult"]["audits"]["custom-controls-roles"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["custom-controls-roles"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["custom-controls-roles"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["custom-controls-roles"]["displayValue"] || ""
            },
            "definition-list": {
                title: data["lighthouseResult"]["audits"]["definition-list"]["title"],
                description: data["lighthouseResult"]["audits"]["definition-list"]["description"],
                score: data["lighthouseResult"]["audits"]["definition-list"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["definition-list"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["definition-list"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["definition-list"]["displayValue"] || ""
            },
            "custom-controls-labels": {
                title: data["lighthouseResult"]["audits"]["custom-controls-labels"]["title"],
                description: data["lighthouseResult"]["audits"]["custom-controls-labels"]["description"],
                score: data["lighthouseResult"]["audits"]["custom-controls-labels"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["custom-controls-labels"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["custom-controls-labels"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["custom-controls-labels"]["displayValue"] || ""
            },
            "aria-progressbar-name": {
                title: data["lighthouseResult"]["audits"]["aria-progressbar-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-progressbar-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-progressbar-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-progressbar-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-progressbar-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-progressbar-name"]["displayValue"] || ""
            },
            "aria-valid-attr-value": {
                title: data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-valid-attr-value"]["displayValue"] || ""
            },
            "list": {
                title: data["lighthouseResult"]["audits"]["list"]["title"],
                description: data["lighthouseResult"]["audits"]["list"]["description"],
                score: data["lighthouseResult"]["audits"]["list"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["list"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["list"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["list"]["displayValue"] || ""
            },
            "tabindex": {
                title: data["lighthouseResult"]["audits"]["tabindex"]["title"],
                description: data["lighthouseResult"]["audits"]["tabindex"]["description"],
                score: data["lighthouseResult"]["audits"]["tabindex"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["tabindex"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["tabindex"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["tabindex"]["displayValue"] || ""
            },
            "visual-order-follows-dom": {
                title: data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["title"],
                description: data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["description"],
                score: data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["visual-order-follows-dom"]["displayValue"] || ""
            },
            "aria-toggle-field-name": {
                title: data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-toggle-field-name"]["displayValue"] || ""
            },
            "duplicate-id-aria": {
                title: data["lighthouseResult"]["audits"]["duplicate-id-aria"]["title"],
                description: data["lighthouseResult"]["audits"]["duplicate-id-aria"]["description"],
                score: data["lighthouseResult"]["audits"]["duplicate-id-aria"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["duplicate-id-aria"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["duplicate-id-aria"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["duplicate-id-aria"]["displayValue"] || ""
            },
            "button-name": {
                title: data["lighthouseResult"]["audits"]["button-name"]["title"],
                description: data["lighthouseResult"]["audits"]["button-name"]["description"],
                score: data["lighthouseResult"]["audits"]["button-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["button-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["button-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["button-name"]["displayValue"] || ""
            },
            "listitem": {
                title: data["lighthouseResult"]["audits"]["listitem"]["title"],
                description: data["lighthouseResult"]["audits"]["listitem"]["description"],
                score: data["lighthouseResult"]["audits"]["listitem"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["listitem"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["listitem"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["listitem"]["displayValue"] || ""
            },
            "color-contrast": {
                title: data["lighthouseResult"]["audits"]["color-contrast"]["title"],
                description: data["lighthouseResult"]["audits"]["color-contrast"]["description"],
                score: data["lighthouseResult"]["audits"]["color-contrast"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["color-contrast"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["color-contrast"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["color-contrast"]["displayValue"] || ""
            },
            "valid-lang": {
                title: data["lighthouseResult"]["audits"]["valid-lang"]["title"],
                description: data["lighthouseResult"]["audits"]["valid-lang"]["description"],
                score: data["lighthouseResult"]["audits"]["valid-lang"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["valid-lang"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["valid-lang"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["valid-lang"]["displayValue"] || ""
            },
            "heading-order": {
                title: data["lighthouseResult"]["audits"]["heading-order"]["title"],
                description: data["lighthouseResult"]["audits"]["heading-order"]["description"],
                score: data["lighthouseResult"]["audits"]["heading-order"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["heading-order"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["heading-order"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["heading-order"]["displayValue"] || ""
            },
            "link-name": {
                title: data["lighthouseResult"]["audits"]["link-name"]["title"],
                description: data["lighthouseResult"]["audits"]["link-name"]["description"],
                score: data["lighthouseResult"]["audits"]["link-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["link-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["link-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["link-name"]["displayValue"] || ""
            },
            "aria-command-name": {
                title: data["lighthouseResult"]["audits"]["aria-command-name"]["title"],
                description: data["lighthouseResult"]["audits"]["aria-command-name"]["description"],
                score: data["lighthouseResult"]["audits"]["aria-command-name"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["aria-command-name"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["aria-command-name"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["aria-command-name"]["displayValue"] || ""
            },
            percentage: (data["lighthouseResult"]["categories"]["accessibility"]["score"] * 100) || 0,
            message: "Successful Audit.",
            success: true
        })
    }).catch(error => {
        let result = {
            "accesskeys": {
                "title": "`[accesskey]` values are unique",
                "description": "Access keys let users quickly focus a part of the page. For proper navigation, each access key must be unique. [Learn more](https://web.dev/accesskeys/).",
                "score": 0,
                "displayValue": ""
            },
            "focus-traps": {
                "title": "User focus is not accidentally trapped in a region",
                "description": "A user can tab into and out of any control or region without accidentally trapping their focus. [Learn more](https://web.dev/focus-traps/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-meter-name": {
                "title": "ARIA `meter` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "td-headers-attr": {
                "title": "Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.",
                "description": "Screen readers have features to make navigating tables easier. Ensuring `<td>` cells using the `[headers]` attribute only refer to other cells in the same table may improve the experience for screen reader users. [Learn more](https://web.dev/td-headers-attr/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-required-children": {
                "title": "Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.",
                "description": "Some ARIA parent roles must contain specific child roles to perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-children/).",
                "score": 0,
                "displayValue": ""
            },
            "image-alt": {
                "title": "Image elements do not have `[alt]` attributes",
                "description": "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).",
                "score": 0,
                "displayValue": ""
            },
            "frame-title": {
                "title": "`<frame>` or `<iframe>` elements have a title",
                "description": "Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).",
                "score": 0,
                "displayValue": ""
            },
            "input-image-alt": {
                "title": "`<input type=\"image\">` elements have `[alt]` text",
                "description": "When an image is being used as an `<input>` button, providing alternative text can help screen reader users understand the purpose of the button. [Learn more](https://web.dev/input-image-alt/).",
                "score": 0,
                "displayValue": ""
            },
            "label": {
                "title": "Form elements do not have associated labels",
                "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more](https://web.dev/label/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-hidden-body": {
                "title": "`[aria-hidden=\"true\"]` is not present on the document `<body>`",
                "description": "Assistive technologies, like screen readers, work inconsistently when `aria-hidden=\"true\"` is set on the document `<body>`. [Learn more](https://web.dev/aria-hidden-body/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-allowed-attr": {
                "title": "`[aria-*]` attributes match their roles",
                "description": "Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn more](https://web.dev/aria-allowed-attr/).",
                "score": 0,
                "displayValue": ""
            },
            "video-caption": {
                "title": "`<video>` elements contain a `<track>` element with `[kind=\"captions\"]`",
                "description": "When a video provides a caption it is easier for deaf and hearing impaired users to access its information. [Learn more](https://web.dev/video-caption/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-input-field-name": {
                "title": "ARIA input fields have accessible names",
                "description": "When an input field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "form-field-multiple-labels": {
                "title": "No form fields have multiple labels",
                "description": "Form fields with multiple labels can be confusingly announced by assistive technologies like screen readers which use either the first, the last, or all of the labels. [Learn more](https://web.dev/form-field-multiple-labels/).",
                "score": 0,
                "displayValue": ""
            },
            "offscreen-content-hidden": {
                "title": "Offscreen content is hidden from assistive technology",
                "description": "Offscreen content is hidden with display: none or aria-hidden=true. [Learn more](https://web.dev/offscreen-content-hidden/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-required-parent": {
                "title": "`[role]`s are contained by their required parent element",
                "description": "Some ARIA child roles must be contained by specific parent roles to properly perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-parent/).",
                "score": 0,
                "displayValue": ""
            },
            "managed-focus": {
                "title": "The user's focus is directed to new content added to the page",
                "description": "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn more](https://web.dev/managed-focus/).",
                "score": 0,
                "displayValue": ""
            },
            "th-has-data-cells": {
                "title": "`<th>` elements and elements with `[role=\"columnheader\"/\"rowheader\"]` have data cells they describe.",
                "description": "Screen readers have features to make navigating tables easier. Ensuring table headers always refer to some set of cells may improve the experience for screen reader users. [Learn more](https://web.dev/th-has-data-cells/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-tooltip-name": {
                "title": "ARIA `tooltip` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "html-has-lang": {
                "title": "`<html>` element has a `[lang]` attribute",
                "description": "If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader. If the page isn't actually in the default language, then the screen reader might not announce the page's text correctly. [Learn more](https://web.dev/html-has-lang/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-required-attr": {
                "title": "`[role]`s have all required `[aria-*]` attributes",
                "description": "Some ARIA roles have required attributes that describe the state of the element to screen readers. [Learn more](https://web.dev/aria-required-attr/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-hidden-focus": {
                "title": "`[aria-hidden=\"true\"]` elements do not contain focusable descendents",
                "description": "Focusable descendents within an `[aria-hidden=\"true\"]` element prevent those interactive elements from being available to users of assistive technologies like screen readers. [Learn more](https://web.dev/aria-hidden-focus/).",
                "score": 0,
                "displayValue": ""
            },
            "focusable-controls": {
                "title": "Interactive controls are keyboard focusable",
                "description": "Custom interactive controls are keyboard focusable and display a focus indicator. [Learn more](https://web.dev/focusable-controls/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-valid-attr": {
                "title": "`[aria-*]` attributes are valid and not misspelled",
                "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names. [Learn more](https://web.dev/aria-valid-attr/).",
                "score": 0,
                "displayValue": ""
            },
            "html-lang-valid": {
                "title": "`<html>` element has a valid value for its `[lang]` attribute",
                "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) helps screen readers announce text properly. [Learn more](https://web.dev/html-lang-valid/).",
                "score": 0,
                "displayValue": ""
            },
            "object-alt": {
                "title": "`<object>` elements have alternate text",
                "description": "Screen readers cannot translate non-text content. Adding alternate text to `<object>` elements helps screen readers convey meaning to users. [Learn more](https://web.dev/object-alt/).",
                "score": 0,
                "displayValue": ""
            },
            "document-title": {
                "title": "Document has a `<title>` element",
                "description": "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).",
                "score": 0,
                "displayValue": ""
            },
            "duplicate-id-active": {
                "title": "`[id]` attributes on active, focusable elements are unique",
                "description": "All focusable elements must have a unique `id` to ensure that they're visible to assistive technologies. [Learn more](https://web.dev/duplicate-id-active/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-treeitem-name": {
                "title": "ARIA `treeitem` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "meta-viewport": {
                "title": "`[user-scalable=\"no\"]` is used in the `<meta name=\"viewport\">` element or the `[maximum-scale]` attribute is less than 5.",
                "description": "Disabling zooming is problematic for users with low vision who rely on screen magnification to properly see the contents of a web page. [Learn more](https://web.dev/meta-viewport/).",
                "score": 0,
                "displayValue": ""
            },
            "interactive-element-affordance": {
                "title": "Interactive elements indicate their purpose and state",
                "description": "Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn more](https://web.dev/interactive-element-affordance/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-roles": {
                "title": "`[role]` values are valid",
                "description": "ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more](https://web.dev/aria-roles/).",
                "score": 0,
                "displayValue": ""
            },
            "use-landmarks": {
                "title": "HTML5 landmark elements are used to improve navigation",
                "description": "Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more](https://web.dev/use-landmarks/).",
                "score": 0,
                "displayValue": ""
            },
            "meta-refresh": {
                "title": "The document does not use `<meta http-equiv=\"refresh\">`",
                "description": "Users do not expect a page to refresh automatically, and doing so will move focus back to the top of the page. This may create a frustrating or confusing experience. [Learn more](https://web.dev/meta-refresh/).",
                "score": 0,
                "displayValue": ""
            },
            "logical-tab-order": {
                "title": "The page has a logical tab order",
                "description": "Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more](https://web.dev/logical-tab-order/).",
                "score": 0,
                "displayValue": ""
            },
            "dlitem": {
                "title": "Definition list items are wrapped in `<dl>` elements",
                "description": "Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>` element to ensure that screen readers can properly announce them. [Learn more](https://web.dev/dlitem/).",
                "score": 0,
                "displayValue": ""
            },
            "bypass": {
                "title": "The page contains a heading, skip link, or landmark region",
                "description": "Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently. [Learn more](https://web.dev/bypass/).",
                "score": 0,
                "displayValue": ""
            },
            "custom-controls-roles": {
                "title": "Custom controls have ARIA roles",
                "description": "Custom interactive controls have appropriate ARIA roles. [Learn more](https://web.dev/custom-control-roles/).",
                "score": 0,
                "displayValue": ""
            },
            "definition-list": {
                "title": "`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.",
                "description": "When definition lists are not properly marked up, screen readers may produce confusing or inaccurate output. [Learn more](https://web.dev/definition-list/).",
                "score": 0,
                "displayValue": ""
            },
            "custom-controls-labels": {
                "title": "Custom controls have associated labels",
                "description": "Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more](https://web.dev/custom-controls-labels/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-progressbar-name": {
                "title": "ARIA `progressbar` elements have accessible names",
                "description": "When a `progressbar` element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-valid-attr-value": {
                "title": "`[aria-*]` attributes have valid values",
                "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more](https://web.dev/aria-valid-attr-value/).",
                "score": 0,
                "displayValue": ""
            },
            "list": {
                "title": "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).",
                "description": "Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. [Learn more](https://web.dev/list/).",
                "score": 0,
                "displayValue": ""
            },
            "tabindex": {
                "title": "No element has a `[tabindex]` value greater than 0",
                "description": "A value greater than 0 implies an explicit navigation ordering. Although technically valid, this often creates frustrating experiences for users who rely on assistive technologies. [Learn more](https://web.dev/tabindex/).",
                "score": 0,
                "displayValue": ""
            },
            "visual-order-follows-dom": {
                "title": "Visual order on the page follows DOM order",
                "description": "DOM order matches the visual order, improving navigation for assistive technology. [Learn more](https://web.dev/visual-order-follows-dom/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-toggle-field-name": {
                "title": "ARIA toggle fields have accessible names",
                "description": "When a toggle field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "duplicate-id-aria": {
                "title": "ARIA IDs are unique",
                "description": "The value of an ARIA ID must be unique to prevent other instances from being overlooked by assistive technologies. [Learn more](https://web.dev/duplicate-id-aria/).",
                "score": 0,
                "displayValue": ""
            },
            "button-name": {
                "title": "Buttons have an accessible name",
                "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn more](https://web.dev/button-name/).",
                "score": 0,
                "displayValue": ""
            },
            "listitem": {
                "title": "List items (`<li>`) are contained within `<ul>` or `<ol>` parent elements",
                "description": "Screen readers require list items (`<li>`) to be contained within a parent `<ul>` or `<ol>` to be announced properly. [Learn more](https://web.dev/listitem/).",
                "score": 0,
                "displayValue": ""
            },
            "color-contrast": {
                "title": "Background and foreground colors do not have a sufficient contrast ratio.",
                "description": "Low-contrast text is difficult or impossible for many users to read. [Learn more](https://web.dev/color-contrast/).",
                "score": 0,
                "displayValue": ""
            },
            "valid-lang": {
                "title": "`[lang]` attributes have a valid value",
                "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) on elements helps ensure that text is pronounced correctly by a screen reader. [Learn more](https://web.dev/valid-lang/).",
                "score": 0,
                "displayValue": ""
            },
            "heading-order": {
                "title": "Heading elements appear in a sequentially-descending order",
                "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more](https://web.dev/heading-order/).",
                "score": 0,
                "displayValue": ""
            },
            "link-name": {
                "title": "Links have a discernible name",
                "description": "Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn more](https://web.dev/link-name/).",
                "score": 0,
                "displayValue": ""
            },
            "aria-command-name": {
                "title": "`button`, `link`, and `menuitem` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": ""
            },
            "percentage": 0,
            "message": "",
            "success": false
        }
        // This URL Blocks crawling or URL is incorrect
        if (error.response) {
            result.message = "The URL entered may be invalid or the webpage does not allow crawling."
            res.status(500).send(result)
        } else {
            result.message = "The robot took too long to crawl your webpage. Try optimizing your website's performance."
            res.status(400).send(result)
        }
    })
}

export default accessibilityAPI;