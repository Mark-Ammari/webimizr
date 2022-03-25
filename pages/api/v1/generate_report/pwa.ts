import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PWA } from 'types/pwa';

const PWAAPI = async (req: NextApiRequest, res: NextApiResponse<PWA>) => {
    return await Promise.race([
        axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&category=PWA&strategy=${req.query.emulation || "DESKTOP"}&key=AIzaSyDEQGPuT8i2JOn0NAwZUVcVTEGK_LLQ14A`),
        new Promise((_, reject) => {
            const requestTimeout = setTimeout(() => {
                clearTimeout(requestTimeout);
                reject(new Error("Request Timeout"))
            }, 29000)
        })
    ]).then((response: any) => {
        const data = response.data
        res.status(200).send({
            "viewport": {
                title: data["lighthouseResult"]["audits"]["viewport"]["title"],
                description: data["lighthouseResult"]["audits"]["viewport"]["description"],
                score: data["lighthouseResult"]["audits"]["viewport"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["viewport"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["viewport"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["viewport"]["explanation"] || ""
            },
            "apple-touch-icon": {
                title: data["lighthouseResult"]["audits"]["apple-touch-icon"]["title"],
                description: data["lighthouseResult"]["audits"]["apple-touch-icon"]["description"],
                score: data["lighthouseResult"]["audits"]["apple-touch-icon"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["apple-touch-icon"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["apple-touch-icon"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["apple-touch-icon"]["displayValue"] || ""
            },
            "themed-omnibox": {
                title: data["lighthouseResult"]["audits"]["themed-omnibox"]["title"],
                description: data["lighthouseResult"]["audits"]["themed-omnibox"]["description"],
                score: data["lighthouseResult"]["audits"]["themed-omnibox"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["themed-omnibox"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["themed-omnibox"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["themed-omnibox"]["explanation"] || ""
            },
            "pwa-cross-browser": {
                title: data["lighthouseResult"]["audits"]["pwa-cross-browser"]["title"],
                description: data["lighthouseResult"]["audits"]["pwa-cross-browser"]["description"],
                score: data["lighthouseResult"]["audits"]["pwa-cross-browser"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["pwa-cross-browser"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["pwa-cross-browser"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["pwa-cross-browser"]["displayValue"] || ""
            },
            "installable-manifest": {
                title: data["lighthouseResult"]["audits"]["installable-manifest"]["title"],
                description: data["lighthouseResult"]["audits"]["installable-manifest"]["description"],
                score: data["lighthouseResult"]["audits"]["installable-manifest"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["installable-manifest"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["installable-manifest"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["installable-manifest"]["displayValue"] || ""
            },
            "maskable-icon": {
                title: data["lighthouseResult"]["audits"]["maskable-icon"]["title"],
                description: data["lighthouseResult"]["audits"]["maskable-icon"]["description"],
                score: data["lighthouseResult"]["audits"]["maskable-icon"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["maskable-icon"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["maskable-icon"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["maskable-icon"]["explanation"] || ""
            },
            "pwa-each-page-has-url": {
                title: data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["title"],
                description: data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["description"],
                score: data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["pwa-each-page-has-url"]["displayValue"] || ""
            },
            "splash-screen": {
                title: data["lighthouseResult"]["audits"]["splash-screen"]["title"],
                description: data["lighthouseResult"]["audits"]["splash-screen"]["description"],
                score: data["lighthouseResult"]["audits"]["splash-screen"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["splash-screen"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["splash-screen"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["splash-screen"]["explanation"] || ""
            },
            "content-width": {
                title: data["lighthouseResult"]["audits"]["content-width"]["title"],
                description: data["lighthouseResult"]["audits"]["content-width"]["description"],
                score: data["lighthouseResult"]["audits"]["content-width"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["content-width"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["content-width"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["content-width"]["displayValue"] || ""
            },
            "pwa-page-transitions": {
                title: data["lighthouseResult"]["audits"]["pwa-page-transitions"]["title"],
                description: data["lighthouseResult"]["audits"]["pwa-page-transitions"]["description"],
                score: data["lighthouseResult"]["audits"]["pwa-page-transitions"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["pwa-page-transitions"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["pwa-page-transitions"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["pwa-page-transitions"]["displayValue"] || ""
            },
            "service-worker": {
                title: data["lighthouseResult"]["audits"]["service-worker"]["title"],
                description: data["lighthouseResult"]["audits"]["service-worker"]["description"],
                score: data["lighthouseResult"]["audits"]["service-worker"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["service-worker"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["service-worker"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["service-worker"]["displayValue"] || ""
            },
            percentage: (data["lighthouseResult"]["categories"]["pwa"]["score"] * 100) || 0,
            message: "Successful Audit.",
            success: true
        })
    }).catch(error => {
        let result = {
            "viewport": {
                "title": "Has a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
                "description": "A `<meta name=\"viewport\">` not only optimizes your app for mobile screen sizes, but also prevents [a 300 millisecond delay to user input](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away). [Learn more](https://web.dev/viewport/).",
                "score": 0,
                "displayValue": ""
            },
            "apple-touch-icon": {
                "title": "Does not provide a valid `apple-touch-icon`",
                "description": "For ideal appearance on iOS when users add a progressive web app to the home screen, define an `apple-touch-icon`. It must point to a non-transparent 192px (or 180px) square PNG. [Learn More](https://web.dev/apple-touch-icon/).",
                "score": 0,
                "displayValue": ""
            },
            "themed-omnibox": {
                "title": "Does not set a theme color for the address bar.",
                "description": "The browser address bar can be themed to match your site. [Learn more](https://web.dev/themed-omnibox/).",
                "score": 0,
                "displayValue": ""
            },
            "pwa-cross-browser": {
                "title": "Site works cross-browser",
                "description": "To reach the most number of users, sites should work across every major browser. [Learn more](https://web.dev/pwa-cross-browser/).",
                "score": 0,
                "displayValue": ""
            },
            "installable-manifest": {
                "title": "Web app manifest or service worker do not meet the installability requirements",
                "description": "Service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. With proper service worker and manifest implementations, browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement. [Learn more](https://web.dev/installable-manifest/).",
                "score": 0,
                "displayValue": ""
            },
            "maskable-icon": {
                "title": "Manifest doesn't have a maskable icon",
                "description": "A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device. [Learn more](https://web.dev/maskable-icon-audit/).",
                "score": 0,
                "displayValue": ""
            },
            "pwa-each-page-has-url": {
                "title": "Each page has a URL",
                "description": "Ensure individual pages are deep linkable via URL and that URLs are unique for the purpose of shareability on social media. [Learn more](https://web.dev/pwa-each-page-has-url/).",
                "score": 0,
                "displayValue": ""
            },
            "splash-screen": {
                "title": "Is not configured for a custom splash screen",
                "description": "A themed splash screen ensures a high-quality experience when users launch your app from their homescreens. [Learn more](https://web.dev/splash-screen/).",
                "score": 0,
                "displayValue": ""
            },
            "content-width": {
                "title": "Content is sized correctly for the viewport",
                "description": "If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens. [Learn more](https://web.dev/content-width/).",
                "score": 0,
                "displayValue": ""
            },
            "pwa-page-transitions": {
                "title": "Page transitions don't feel like they block on the network",
                "description": "Transitions should feel snappy as you tap around, even on a slow network. This experience is key to a user's perception of performance. [Learn more](https://web.dev/pwa-page-transitions/).",
                "score": 0,
                "displayValue": ""
            },
            "service-worker": {
                "title": "Does not register a service worker that controls page and `start_url`",
                "description": "The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. [Learn more](https://web.dev/service-worker/).",
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

export default PWAAPI;