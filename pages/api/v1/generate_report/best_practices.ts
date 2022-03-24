import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BestPractices } from 'types/bestPractices';

const SEOAPI = async (req: NextApiRequest, res: NextApiResponse<BestPractices>) => {
    return await Promise.race([
        axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&category=BEST_PRACTICES&strategy=${req.query.emulation || "DESKTOP"}&key=AIzaSyDEQGPuT8i2JOn0NAwZUVcVTEGK_LLQ14A`),
        new Promise((_, reject) => {
            const requestTimeout = setTimeout(() => {
                clearTimeout(requestTimeout);
                reject(new Error("Request Timeout"))
            }, 29000)
        })
    ]).then((response: any) => {
        const data = response.data
        res.status(200).send({
            "no-vulnerable-libraries": {
                title: data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["title"],
                description: data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["description"],
                score: data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["no-vulnerable-libraries"]["displayValue"] || ""
            },
            "errors-in-console": {
                title: data["lighthouseResult"]["audits"]["errors-in-console"]["title"],
                description: data["lighthouseResult"]["audits"]["errors-in-console"]["description"],
                score: data["lighthouseResult"]["audits"]["errors-in-console"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["errors-in-console"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["errors-in-console"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["errors-in-console"]["displayValue"] || ""
            },
            "notification-on-start": {
                title: data["lighthouseResult"]["audits"]["notification-on-start"]["title"],
                description: data["lighthouseResult"]["audits"]["notification-on-start"]["description"],
                score: data["lighthouseResult"]["audits"]["notification-on-start"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["notification-on-start"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["notification-on-start"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["notification-on-start"]["displayValue"] || ""
            },
            "preload-fonts": {
                title: data["lighthouseResult"]["audits"]["preload-fonts"]["title"],
                description: data["lighthouseResult"]["audits"]["preload-fonts"]["description"],
                score: data["lighthouseResult"]["audits"]["preload-fonts"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["preload-fonts"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["preload-fonts"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["preload-fonts"]["displayValue"] || ""
            },
            "image-size-responsive": {
                title: data["lighthouseResult"]["audits"]["image-size-responsive"]["title"],
                description: data["lighthouseResult"]["audits"]["image-size-responsive"]["description"],
                score: data["lighthouseResult"]["audits"]["image-size-responsive"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["image-size-responsive"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["image-size-responsive"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["image-size-responsive"]["displayValue"] || ""
            },
            "valid-source-maps": {
                title: data["lighthouseResult"]["audits"]["valid-source-maps"]["title"],
                description: data["lighthouseResult"]["audits"]["valid-source-maps"]["description"],
                score: data["lighthouseResult"]["audits"]["valid-source-maps"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["valid-source-maps"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["valid-source-maps"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["valid-source-maps"]["displayValue"] || ""
            },
            "password-inputs-can-be-pasted-into": {
                title: data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["title"],
                description: data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["description"],
                score: data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["password-inputs-can-be-pasted-into"]["displayValue"] || ""
            },
            "csp-xss": {
                title: data["lighthouseResult"]["audits"]["csp-xss"]["title"],
                description: data["lighthouseResult"]["audits"]["csp-xss"]["description"],
                score: data["lighthouseResult"]["audits"]["csp-xss"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["csp-xss"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["csp-xss"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["csp-xss"]["displayValue"] || ""
            },
            "charset": {
                title: data["lighthouseResult"]["audits"]["charset"]["title"],
                description: data["lighthouseResult"]["audits"]["charset"]["description"],
                score: data["lighthouseResult"]["audits"]["charset"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["charset"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["charset"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["charset"]["displayValue"] || ""
            },
            "image-aspect-ratio": {
                title: data["lighthouseResult"]["audits"]["image-aspect-ratio"]["title"],
                description: data["lighthouseResult"]["audits"]["image-aspect-ratio"]["description"],
                score: data["lighthouseResult"]["audits"]["image-aspect-ratio"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["image-aspect-ratio"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["image-aspect-ratio"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["image-aspect-ratio"]["displayValue"] || ""
            },
            "is-on-https": {
                title: data["lighthouseResult"]["audits"]["is-on-https"]["title"],
                description: data["lighthouseResult"]["audits"]["is-on-https"]["description"],
                score: data["lighthouseResult"]["audits"]["is-on-https"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["is-on-https"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["is-on-https"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["is-on-https"]["displayValue"] || ""
            },
            "geolocation-on-start": {
                title: data["lighthouseResult"]["audits"]["geolocation-on-start"]["title"],
                description: data["lighthouseResult"]["audits"]["geolocation-on-start"]["description"],
                score: data["lighthouseResult"]["audits"]["geolocation-on-start"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["geolocation-on-start"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["geolocation-on-start"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["geolocation-on-start"]["displayValue"] || ""
            },
            "js-libraries": {
                title: data["lighthouseResult"]["audits"]["js-libraries"]["title"],
                description: data["lighthouseResult"]["audits"]["js-libraries"]["description"],
                score: data["lighthouseResult"]["audits"]["js-libraries"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["js-libraries"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["js-libraries"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["js-libraries"]["displayValue"] || ""
            },
            "deprecations": {
                title: data["lighthouseResult"]["audits"]["deprecations"]["title"],
                description: data["lighthouseResult"]["audits"]["deprecations"]["description"],
                score: data["lighthouseResult"]["audits"]["deprecations"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["deprecations"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["deprecations"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["deprecations"]["displayValue"] || ""
            },
            "doctype": {
                title: data["lighthouseResult"]["audits"]["doctype"]["title"],
                description: data["lighthouseResult"]["audits"]["doctype"]["description"],
                score: data["lighthouseResult"]["audits"]["doctype"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["doctype"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["doctype"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["doctype"]["displayValue"] || ""
            },
            "inspector-issues": {
                title: data["lighthouseResult"]["audits"]["inspector-issues"]["title"],
                description: data["lighthouseResult"]["audits"]["inspector-issues"]["description"],
                score: data["lighthouseResult"]["audits"]["inspector-issues"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["inspector-issues"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["inspector-issues"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["inspector-issues"]["displayValue"] || ""
            },
            percentage: (data["lighthouseResult"]["categories"]["best-practices"]["score"] * 100) || 0,
            message: "Successful Audit.",
            success: true
        })
    }).catch(error => {
        let result = {
            "no-vulnerable-libraries": {
                "title": "Includes front-end JavaScript libraries with known security vulnerabilities",
                "description": "Some third-party scripts may contain known security vulnerabilities that are easily identified and exploited by attackers. [Learn more](https://web.dev/no-vulnerable-libraries/).",
                "score": 0,
                "displayValue": ""
            },
            "errors-in-console": {
                "title": "Browser errors were logged to the console",
                "description": "Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more](https://web.dev/errors-in-console/)",
                "score": 0,
                "displayValue": ""
            },
            "notification-on-start": {
                "title": "Avoids requesting the notification permission on page load",
                "description": "Users are mistrustful of or confused by sites that request to send notifications without context. Consider tying the request to user gestures instead. [Learn more](https://web.dev/notification-on-start/).",
                "score": 0,
                "displayValue": ""
            },
            "preload-fonts": {
                "title": "Fonts with `font-display: optional` are preloaded",
                "description": "Preload `optional` fonts so first-time visitors may use them. [Learn more](https://web.dev/preload-optional-fonts/)",
                "score": 0,
                "displayValue": ""
            },
            "image-size-responsive": {
                "title": "Serves images with appropriate resolution",
                "description": "Image natural dimensions should be proportional to the display size and the pixel ratio to maximize image clarity. [Learn more](https://web.dev/serve-responsive-images/).",
                "score": 0,
                "displayValue": ""
            },
            "valid-source-maps": {
                "title": "Missing source maps for large first-party JavaScript",
                "description": "Source maps translate minified code to the original source code. This helps developers debug in production. In addition, Lighthouse is able to provide further insights. Consider deploying source maps to take advantage of these benefits. [Learn more](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).",
                "score": 0,
                "displayValue": ""
            },
            "password-inputs-can-be-pasted-into": {
                "title": "Allows users to paste into password fields",
                "description": "Preventing password pasting undermines good security policy. [Learn more](https://web.dev/password-inputs-can-be-pasted-into/).",
                "score": 0,
                "displayValue": ""
            },
            "csp-xss": {
                "title": "Ensure CSP is effective against XSS attacks",
                "description": "A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. [Learn more](https://web.dev/csp-xss/)",
                "score": 0,
                "displayValue": ""
            },
            "charset": {
                "title": "Properly defines charset",
                "description": "A character encoding declaration is required. It can be done with a `<meta>` tag in the first 1024 bytes of the HTML or in the Content-Type HTTP response header. [Learn more](https://web.dev/charset/).",
                "score": 0,
                "displayValue": ""
            },
            "image-aspect-ratio": {
                "title": "Displays images with correct aspect ratio",
                "description": "Image display dimensions should match natural aspect ratio. [Learn more](https://web.dev/image-aspect-ratio/).",
                "score": 0,
                "displayValue": ""
            },
            "is-on-https": {
                "title": "Uses HTTPS",
                "description": "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being served over HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more](https://web.dev/is-on-https/).",
                "score": 0,
                "displayValue": ""
            },
            "geolocation-on-start": {
                "title": "Avoids requesting the geolocation permission on page load",
                "description": "Users are mistrustful of or confused by sites that request their location without context. Consider tying the request to a user action instead. [Learn more](https://web.dev/geolocation-on-start/).",
                "score": 0,
                "displayValue": ""
            },
            "js-libraries": {
                "title": "Detected JavaScript libraries",
                "description": "All front-end JavaScript libraries detected on the page. [Learn more](https://web.dev/js-libraries/).",
                "score": 0,
                "displayValue": ""
            },
            "deprecations": {
                "title": "Avoids deprecated APIs",
                "description": "Deprecated APIs will eventually be removed from the browser. [Learn more](https://web.dev/deprecations/).",
                "score": 0,
                "displayValue": ""
            },
            "doctype": {
                "title": "Page has the HTML doctype",
                "description": "Specifying a doctype prevents the browser from switching to quirks-mode. [Learn more](https://web.dev/doctype/).",
                "score": 0,
                "displayValue": ""
            },
            "inspector-issues": {
                "title": "No issues in the `Issues` panel in Chrome Devtools",
                "description": "Issues logged to the `Issues` panel in Chrome Devtools indicate unresolved problems. They can come from network request failures, insufficient security controls, and other browser concerns. Open up the Issues panel in Chrome DevTools for more details on each issue.",
                "score": 0,
                "displayValue": ""
            },
            "percentage": 0,
            "message": "",
            "success": false
        }
        // This URL Blocks crawling or URL is incorrect
        if (error.response) {
            if (error.response.status === 500) {
                result.message = "The URL entered may be invalid or the webpage does not allow crawling."
                res.status(500).send(result)
            }
        } else {
            result.message = "The robot took too long to crawl your webpage. Try optimizing your website's performance."
            res.status(400).send(result)
        }
    })
}

export default SEOAPI;