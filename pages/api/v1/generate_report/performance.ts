import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Performance } from 'types/performance';

function convertBytes(bytes: number) {
    if (bytes === 0 || bytes === null) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function convertMS(time: number) {
    if (time === null) return '0 ms';
    if (time < 1000) return `${time.toFixed(2)} ms`;
    return `${parseFloat((time / 1000).toString()).toFixed(2)} s`
}

const performanceAPI = async (req: NextApiRequest, res: NextApiResponse<Performance>) => {
    return await Promise.race([
        axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.url}&category=PERFORMANCE&strategy=${req.query.emulation || "DESKTOP"}&key=AIzaSyDEQGPuT8i2JOn0NAwZUVcVTEGK_LLQ14A`),
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
            "first-contentful-paint": {
                title: data["lighthouseResult"]["audits"]["first-contentful-paint"]["title"],
                description: data["lighthouseResult"]["audits"]["first-contentful-paint"]["description"],
                score: data["lighthouseResult"]["audits"]["first-contentful-paint"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["first-contentful-paint"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["first-contentful-paint"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["first-contentful-paint"]["displayValue"] || ""
            },
            "largest-contentful-paint": {
                title: data["lighthouseResult"]["audits"]["largest-contentful-paint"]["title"],
                description: data["lighthouseResult"]["audits"]["largest-contentful-paint"]["description"],
                score: data["lighthouseResult"]["audits"]["largest-contentful-paint"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["largest-contentful-paint"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["largest-contentful-paint"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["largest-contentful-paint"]["displayValue"] || ""
            },
            "first-meaningful-paint": {
                title: data["lighthouseResult"]["audits"]["first-meaningful-paint"]["title"],
                description: data["lighthouseResult"]["audits"]["first-meaningful-paint"]["description"],
                score: data["lighthouseResult"]["audits"]["first-meaningful-paint"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["first-meaningful-paint"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["first-meaningful-paint"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["first-meaningful-paint"]["displayValue"] || ""
            },
            "speed-index": {
                title: data["lighthouseResult"]["audits"]["speed-index"]["title"],
                description: data["lighthouseResult"]["audits"]["speed-index"]["description"],
                score: data["lighthouseResult"]["audits"]["speed-index"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["speed-index"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["speed-index"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["speed-index"]["displayValue"] || ""
            },
            "total-blocking-time": {
                title: data["lighthouseResult"]["audits"]["total-blocking-time"]["title"],
                description: data["lighthouseResult"]["audits"]["total-blocking-time"]["description"],
                score: data["lighthouseResult"]["audits"]["total-blocking-time"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["total-blocking-time"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["total-blocking-time"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["total-blocking-time"]["displayValue"] || ""
            },
            "max-potential-fid": {
                title: data["lighthouseResult"]["audits"]["max-potential-fid"]["title"],
                description: data["lighthouseResult"]["audits"]["max-potential-fid"]["description"],
                score: data["lighthouseResult"]["audits"]["max-potential-fid"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["max-potential-fid"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["max-potential-fid"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["max-potential-fid"]["displayValue"] || ""
            },
            "cumulative-layout-shift": {
                title: data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["title"],
                description: data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["description"],
                score: data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["displayValue"] || ""
            },
            "server-response-time": {
                title: data["lighthouseResult"]["audits"]["server-response-time"]["title"],
                description: data["lighthouseResult"]["audits"]["server-response-time"]["description"],
                score: data["lighthouseResult"]["audits"]["server-response-time"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["server-response-time"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["server-response-time"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["server-response-time"]["displayValue"] || ""
            },
            "interactive": {
                title: data["lighthouseResult"]["audits"]["interactive"]["title"],
                description: data["lighthouseResult"]["audits"]["interactive"]["description"],
                score: data["lighthouseResult"]["audits"]["interactive"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["interactive"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["interactive"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["interactive"]["displayValue"] || ""
            },
            "user-timings": {
                title: data["lighthouseResult"]["audits"]["user-timings"]["title"],
                description: data["lighthouseResult"]["audits"]["user-timings"]["description"],
                score: data["lighthouseResult"]["audits"]["user-timings"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["user-timings"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["user-timings"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["user-timings"]["displayValue"] || ""
            },
            "critical-request-chains": {
                title: data["lighthouseResult"]["audits"]["critical-request-chains"]["title"],
                description: data["lighthouseResult"]["audits"]["critical-request-chains"]["description"],
                score: data["lighthouseResult"]["audits"]["critical-request-chains"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["critical-request-chains"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["critical-request-chains"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["critical-request-chains"]["displayValue"] || ""
            },
            "redirects": {
                title: data["lighthouseResult"]["audits"]["redirects"]["title"],
                description: data["lighthouseResult"]["audits"]["redirects"]["description"],
                score: data["lighthouseResult"]["audits"]["redirects"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["redirects"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["redirects"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["redirects"]["displayValue"] || ""
            },
            "mainthread-work-breakdown": {
                title: data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["title"],
                description: data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["description"],
                score: data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["mainthread-work-breakdown"]["displayValue"] || ""
            },
            "bootup-time": {
                title: data["lighthouseResult"]["audits"]["bootup-time"]["title"],
                description: data["lighthouseResult"]["audits"]["bootup-time"]["description"],
                score: data["lighthouseResult"]["audits"]["bootup-time"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["bootup-time"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["bootup-time"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["bootup-time"]["displayValue"] || ""
            },
            "uses-rel-preload": {
                title: data["lighthouseResult"]["audits"]["uses-rel-preload"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-rel-preload"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-rel-preload"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-rel-preload"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-rel-preload"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-rel-preload"]["displayValue"] || ""
            },
            "uses-rel-preconnect": {
                title: data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-rel-preconnect"]["displayValue"] || ""
            },
            "font-display": {
                title: data["lighthouseResult"]["audits"]["font-display"]["title"],
                description: data["lighthouseResult"]["audits"]["font-display"]["description"],
                score: data["lighthouseResult"]["audits"]["font-display"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["font-display"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["font-display"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["font-display"]["displayValue"] || ""
            },
            "network-rtt": {
                title: data["lighthouseResult"]["audits"]["network-rtt"]["title"],
                description: data["lighthouseResult"]["audits"]["network-rtt"]["description"],
                score: data["lighthouseResult"]["audits"]["network-rtt"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["network-rtt"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["network-rtt"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["network-rtt"]["displayValue"] || ""
            },
            "performance-budget": {
                title: data["lighthouseResult"]["audits"]["performance-budget"]["title"],
                description: data["lighthouseResult"]["audits"]["performance-budget"]["description"],
                score: data["lighthouseResult"]["audits"]["performance-budget"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["performance-budget"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["performance-budget"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["performance-budget"]["displayValue"] || ""
            },
            "timing-budget": {
                title: data["lighthouseResult"]["audits"]["timing-budget"]["title"],
                description: data["lighthouseResult"]["audits"]["timing-budget"]["description"],
                score: data["lighthouseResult"]["audits"]["timing-budget"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["timing-budget"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["timing-budget"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["timing-budget"]["displayValue"] || ""
            },
            "resource-summary": {
                title: data["lighthouseResult"]["audits"]["resource-summary"]["title"],
                description: data["lighthouseResult"]["audits"]["resource-summary"]["description"],
                score: data["lighthouseResult"]["audits"]["resource-summary"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["resource-summary"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["resource-summary"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["resource-summary"]["displayValue"] || ""
            },
            "third-party-summary": {
                title: data["lighthouseResult"]["audits"]["third-party-summary"]["title"],
                description: data["lighthouseResult"]["audits"]["third-party-summary"]["description"],
                score: data["lighthouseResult"]["audits"]["third-party-summary"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["third-party-summary"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["third-party-summary"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["third-party-summary"]["displayValue"] || ""
            },
            "largest-contentful-paint-element": {
                title: data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["title"],
                description: data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["description"],
                score: data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["largest-contentful-paint-element"]["displayValue"] || ""
            },
            "third-party-facades": {
                title: data["lighthouseResult"]["audits"]["third-party-facades"]["title"],
                description: data["lighthouseResult"]["audits"]["third-party-facades"]["description"],
                score: data["lighthouseResult"]["audits"]["third-party-facades"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["third-party-facades"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["third-party-facades"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["third-party-facades"]["displayValue"] || ""
            },
            "lcp-lazy-loaded": {
                title: data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["title"],
                description: data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["description"],
                score: data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["lcp-lazy-loaded"]["displayValue"] || ""
            },
            "layout-shift-elements": {
                title: data["lighthouseResult"]["audits"]["layout-shift-elements"]["title"],
                description: data["lighthouseResult"]["audits"]["layout-shift-elements"]["description"],
                score: data["lighthouseResult"]["audits"]["layout-shift-elements"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["layout-shift-elements"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["layout-shift-elements"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["layout-shift-elements"]["displayValue"] || ""
            },
            "long-tasks": {
                title: data["lighthouseResult"]["audits"]["long-tasks"]["title"],
                description: data["lighthouseResult"]["audits"]["long-tasks"]["description"],
                score: data["lighthouseResult"]["audits"]["long-tasks"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["long-tasks"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["long-tasks"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["long-tasks"]["displayValue"] || ""
            },
            "no-unload-listeners": {
                title: data["lighthouseResult"]["audits"]["no-unload-listeners"]["title"],
                description: data["lighthouseResult"]["audits"]["no-unload-listeners"]["description"],
                score: data["lighthouseResult"]["audits"]["no-unload-listeners"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["no-unload-listeners"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["no-unload-listeners"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["no-unload-listeners"]["displayValue"] || ""
            },
            "non-composited-animations": {
                title: data["lighthouseResult"]["audits"]["non-composited-animations"]["title"],
                description: data["lighthouseResult"]["audits"]["non-composited-animations"]["description"],
                score: data["lighthouseResult"]["audits"]["non-composited-animations"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["non-composited-animations"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["no-composited-animations"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["non-composited-animations"]["displayValue"] || ""
            },
            "unsized-images": {
                title: data["lighthouseResult"]["audits"]["unsized-images"]["title"],
                description: data["lighthouseResult"]["audits"]["unsized-images"]["description"],
                score: data["lighthouseResult"]["audits"]["unsized-images"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["unsized-images"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["unsized-images"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["unsized-images"]["displayValue"] || ""
            },
            "preload-lcp-image": {
                title: data["lighthouseResult"]["audits"]["preload-lcp-image"]["title"],
                description: data["lighthouseResult"]["audits"]["preload-lcp-image"]["description"],
                score: data["lighthouseResult"]["audits"]["preload-lcp-image"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["preload-lcp-image"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["preload-lcp-image"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["preload-lcp-image"]["displayValue"] || ""
            },
            "script-treemap-data": {
                title: data["lighthouseResult"]["audits"]["script-treemap-data"]["title"],
                description: data["lighthouseResult"]["audits"]["script-treemap-data"]["description"],
                score: data["lighthouseResult"]["audits"]["script-treemap-data"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["script-treemap-data"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["script-treemap-data"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["script-treemap-data"]["displayValue"] || ""
            },
            "uses-long-cache-ttl": {
                title: data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-long-cache-ttl"]["displayValue"] || ""
            },
            "total-byte-weight": {
                title: data["lighthouseResult"]["audits"]["total-byte-weight"]["title"],
                description: data["lighthouseResult"]["audits"]["total-byte-weight"]["description"],
                score: data["lighthouseResult"]["audits"]["total-byte-weight"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["total-byte-weight"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["total-byte-weight"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["total-byte-weight"]["displayValue"] || ""
            },
            "offscreen-images": {
                title: data["lighthouseResult"]["audits"]["offscreen-images"]["title"],
                description: data["lighthouseResult"]["audits"]["offscreen-images"]["description"],
                score: data["lighthouseResult"]["audits"]["offscreen-images"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["offscreen-images"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["offscreen-images"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["offscreen-images"]["displayValue"] || ""
            },
            "render-blocking-resources": {
                title: data["lighthouseResult"]["audits"]["render-blocking-resources"]["title"],
                description: data["lighthouseResult"]["audits"]["render-blocking-resources"]["description"],
                score: data["lighthouseResult"]["audits"]["render-blocking-resources"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["render-blocking-resources"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["render-blocking-resources"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["render-blocking-resources"]["displayValue"] || ""
            },
            "unminified-css": {
                title: data["lighthouseResult"]["audits"]["unminified-css"]["title"],
                description: data["lighthouseResult"]["audits"]["unminified-css"]["description"],
                score: data["lighthouseResult"]["audits"]["unminified-css"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["unminified-css"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["unminified-css"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["unminified-css"]["displayValue"] || ""
            },
            "unminified-javascript": {
                title: data["lighthouseResult"]["audits"]["unminified-javascript"]["title"],
                description: data["lighthouseResult"]["audits"]["unminified-javascript"]["description"],
                score: data["lighthouseResult"]["audits"]["unminified-javascript"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["unminified-javascript"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["unminified-javascript"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["unminified-javascript"]["displayValue"] || ""
            },
            "unused-css-rules": {
                title: data["lighthouseResult"]["audits"]["unused-css-rules"]["title"],
                description: data["lighthouseResult"]["audits"]["unused-css-rules"]["description"],
                score: data["lighthouseResult"]["audits"]["unused-css-rules"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["unused-css-rules"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["unused-css-rules"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["unused-css-rules"]["displayValue"] || ""
            },
            "unused-javascript": {
                title: data["lighthouseResult"]["audits"]["unused-javascript"]["title"],
                description: data["lighthouseResult"]["audits"]["unused-javascript"]["description"],
                score: data["lighthouseResult"]["audits"]["unused-javascript"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["unused-javascript"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["unused-javascript"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["unused-javascript"]["displayValue"] || ""
            },
            "modern-image-formats": {
                title: data["lighthouseResult"]["audits"]["modern-image-formats"]["title"],
                description: data["lighthouseResult"]["audits"]["modern-image-formats"]["description"],
                score: data["lighthouseResult"]["audits"]["modern-image-formats"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["modern-image-formats"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["modern-image-formats"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["modern-image-formats"]["displayValue"] || ""
            },
            "uses-optimized-images": {
                title: data["lighthouseResult"]["audits"]["uses-optimized-images"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-optimized-images"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-optimized-images"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-optimized-images"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-optimized-images"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-optimized-images"]["displayValue"] || ""
            },
            "uses-text-compression": {
                title: data["lighthouseResult"]["audits"]["uses-text-compression"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-text-compression"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-text-compression"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-text-compression"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-text-compression"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-text-compression"]["displayValue"] || ""
            },
            "uses-responsive-images": {
                title: data["lighthouseResult"]["audits"]["uses-responsive-images"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-responsive-images"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-responsive-images"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-responsive-images"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-responsive-images"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-responsive-images"]["displayValue"] || ""
            },
            "efficient-animated-content": {
                title: data["lighthouseResult"]["audits"]["efficient-animated-content"]["title"],
                description: data["lighthouseResult"]["audits"]["efficient-animated-content"]["description"],
                score: data["lighthouseResult"]["audits"]["efficient-animated-content"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["efficient-animated-content"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["efficient-animated-content"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["efficient-animated-content"]["displayValue"] || ""
            },
            "duplicated-javascript": {
                title: data["lighthouseResult"]["audits"]["duplicated-javascript"]["title"],
                description: data["lighthouseResult"]["audits"]["duplicated-javascript"]["description"],
                score: data["lighthouseResult"]["audits"]["duplicated-javascript"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["duplicated-javascript"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["duplicated-javascript"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["duplicated-javascript"]["displayValue"] || ""
            },
            "legacy-javascript": {
                title: data["lighthouseResult"]["audits"]["legacy-javascript"]["title"],
                description: data["lighthouseResult"]["audits"]["legacy-javascript"]["description"],
                score: data["lighthouseResult"]["audits"]["legacy-javascript"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["legacy-javascript"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["legacy-javascript"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["legacy-javascript"]["displayValue"] || ""
            },
            "dom-size": {
                title: data["lighthouseResult"]["audits"]["dom-size"]["title"],
                description: data["lighthouseResult"]["audits"]["dom-size"]["description"],
                score: data["lighthouseResult"]["audits"]["dom-size"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["dom-size"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["dom-size"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["dom-size"]["displayValue"] || ""
            },
            "no-document-write": {
                title: data["lighthouseResult"]["audits"]["no-document-write"]["title"],
                description: data["lighthouseResult"]["audits"]["no-document-write"]["description"],
                score: data["lighthouseResult"]["audits"]["no-document-write"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["no-document-write"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["no-document-write"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["no-document-write"]["displayValue"] || ""
            },
            "uses-passive-event-listeners": {
                title: data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["title"],
                description: data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["description"],
                score: data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["uses-passive-event-listeners"]["displayValue"] || ""
            },
            "main-thread-tasks": {
                title: data["lighthouseResult"]["audits"]["main-thread-tasks"]["title"],
                description: data["lighthouseResult"]["audits"]["main-thread-tasks"]["description"],
                score: data["lighthouseResult"]["audits"]["main-thread-tasks"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["main-thread-tasks"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["main-thread-tasks"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["main-thread-tasks"]["displayValue"] || ""
            },
            "network-server-latency": {
                title: data["lighthouseResult"]["audits"]["network-server-latency"]["title"],
                description: data["lighthouseResult"]["audits"]["network-server-latency"]["description"],
                score: data["lighthouseResult"]["audits"]["network-server-latency"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["network-server-latency"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["network-server-latency"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["network-server-latency"]["displayValue"] || ""
            },
            "network-requests": {
                title: data["lighthouseResult"]["audits"]["network-requests"]["title"],
                description: data["lighthouseResult"]["audits"]["network-requests"]["description"],
                score: data["lighthouseResult"]["audits"]["network-requests"]["score"],
                displayValue: data["lighthouseResult"]["audits"]["network-requests"]["scoreDisplayMode"] === "notApplicable" ? "Not Applicable." : data["lighthouseResult"]["audits"]["network-requests"]["scoreDisplayMode"] === "manual" ? "Manual Check Needed." : data["lighthouseResult"]["audits"]["network-requests"]["displayValue"] || ""
            },
            percentage: (data["lighthouseResult"]["categories"]["performance"]["score"] * 100) || 0,
            diagnostics: {
                title: data["lighthouseResult"]["audits"]["diagnostics"]["title"],
                description: data["lighthouseResult"]["audits"]["diagnostics"]["description"],
                details: [
                    { item: "Number of Requests", result: data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["numRequests"] : 0 },
                    { item: "Number of Scripts", result: data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["numScripts"] : 0 },
                    { item: "Number of Stylesheets", result: data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["numStylesheets"] : 0 },
                    { item: "Number of Fonts", result: data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["numFonts"] : 0 },
                    { item: "Number of Tasks", result: data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["numTasks"] : 0 },
                    { item: "Round-Trip Time", result: convertMS(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["rtt"] : 0) },
                    { item: "Throughput", result: convertBytes(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["throughput"] : 0) },
                    { item: "Max Round-Trip Time", result: convertMS(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["maxRtt"] : 0) },
                    { item: "Max Server Latency", result: convertMS(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["maxServerLatency"] : 0) },
                    { item: "Total Byte Weight", result: convertBytes(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["totalByteWeight"] : 0) },
                    { item: "Total Task Time", result: convertMS(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["totalTaskTime"] : 0) },
                    { item: "Transfer Size", result: convertBytes(data["lighthouseResult"]["audits"]["diagnostics"]["details"] ? data["lighthouseResult"]["audits"]["diagnostics"]["details"]["items"][0]["mainDocumentTransferSize"] : 0) }
                ]
            },
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
            "first-contentful-paint": {
                "title": "First Contentful Paint",
                "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
                "score": 0,
                "displayValue": "0%"
            },
            "largest-contentful-paint": {
                "title": "Largest Contentful Paint",
                "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)",
                "score": 0,
                "displayValue": "0%"
            },
            "first-meaningful-paint": {
                "title": "First Meaningful Paint",
                "description": "First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/).",
                "score": 0,
                "displayValue": "0%"
            },
            "speed-index": {
                "title": "Speed Index",
                "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/).",
                "score": 0,
                "displayValue": "0%"
            },
            "total-blocking-time": {
                "title": "Total Blocking Time",
                "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/).",
                "score": 0,
                "displayValue": "0%"
            },
            "max-potential-fid": {
                "title": "Max Potential First Input Delay",
                "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/).",
                "score": 0,
                "displayValue": "0%"
            },
            "cumulative-layout-shift": {
                "title": "Cumulative Layout Shift",
                "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).",
                "score": 0,
                "displayValue": "0%"
            },
            "server-response-time": {
                "title": "Initial server response time was short",
                "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/).",
                "score": 0,
                "displayValue": ""
            },
            "interactive": {
                "title": "Time to Interactive",
                "description": "Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/).",
                "score": 0,
                "displayValue": "0%"
            },
            "user-timings": {
                "title": "User Timing marks and measures",
                "description": "Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. [Learn more](https://web.dev/user-timings/).",
                "score": 0,
                "displayValue": ""
            },
            "critical-request-chains": {
                "title": "Avoid chaining critical requests",
                "description": "The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains/).",
                "score": 0,
                "displayValue": ""
            },
            "redirects": {
                "title": "Avoid multiple page redirects",
                "description": "Redirects introduce additional delays before the page can be loaded. [Learn more](https://web.dev/redirects/).",
                "score": 0,
                "displayValue": ""
            },
            "mainthread-work-breakdown": {
                "title": "Minimizes main-thread work",
                "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)",
                "score": 0,
                "displayValue": ""
            },
            "bootup-time": {
                "title": "JavaScript execution time",
                "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-rel-preload": {
                "title": "Preload key requests",
                "description": "Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn more](https://web.dev/uses-rel-preload/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-rel-preconnect": {
                "title": "Preconnect to required origins",
                "description": "Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn more](https://web.dev/uses-rel-preconnect/).",
                "score": 0,
                "displayValue": ""
            },
            "font-display": {
                "title": "All text remains visible during webfont loads",
                "description": "Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading. [Learn more](https://web.dev/font-display/).",
                "score": 0,
                "displayValue": ""
            },
            "network-rtt": {
                "title": "Network Round Trip Times",
                "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                "score": 0,
                "displayValue": ""
            },
            "performance-budget": {
                "title": "Performance budget",
                "description": "Keep the quantity and size of network requests under the targets set by the provided performance budget. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                "score": 0,
                "displayValue": ""
            },
            "timing-budget": {
                "title": "Timing budget",
                "description": "Set a timing budget to help you keep an eye on the performance of your site. Performant sites load fast and respond to user input events quickly. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                "score": 0,
                "displayValue": ""
            },
            "resource-summary": {
                "title": "Keep request counts low and transfer sizes small",
                "description": "To set budgets for the quantity and size of page resources, add a budget.json file. [Learn more](https://web.dev/use-lighthouse-for-performance-budgets/).",
                "score": 0,
                "displayValue": ""
            },
            "third-party-summary": {
                "title": "Minimize third-party usage",
                "description": "Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn more](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).",
                "score": 0,
                "displayValue": ""
            },
            "largest-contentful-paint-element": {
                "title": "Largest Contentful Paint element",
                "description": "This is the largest contentful element painted within the viewport. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)",
                "score": 0,
                "displayValue": ""
            },
            "third-party-facades": {
                "title": "Lazy load third-party resources with facades",
                "description": "Some third-party embeds can be lazy loaded. Consider replacing them with a facade until they are required. [Learn more](https://web.dev/third-party-facades/).",
                "score": 0,
                "displayValue": ""
            },
            "lcp-lazy-loaded": {
                "title": "Largest Contentful Paint image was not lazily loaded",
                "description": "Above-the-fold images that are lazily loaded render later in the page lifecycle, which can delay the largest contentful paint. [Learn more](https://web.dev/lcp-lazy-loading/).",
                "score": 0,
                "displayValue": ""
            },
            "layout-shift-elements": {
                "title": "Avoid large layout shifts",
                "description": "These DOM elements contribute most to the CLS of the page.",
                "score": 0,
                "displayValue": ""
            },
            "long-tasks": {
                "title": "Avoid long main-thread tasks",
                "description": "Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn more](https://web.dev/long-tasks-devtools/)",
                "score": 0,
                "displayValue": ""
            },
            "no-unload-listeners": {
                "title": "Avoids `unload` event listeners",
                "description": "The `unload` event does not fire reliably and listening for it can prevent browser optimizations like the Back-Forward Cache. Use `pagehide` or `visibilitychange` events instead. [Learn more](https://web.dev/bfcache/#never-use-the-unload-event)",
                "score": 0,
                "displayValue": ""
            },
            "non-composited-animations": {
                "title": "Avoid non-composited animations",
                "description": "Animations which are not composited can be janky and increase CLS. [Learn more](https://web.dev/non-composited-animations)",
                "score": 0,
                "displayValue": ""
            },
            "unsized-images": {
                "title": "Image elements have explicit `width` and `height`",
                "description": "Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn more](https://web.dev/optimize-cls/#images-without-dimensions)",
                "score": 0,
                "displayValue": ""
            },
            "preload-lcp-image": {
                "title": "Preload Largest Contentful Paint image",
                "description": "Preload the image used by the LCP element in order to improve your LCP time. [Learn more](https://web.dev/optimize-lcp/#preload-important-resources).",
                "score": 0,
                "displayValue": ""
            },
            "script-treemap-data": {
                "title": "Script Treemap Data",
                "description": "Used for treemap app",
                "score": 0,
                "displayValue": ""
            },
            "uses-long-cache-ttl": {
                "title": "Uses efficient cache policy on static assets",
                "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more](https://web.dev/uses-long-cache-ttl/).",
                "score": 0,
                "displayValue": ""
            },
            "total-byte-weight": {
                "title": "Avoids enormous network payloads",
                "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn more](https://web.dev/total-byte-weight/).",
                "score": 0,
                "displayValue": ""
            },
            "offscreen-images": {
                "title": "Defer offscreen images",
                "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn more](https://web.dev/offscreen-images/).",
                "score": 0,
                "displayValue": ""
            },
            "render-blocking-resources": {
                "title": "Eliminate render-blocking resources",
                "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn more](https://web.dev/render-blocking-resources/).",
                "score": 0,
                "displayValue": ""
            },
            "unminified-css": {
                "title": "Minify CSS",
                "description": "Minifying CSS files can reduce network payload sizes. [Learn more](https://web.dev/unminified-css/).",
                "score": 0,
                "displayValue": ""
            },
            "unminified-javascript": {
                "title": "Minify JavaScript",
                "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn more](https://web.dev/unminified-javascript/).",
                "score": 0,
                "displayValue": ""
            },
            "unused-css-rules": {
                "title": "Reduce unused CSS",
                "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn more](https://web.dev/unused-css-rules/).",
                "score": 0,
                "displayValue": ""
            },
            "unused-javascript": {
                "title": "Reduce unused JavaScript",
                "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn more](https://web.dev/unused-javascript/).",
                "score": 0,
                "displayValue": ""
            },
            "modern-image-formats": {
                "title": "Serve images in next-gen formats",
                "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more](https://web.dev/uses-webp-images/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-optimized-images": {
                "title": "Efficiently encode images",
                "description": "Optimized images load faster and consume less cellular data. [Learn more](https://web.dev/uses-optimized-images/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-text-compression": {
                "title": "Enable text compression",
                "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more](https://web.dev/uses-text-compression/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-responsive-images": {
                "title": "Properly size images",
                "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn more](https://web.dev/uses-responsive-images/).",
                "score": 0,
                "displayValue": ""
            },
            "efficient-animated-content": {
                "title": "Use video formats for animated content",
                "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more](https://web.dev/efficient-animated-content/)",
                "score": 0,
                "displayValue": ""
            },
            "duplicated-javascript": {
                "title": "Remove duplicate modules in JavaScript bundles",
                "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                "score": 0,
                "displayValue": ""
            },
            "legacy-javascript": {
                "title": "Avoid serving legacy JavaScript to modern browsers",
                "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn More](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)",
                "score": 0,
                "displayValue": ""
            },
            "dom-size": {
                "title": "Avoids an excessive DOM size",
                "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn more](https://web.dev/dom-size/).",
                "score": 0,
                "displayValue": ""
            },
            "no-document-write": {
                "title": "Avoids `document.write()`",
                "description": "For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn more](https://web.dev/no-document-write/).",
                "score": 0,
                "displayValue": ""
            },
            "uses-passive-event-listeners": {
                "title": "Uses passive listeners to improve scrolling performance",
                "description": "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more](https://web.dev/uses-passive-event-listeners/).",
                "score": 0,
                "displayValue": ""
            },
            "main-thread-tasks": {
                "title": "Tasks",
                "description": "Lists the toplevel main thread tasks that executed during page load.",
                "score": 0,
                "displayValue": ""
            },
            "network-server-latency": {
                "title": "Server Backend Latencies",
                "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
                "score": 0,
                "displayValue": ""
            },
            "network-requests": {
                "title": "Network Requests",
                "description": "Lists the network requests that were made during page load.",
                "score": 0,
                "displayValue": ""
            },
            "percentage": 0,
            "diagnostics": {
                "title": "Diagnostics",
                "description": "Collection of useful page vitals.",
                "details": [
                    {
                        "item": "Number of Requests",
                        "result": 0
                    },
                    {
                        "item": "Number of Scripts",
                        "result": 0
                    },
                    {
                        "item": "Number of Stylesheets",
                        "result": 0
                    },
                    {
                        "item": "Number of Fonts",
                        "result": 0
                    },
                    {
                        "item": "Number of Tasks",
                        "result": 0
                    },
                    {
                        "item": "Round-Trip Time",
                        "result": "0.00 ms"
                    },
                    {
                        "item": "Throughput",
                        "result": "0 Bytes"
                    },
                    {
                        "item": "Max Round-Trip Time",
                        "result": "0.00 ms"
                    },
                    {
                        "item": "Max Server Latency",
                        "result": "0.00 ms"
                    },
                    {
                        "item": "Total Byte Weight",
                        "result": "0 Bytes"
                    },
                    {
                        "item": "Total Task Time",
                        "result": "0.00 ms"
                    },
                    {
                        "item": "Transfer Size",
                        "result": "0 Bytes"
                    }
                ]
            },
            message: "",
            success: false
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

export default performanceAPI