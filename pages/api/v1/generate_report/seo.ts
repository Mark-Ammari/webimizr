import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Seo } from 'types/seo';

const SEOAPI = async (req: NextApiRequest, res: NextApiResponse<Seo>) => {
    return await Promise.race([
        axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&category=SEO&strategy=${req.query.emulation || "DESKTOP"}&key=AIzaSyDEQGPuT8i2JOn0NAwZUVcVTEGK_LLQ14A`),
        new Promise((_, reject) => {
            const requestTimeout = setTimeout(() => {
                clearTimeout(requestTimeout);
                reject(new Error("Request Timeout"))
            }, 29000)
        })
    ]).then((response: any) => {
        const data = response.data
        // res.send(data["lighthouseResult"]["audits"])
        res.status(200).send({
            "viewport": {
                title: data["lighthouseResult"]["audits"]["viewport"]["title"],
                description: data["lighthouseResult"]["audits"]["viewport"]["description"],
                score: data["lighthouseResult"]["audits"]["viewport"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["viewport"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["viewport"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["viewport"]["explanation"] || ""
            },
            "crawlable-anchors": {
                title: data["lighthouseResult"]["audits"]["crawlable-anchors"]["title"],
                description: data["lighthouseResult"]["audits"]["crawlable-anchors"]["description"],
                score: data["lighthouseResult"]["audits"]["crawlable-anchors"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["crawlable-anchors"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["crawlable-anchors"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["crawlable-anchors"]["displayValue"] || ""
            },
            "document-title": {
                title: data["lighthouseResult"]["audits"]["document-title"]["title"],
                description: data["lighthouseResult"]["audits"]["document-title"]["description"],
                score: data["lighthouseResult"]["audits"]["document-title"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["document-title"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["document-title"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["document-title"]["displayValue"] || ""
            },
            "font-size": {
                title: data["lighthouseResult"]["audits"]["font-size"]["title"],
                description: data["lighthouseResult"]["audits"]["font-size"]["description"],
                score: data["lighthouseResult"]["audits"]["font-size"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["font-size"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["font-size"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["font-size"]["displayValue"] || ""
            },
            "http-status-code": {
                title: data["lighthouseResult"]["audits"]["http-status-code"]["title"],
                description: data["lighthouseResult"]["audits"]["http-status-code"]["description"],
                score: data["lighthouseResult"]["audits"]["http-status-code"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["http-status-code"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["http-status-code"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["http-status-code"]["displayValue"] || ""
            },
            "image-alt": {
                title: data["lighthouseResult"]["audits"]["image-alt"]["title"],
                description: data["lighthouseResult"]["audits"]["image-alt"]["description"],
                score: data["lighthouseResult"]["audits"]["image-alt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["image-alt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["image-alt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["image-alt"]["displayValue"] || ""
            },
            "is-crawlable": {
                title: data["lighthouseResult"]["audits"]["is-crawlable"]["title"],
                description: data["lighthouseResult"]["audits"]["is-crawlable"]["description"],
                score: data["lighthouseResult"]["audits"]["is-crawlable"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["is-crawlable"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["is-crawlable"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["is-crawlable"]["displayValue"] || ""
            },
            "link-text": {
                title: data["lighthouseResult"]["audits"]["link-text"]["title"],
                description: data["lighthouseResult"]["audits"]["link-text"]["description"],
                score: data["lighthouseResult"]["audits"]["link-text"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["link-text"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["link-text"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["link-text"]["displayValue"] || ""
            },
            "meta-description": {
                title: data["lighthouseResult"]["audits"]["meta-description"]["title"],
                description: data["lighthouseResult"]["audits"]["meta-description"]["description"],
                score: data["lighthouseResult"]["audits"]["meta-description"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["meta-description"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["meta-description"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["meta-description"]["displayValue"] || ""
            },
            "robots-txt": {
                title: data["lighthouseResult"]["audits"]["robots-txt"]["title"],
                description: data["lighthouseResult"]["audits"]["robots-txt"]["description"],
                score: data["lighthouseResult"]["audits"]["robots-txt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["robots-txt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["robots-txt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["robots-txt"]["displayValue"] || ""
            },
            "canonical": {
                title: data["lighthouseResult"]["audits"]["canonical"]["title"],
                description: data["lighthouseResult"]["audits"]["canonical"]["description"],
                score: data["lighthouseResult"]["audits"]["canonical"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["canonical"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["canonical"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["canonical"]["displayValue"] || ""
            },
            "tap-targets": {
                title: data["lighthouseResult"]["audits"]["tap-targets"]["title"],
                description: data["lighthouseResult"]["audits"]["tap-targets"]["description"],
                score: data["lighthouseResult"]["audits"]["tap-targets"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["tap-targets"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["tap-targets"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["tap-targets"]["displayValue"] || ""
            },
            "plugins": {
                title: data["lighthouseResult"]["audits"]["plugins"]["title"],
                description: data["lighthouseResult"]["audits"]["plugins"]["description"],
                score: data["lighthouseResult"]["audits"]["plugins"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["plugins"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["plugins"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["plugins"]["displayValue"] || ""
            },
            "hreflang": {
                title: data["lighthouseResult"]["audits"]["hreflang"]["title"],
                description: data["lighthouseResult"]["audits"]["hreflang"]["description"],
                score: data["lighthouseResult"]["audits"]["hreflang"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["hreflang"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["hreflang"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["hreflang"]["displayValue"] || ""
            },
            "structured-data": {
                title: data["lighthouseResult"]["audits"]["structured-data"]["title"],
                description: data["lighthouseResult"]["audits"]["structured-data"]["description"],
                score: data["lighthouseResult"]["audits"]["structured-data"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["structured-data"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["structured-data"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["structured-data"]["displayValue"] || ""
            },
            percentage: (data["lighthouseResult"]["categories"]["seo"]["score"] * 100) || 0,
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
            "crawlable-anchors": {
                "title": "Links are crawlable",
                "description": "Search engines may use `href` attributes on links to crawl websites. Ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered. [Learn More](https://support.google.com/webmasters/answer/9112205)",
                "score": 0,
                "displayValue": ""
            },
            "document-title": {
                "title": "Document has a `<title>` element",
                "description": "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).",
                "score": 0,
                "displayValue": ""
            },
            "font-size": {
                "title": "Document uses legible font sizes",
                "description": "Font sizes less than 12px are too small to be legible and require mobile visitors to “pinch to zoom” in order to read. Strive to have >60% of page text ≥12px. [Learn more](https://web.dev/font-size/).",
                "score": null,
                "displayValue": "Not Applicable."
            },
            "http-status-code": {
                "title": "Page has successful HTTP status code",
                "description": "Pages with unsuccessful HTTP status codes may not be indexed properly. [Learn more](https://web.dev/http-status-code/).",
                "score": 0,
                "displayValue": ""
            },
            "image-alt": {
                "title": "Image elements do not have `[alt]` attributes",
                "description": "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).",
                "score": 0,
                "displayValue": ""
            },
            "is-crawlable": {
                "title": "Page isn’t blocked from indexing",
                "description": "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more](https://web.dev/is-crawable/).",
                "score": 0,
                "displayValue": ""
            },
            "link-text": {
                "title": "Links have descriptive text",
                "description": "Descriptive link text helps search engines understand your content. [Learn more](https://web.dev/link-text/).",
                "score": 0,
                "displayValue": ""
            },
            "meta-description": {
                "title": "Document has a meta description",
                "description": "Meta descriptions may be included in search results to concisely summarize page content. [Learn more](https://web.dev/meta-description/).",
                "score": 0,
                "displayValue": ""
            },
            "robots-txt": {
                "title": "robots.txt is valid",
                "description": "If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more](https://web.dev/robots-txt/).",
                "score": 0,
                "displayValue": ""
            },
            "canonical": {
                "title": "Document has a valid `rel=canonical`",
                "description": "Canonical links suggest which URL to show in search results. [Learn more](https://web.dev/canonical/).",
                "score": 0,
                "displayValue": ""
            },
            "tap-targets": {
                "title": "Tap targets are sized appropriately",
                "description": "Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them, to be easy enough to tap without overlapping onto other elements. [Learn more](https://web.dev/tap-targets/).",
                "score": 0,
                "displayValue": ""
            },
            "plugins": {
                "title": "Document avoids plugins",
                "description": "Search engines can't index plugin content, and many devices restrict plugins or don't support them. [Learn more](https://web.dev/plugins/).",
                "score": 0,
                "displayValue": ""
            },
            "hreflang": {
                "title": "Document has a valid `hreflang`",
                "description": "hreflang links tell search engines what version of a page they should list in search results for a given language or region. [Learn more](https://web.dev/hreflang/).",
                "score": 0,
                "displayValue": ""
            },
            "structured-data": {
                "title": "Structured data is valid",
                "description": "Run the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) and the [Structured Data Linter](http://linter.structured-data.org/) to validate structured data. [Learn more](https://web.dev/structured-data/).",
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