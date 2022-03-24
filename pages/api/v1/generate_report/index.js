const { parentPort } = require('worker_threads');

const puppeteer = require('puppeteer');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const reportGenerator = require('lighthouse/report/generator/report-generator')
const constants = require('lighthouse/lighthouse-core/config/constants');
const request = require('request');
const util = require('util');

const options = {
    chromeFlags: ['--headless', '--no-sandbox'],
    logLevel: 'info',
    output: 'json'
}

const config = {
    extends: 'lighthouse:default'
}

function percentageGenerator(...args) {
    let passed = 0;
    let failed = 0;
    let total = null;
    args.map(arg => {
        if (arg === 0) ++failed;
        else if (arg === 1) ++passed;
    })
    total = Math.round((passed / (passed + failed)) * 100);
    return total;
}

function convertBytes(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function convertMS(time) {
    if (time < 1000) return `${parseFloat(time).toFixed(2)} ms`
    return `${parseFloat(time / 1000).toFixed(2)} s`
}

const generateReport = async (req, res) => {
    const customConfig = {
        ...config,
        settings: {
            formFactor: req.query.emulation === 'mobile' ? 'mobile' : 'desktop',
            throttling: req.query.emulation === 'mobile' ? constants.throttling.mobileSlow4G : constants.throttling.desktopDense4G,
            screenEmulation: req.query.emulation === 'mobile' ? constants.screenEmulationMetrics.mobile : constants.screenEmulationMetrics.desktop,
            emulatedUserAgent: req.query.emulation === 'mobile' ? constants.userAgents.mobile : constants.userAgents.desktop,
        }
    }
    try {
        const chrome = await chromeLauncher.launch({ ...options, onlyCategories: req.query.categories ? req.query.categories.split(',') : ['performance', 'pwa', 'seo', 'performance', 'best-practices', 'accessibility'] });
        options.port = chrome.port;

        const resp = await util.promisify(request)(`http://localhost:${options.port}/json/version`);
        const { webSocketDebuggerUrl } = JSON.parse(resp.body);
        const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });

        // Run Lighthouse API
        const { lhr } = await lighthouse(req.query.url, { ...options, onlyCategories: req.query.categories ? req.query.categories.split(',') : ['performance', 'pwa', 'seo', 'performance', 'best-practices', 'accessibility'] }, customConfig);
        await browser.disconnect();
        await chrome.kill();

        const json = reportGenerator.generateReport(lhr, 'json');

        const audits = JSON.parse(json).audits; // Lighthouse audits

        const performance = Math.round((audits["first-contentful-paint"].score * 10) + (audits["speed-index"].score * 10) + (audits["largest-contentful-paint"].score * 25) + (audits["uses-long-cache-ttl"].score * 10) + (audits["total-blocking-time"].score * 30) + (audits["cumulative-layout-shift"].score * 15)) || 0
        const seo = percentageGenerator(audits["viewport"].score, audits["document-title"].score, audits["meta-description"].score, audits["http-status-code"].score, audits["link-text"].score, audits["crawlable-anchors"].score, audits["is-crawlable"].score, audits["robots-txt"].score, audits["image-alt"].score, audits["hreflang"].score, audits["canonical"].score, audits["plugins"].score, audits["font-size"].score, audits["tap-targets"].score) || 0
        const bestPractices = percentageGenerator(audits["csp-xss"].score, audits["js-libraries"].score, audits["inspector-issues"].score, audits["is-on-https"].score, audits["geolocation-on-start"].score, audits["no-unload-listeners"].score, audits["valid-source-maps"].score, audits["errors-in-console"].score, audits["notification-on-start"].score, audits["no-vulnerable-libraries"].score, audits["password-inputs-can-be-pasted-into"].score, audits["image-aspect-ratio"].score, audits["image-size-responsive"].score, audits["doctype"].score, audits["charset"].score, audits["deprecations"].score, audits["preload-fonts"].score) || 0
        const accessibility = percentageGenerator(audits["aria-required-attr"].score, audits["aria-allowed-attr"].score, audits["aria-required-children"].score, audits["aria-hidden-body"].score, audits["aria-roles"].score, audits["aria-valid-attr-value"].score, audits["aria-valid-attr"].score, audits["button-name"].score, audits["duplicate-id-aria"].score, audits["image-alt"].score, audits["label"].score, audits["aria-command-name"].score, audits["aria-hidden-focus"].score, audits["bypass"].score, audits["color-contrast"].score, audits["document-title"].score, audits["duplicate-id-active"].score, audits["html-has-lang"].score, audits["html-lang-valid"].score, audits["link-name"].score, audits["tabindex"].score, audits["accesskeys"].score, audits["aria-input-field-name"].score, audits["aria-meter-name"].score, audits["aria-progressbar-name"].score, audits["aria-required-parent"].score, audits["aria-toggle-field-name"].score, audits["aria-tooltip-name"].score, audits["aria-treeitem-name"].score, audits["definition-list"].score, audits["dlitem"].score, audits["form-field-multiple-labels"].score, audits["frame-title"].score, audits["heading-order"].score, audits["input-image-alt"].score, audits["list"].score, audits["listitem"].score, audits["meta-refresh"].score, audits["meta-viewport"].score, audits["object-alt"].score, audits["td-headers-attr"].score, audits["th-has-data-cells"].score, audits["valid-lang"].score, audits["video-caption"].score) || 0
        const overallScore = ((performance + seo + bestPractices + accessibility) / 4) || 0

        res.status(200).send({
            "is-on-https": {
                title: audits["is-on-https"]["title"],
                description: audits["is-on-https"]["description"],
                score: audits["is-on-https"]["score"],
                displayValue: audits["is-on-https"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["is-on-https"]["errorMessage"] || audits["is-on-https"]["displayValue"])
            },
            "service-worker": {
                title: audits["service-worker"]["title"],
                description: audits["service-worker"]["description"],
                score: audits["service-worker"]["score"],
                displayValue: audits["service-worker"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["service-worker"]["errorMessage"] || audits["service-worker"]["displayValue"])
            },
            "viewport": {
                title: audits["viewport"]["title"],
                description: audits["viewport"]["description"],
                score: audits["viewport"]["score"],
                displayValue: audits["viewport"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["viewport"]["errorMessage"] || audits["viewport"]["explanation"])
            },
            "first-contentful-paint": {
                title: audits["first-contentful-paint"]["title"],
                description: audits["first-contentful-paint"]["description"],
                score: audits["first-contentful-paint"]["score"],
                displayValue: audits["first-contentful-paint"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["first-contentful-paint"]["errorMessage"] || audits["first-contentful-paint"]["displayValue"])
            },
            "largest-contentful-paint": {
                title: audits["largest-contentful-paint"]["title"],
                description: audits["largest-contentful-paint"]["description"],
                score: audits["largest-contentful-paint"]["score"],
                displayValue: audits["largest-contentful-paint"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["largest-contentful-paint"]["errorMessage"] || audits["largest-contentful-paint"]["displayValue"])
            },
            "first-meaningful-paint": {
                title: audits["first-meaningful-paint"]["title"],
                description: audits["first-meaningful-paint"]["description"],
                score: audits["first-meaningful-paint"]["score"],
                displayValue: audits["first-meaningful-paint"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["first-meaningful-paint"]["errorMessage"] || audits["first-meaningful-paint"]["displayValue"])
            },
            "speed-index": {
                title: audits["speed-index"]["title"],
                description: audits["speed-index"]["description"],
                score: audits["speed-index"]["score"],
                displayValue: audits["speed-index"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["speed-index"]["errorMessage"] || audits["speed-index"]["displayValue"])
            },
            "screenshot-thumbnails": {
                title: audits["screenshot-thumbnails"]["title"],
                description: audits["screenshot-thumbnails"]["description"],
                score: audits["screenshot-thumbnails"]["score"],
                displayValue: audits["screenshot-thumbnails"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["screenshot-thumbnails"]["errorMessage"] || audits["screenshot-thumbnails"]["displayValue"])
            },
            "final-screenshot": {
                title: audits["final-screenshot"]["title"],
                description: audits["final-screenshot"]["description"],
                score: audits["final-screenshot"]["score"],
                displayValue: audits["final-screenshot"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["final-screenshot"]["errorMessage"] || audits["final-screenshot"]["displayValue"])
            },
            "total-blocking-time": {
                title: audits["total-blocking-time"]["title"],
                description: audits["total-blocking-time"]["description"],
                score: audits["total-blocking-time"]["score"],
                displayValue: audits["total-blocking-time"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["total-blocking-time"]["errorMessage"] || audits["total-blocking-time"]["displayValue"])
            },
            "max-potential-fid": {
                title: audits["max-potential-fid"]["title"],
                description: audits["max-potential-fid"]["description"],
                score: audits["max-potential-fid"]["score"],
                displayValue: audits["max-potential-fid"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["max-potential-fid"]["errorMessage"] || audits["max-potential-fid"]["displayValue"])
            },
            "cumulative-layout-shift": {
                title: audits["cumulative-layout-shift"]["title"],
                description: audits["cumulative-layout-shift"]["description"],
                score: audits["cumulative-layout-shift"]["score"],
                displayValue: audits["cumulative-layout-shift"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["cumulative-layout-shift"]["errorMessage"] || audits["cumulative-layout-shift"]["displayValue"])
            },
            "errors-in-console": {
                title: audits["errors-in-console"]["title"],
                description: audits["errors-in-console"]["description"],
                score: audits["errors-in-console"]["score"],
                displayValue: audits["errors-in-console"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["errors-in-console"]["errorMessage"] || audits["errors-in-console"]["displayValue"])
            },
            "server-response-time": {
                title: audits["server-response-time"]["title"],
                description: audits["server-response-time"]["description"],
                score: audits["server-response-time"]["score"],
                displayValue: audits["server-response-time"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["server-response-time"]["errorMessage"] || audits["server-response-time"]["displayValue"])
            },
            "interactive": {
                title: audits["interactive"]["title"],
                description: audits["interactive"]["description"],
                score: audits["interactive"]["score"],
                displayValue: audits["interactive"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["interactive"]["errorMessage"] || audits["interactive"]["displayValue"])
            },
            "user-timings": {
                title: audits["user-timings"]["title"],
                description: audits["user-timings"]["description"],
                score: audits["user-timings"]["score"],
                displayValue: audits["user-timings"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["user-timings"]["errorMessage"] || audits["user-timings"]["displayValue"])
            },
            "critical-request-chains": {
                title: audits["critical-request-chains"]["title"],
                description: audits["critical-request-chains"]["description"],
                score: audits["critical-request-chains"]["score"],
                displayValue: audits["critical-request-chains"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["critical-request-chains"]["errorMessage"] || audits["critical-request-chains"]["displayValue"])
            },
            "redirects": {
                title: audits["redirects"]["title"],
                description: audits["redirects"]["description"],
                score: audits["redirects"]["score"],
                displayValue: audits["redirects"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["redirects"]["errorMessage"] || audits["redirects"]["displayValue"])
            },
            "installable-manifest": {
                title: audits["installable-manifest"]["title"],
                description: audits["installable-manifest"]["description"],
                score: audits["installable-manifest"]["score"],
                displayValue: audits["installable-manifest"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["installable-manifest"]["errorMessage"] || audits["installable-manifest"]["displayValue"])
            },
            "apple-touch-icon": {
                title: audits["apple-touch-icon"]["title"],
                description: audits["apple-touch-icon"]["description"],
                score: audits["apple-touch-icon"]["score"],
                displayValue: audits["apple-touch-icon"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["apple-touch-icon"]["errorMessage"] || audits["apple-touch-icon"]["displayValue"])
            },
            "splash-screen": {
                title: audits["splash-screen"]["title"],
                description: audits["splash-screen"]["description"],
                score: audits["splash-screen"]["score"],
                displayValue: audits["splash-screen"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["splash-screen"]["errorMessage"] || audits["splash-screen"]["explanation"])
            },
            "themed-omnibox": {
                title: audits["themed-omnibox"]["title"],
                description: audits["themed-omnibox"]["description"],
                score: audits["themed-omnibox"]["score"],
                displayValue: audits["themed-omnibox"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["themed-omnibox"]["errorMessage"] || audits["themed-omnibox"]["explanation"])
            },
            "maskable-icon": {
                title: audits["maskable-icon"]["title"],
                description: audits["maskable-icon"]["description"],
                score: audits["maskable-icon"]["score"],
                displayValue: audits["maskable-icon"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["maskable-icon"]["errorMessage"] || audits["maskable-icon"]["displayValue"])
            },
            "content-width": {
                title: audits["content-width"]["title"],
                description: audits["content-width"]["description"],
                score: audits["content-width"]["score"],
                displayValue: audits["content-width"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["content-width"]["errorMessage"] || audits["content-width"]["displayValue"])
            },
            "image-aspect-ratio": {
                title: audits["image-aspect-ratio"]["title"],
                description: audits["image-aspect-ratio"]["description"],
                score: audits["image-aspect-ratio"]["score"],
                displayValue: audits["image-aspect-ratio"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["image-aspect-ratio"]["errorMessage"] || audits["image-aspect-ratio"]["displayValue"])
            },
            "image-size-responsive": {
                title: audits["image-size-responsive"]["title"],
                description: audits["image-size-responsive"]["description"],
                score: audits["image-size-responsive"]["score"],
                displayValue: audits["image-size-responsive"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["image-size-responsive"]["errorMessage"] || audits["image-size-responsive"]["displayValue"])
            },
            "preload-fonts": {
                title: audits["preload-fonts"]["title"],
                description: audits["preload-fonts"]["description"],
                score: audits["preload-fonts"]["score"],
                displayValue: audits["preload-fonts"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["preload-fonts"]["errorMessage"] || audits["preload-fonts"]["displayValue"])
            },
            "deprecations": {
                title: audits["deprecations"]["title"],
                description: audits["deprecations"]["description"],
                score: audits["deprecations"]["score"],
                displayValue: audits["deprecations"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["deprecations"]["errorMessage"] || audits["deprecations"]["displayValue"])
            },
            "mainthread-work-breakdown": {
                title: audits["mainthread-work-breakdown"]["title"],
                description: audits["mainthread-work-breakdown"]["description"],
                score: audits["mainthread-work-breakdown"]["score"],
                displayValue: audits["mainthread-work-breakdown"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["mainthread-work-breakdown"]["errorMessage"] || audits["mainthread-work-breakdown"]["displayValue"])
            },
            "bootup-time": {
                title: audits["bootup-time"]["title"],
                description: audits["bootup-time"]["description"],
                score: audits["bootup-time"]["score"],
                displayValue: audits["bootup-time"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["bootup-time"]["errorMessage"] || audits["bootup-time"]["displayValue"])
            },
            "uses-rel-preload": {
                title: audits["uses-rel-preload"]["title"],
                description: audits["uses-rel-preload"]["description"],
                score: audits["uses-rel-preload"]["score"],
                displayValue: audits["uses-rel-preload"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-rel-preload"]["errorMessage"] || audits["uses-rel-preload"]["displayValue"])
            },
            "uses-rel-preconnect": {
                title: audits["uses-rel-preconnect"]["title"],
                description: audits["uses-rel-preconnect"]["description"],
                score: audits["uses-rel-preconnect"]["score"],
                displayValue: audits["uses-rel-preconnect"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-rel-preconnect"]["errorMessage"] || audits["uses-rel-preconnect"]["displayValue"])
            },
            "font-display": {
                title: audits["font-display"]["title"],
                description: audits["font-display"]["description"],
                score: audits["font-display"]["score"],
                displayValue: audits["font-display"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["font-display"]["errorMessage"] || audits["font-display"]["displayValue"])
            },
            "network-rtt": {
                title: audits["network-rtt"]["title"],
                description: audits["network-rtt"]["description"],
                score: audits["network-rtt"]["score"],
                displayValue: audits["network-rtt"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["network-rtt"]["errorMessage"] || audits["network-rtt"]["displayValue"])
            },
            "performance-budget": {
                title: audits["performance-budget"]["title"],
                description: audits["performance-budget"]["description"],
                score: audits["performance-budget"]["score"],
                displayValue: audits["performance-budget"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["performance-budget"]["errorMessage"] || audits["performance-budget"]["displayValue"])
            },
            "timing-budget": {
                title: audits["timing-budget"]["title"],
                description: audits["timing-budget"]["description"],
                score: audits["timing-budget"]["score"],
                displayValue: audits["timing-budget"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["timing-budget"]["errorMessage"] || audits["timing-budget"]["displayValue"])
            },
            "resource-summary": {
                title: audits["resource-summary"]["title"],
                description: audits["resource-summary"]["description"],
                score: audits["resource-summary"]["score"],
                displayValue: audits["resource-summary"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["resource-summary"]["errorMessage"] || audits["resource-summary"]["displayValue"])
            },
            "third-party-summary": {
                title: audits["third-party-summary"]["title"],
                description: audits["third-party-summary"]["description"],
                score: audits["third-party-summary"]["score"],
                displayValue: audits["third-party-summary"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["third-party-summary"]["errorMessage"] || audits["third-party-summary"]["displayValue"])
            },
            "largest-contentful-paint-element": {
                title: audits["largest-contentful-paint-element"]["title"],
                description: audits["largest-contentful-paint-element"]["description"],
                score: audits["largest-contentful-paint-element"]["score"],
                displayValue: audits["largest-contentful-paint-element"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["largest-contentful-paint-element"]["errorMessage"] || audits["largest-contentful-paint-element"]["displayValue"])
            },
            "third-party-facades": {
                title: audits["third-party-facades"]["title"],
                description: audits["third-party-facades"]["description"],
                score: audits["third-party-facades"]["score"],
                displayValue: audits["third-party-facades"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["third-party-facades"]["errorMessage"] || audits["third-party-facades"]["displayValue"])
            },
            "lcp-lazy-loaded": {
                title: audits["lcp-lazy-loaded"]["title"],
                description: audits["lcp-lazy-loaded"]["description"],
                score: audits["lcp-lazy-loaded"]["score"],
                displayValue: audits["lcp-lazy-loaded"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["lcp-lazy-loaded"]["errorMessage"] || audits["lcp-lazy-loaded"]["displayValue"])
            },
            "layout-shift-elements": {
                title: audits["layout-shift-elements"]["title"],
                description: audits["layout-shift-elements"]["description"],
                score: audits["layout-shift-elements"]["score"],
                displayValue: audits["layout-shift-elements"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["layout-shift-elements"]["errorMessage"] || audits["layout-shift-elements"]["displayValue"])
            },
            "long-tasks": {
                title: audits["long-tasks"]["title"],
                description: audits["long-tasks"]["description"],
                score: audits["long-tasks"]["score"],
                displayValue: audits["long-tasks"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["long-tasks"]["errorMessage"] || audits["long-tasks"]["displayValue"])
            },
            "no-unload-listeners": {
                title: audits["no-unload-listeners"]["title"],
                description: audits["no-unload-listeners"]["description"],
                score: audits["no-unload-listeners"]["score"],
                displayValue: audits["no-unload-listeners"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["no-unload-listeners"]["errorMessage"] || audits["no-unload-listeners"]["displayValue"])
            },
            "non-composited-animations": {
                title: audits["non-composited-animations"]["title"],
                description: audits["non-composited-animations"]["description"],
                score: audits["non-composited-animations"]["score"],
                displayValue: audits["non-composited-animations"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["non-composited-animations"]["errorMessage"] || audits["non-composited-animations"]["displayValue"])
            },
            "unsized-images": {
                title: audits["unsized-images"]["title"],
                description: audits["unsized-images"]["description"],
                score: audits["unsized-images"]["score"],
                displayValue: audits["unsized-images"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["unsized-images"]["errorMessage"] || audits["unsized-images"]["displayValue"])
            },
            "valid-source-maps": {
                title: audits["valid-source-maps"]["title"],
                description: audits["valid-source-maps"]["description"],
                score: audits["valid-source-maps"]["score"],
                displayValue: audits["valid-source-maps"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["valid-source-maps"]["errorMessage"] || audits["valid-source-maps"]["displayValue"])
            },
            "preload-lcp-image": {
                title: audits["preload-lcp-image"]["title"],
                description: audits["preload-lcp-image"]["description"],
                score: audits["preload-lcp-image"]["score"],
                displayValue: audits["preload-lcp-image"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["preload-lcp-image"]["errorMessage"] || audits["preload-lcp-image"]["displayValue"])
            },
            "csp-xss": {
                title: audits["csp-xss"]["title"],
                description: audits["csp-xss"]["description"],
                score: audits["csp-xss"]["score"],
                displayValue: audits["csp-xss"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["csp-xss"]["errorMessage"] || audits["csp-xss"]["displayValue"])
            },
            "script-treemap-data": {
                title: audits["script-treemap-data"]["title"],
                description: audits["script-treemap-data"]["description"],
                score: audits["script-treemap-data"]["score"],
                displayValue: audits["script-treemap-data"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["script-treemap-data"]["errorMessage"] || audits["script-treemap-data"]["displayValue"])
            },
            "pwa-cross-browser": {
                title: audits["pwa-cross-browser"]["title"],
                description: audits["pwa-cross-browser"]["description"],
                score: audits["pwa-cross-browser"]["score"],
                displayValue: audits["pwa-cross-browser"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["pwa-cross-browser"]["errorMessage"] || "Manual Assessment Needed")
            },
            "pwa-page-transitions": {
                title: audits["pwa-page-transitions"]["title"],
                description: audits["pwa-page-transitions"]["description"],
                score: audits["pwa-page-transitions"]["score"],
                displayValue: audits["pwa-page-transitions"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["pwa-page-transitions"]["errorMessage"] || "Manual Assessment Needed")
            },
            "pwa-each-page-has-url": {
                title: audits["pwa-each-page-has-url"]["title"],
                description: audits["pwa-each-page-has-url"]["description"],
                score: audits["pwa-each-page-has-url"]["score"],
                displayValue: audits["pwa-each-page-has-url"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["pwa-each-page-has-url"]["errorMessage"] || "Manual Assessment Needed")
            },
            "accesskeys": {
                title: audits["accesskeys"]["title"],
                description: audits["accesskeys"]["description"],
                score: audits["accesskeys"]["score"],
                displayValue: audits["accesskeys"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["accesskeys"]["errorMessage"] || audits["accesskeys"]["displayValue"])
            },
            "aria-allowed-attr": {
                title: audits["aria-allowed-attr"]["title"],
                description: audits["aria-allowed-attr"]["description"],
                score: audits["aria-allowed-attr"]["score"],
                displayValue: audits["aria-allowed-attr"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-allowed-attr"]["errorMessage"] || audits["aria-allowed-attr"]["displayValue"])
            },
            "aria-command-name": {
                title: audits["aria-command-name"]["title"],
                description: audits["aria-command-name"]["description"],
                score: audits["aria-command-name"]["score"],
                displayValue: audits["aria-command-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-command-name"]["errorMessage"] || audits["aria-command-name"]["displayValue"])
            },
            "aria-hidden-body": {
                title: audits["aria-hidden-body"]["title"],
                description: audits["aria-hidden-body"]["description"],
                score: audits["aria-hidden-body"]["score"],
                displayValue: audits["aria-hidden-body"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-hidden-body"]["errorMessage"] || audits["aria-hidden-body"]["displayValue"])
            },
            "aria-hidden-focus": {
                title: audits["aria-hidden-focus"]["title"],
                description: audits["aria-hidden-focus"]["description"],
                score: audits["aria-hidden-focus"]["score"],
                displayValue: audits["aria-hidden-focus"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-hidden-focus"]["errorMessage"] || audits["aria-hidden-focus"]["displayValue"])
            },
            "aria-input-field-name": {
                title: audits["aria-input-field-name"]["title"],
                description: audits["aria-input-field-name"]["description"],
                score: audits["aria-input-field-name"]["score"],
                displayValue: audits["aria-input-field-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-input-field-name"]["errorMessage"] || audits["aria-input-field-name"]["displayValue"])
            },
            "aria-meter-name": {
                title: audits["aria-meter-name"]["title"],
                description: audits["aria-meter-name"]["description"],
                score: audits["aria-meter-name"]["score"],
                displayValue: audits["aria-meter-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-meter-name"]["errorMessage"] || audits["aria-meter-name"]["displayValue"])
            },
            "aria-progressbar-name": {
                title: audits["aria-progressbar-name"]["title"],
                description: audits["aria-progressbar-name"]["description"],
                score: audits["aria-progressbar-name"]["score"],
                displayValue: audits["aria-progressbar-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-progressbar-name"]["errorMessage"] || audits["aria-progressbar-name"]["displayValue"])
            },
            "aria-required-attr": {
                title: audits["aria-required-attr"]["title"],
                description: audits["aria-required-attr"]["description"],
                score: audits["aria-required-attr"]["score"],
                displayValue: audits["aria-required-attr"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-required-attr"]["errorMessage"] || audits["aria-required-attr"]["displayValue"])
            },
            "aria-required-children": {
                title: audits["aria-required-children"]["title"],
                description: audits["aria-required-children"]["description"],
                score: audits["aria-required-children"]["score"],
                displayValue: audits["aria-required-children"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-required-children"]["errorMessage"] || audits["aria-required-children"]["displayValue"])
            },
            "aria-required-parent": {
                title: audits["aria-required-parent"]["title"],
                description: audits["aria-required-parent"]["description"],
                score: audits["aria-required-parent"]["score"],
                displayValue: audits["aria-required-parent"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-required-parent"]["errorMessage"] || audits["aria-required-parent"]["displayValue"])
            },
            "aria-roles": {
                title: audits["aria-roles"]["title"],
                description: audits["aria-roles"]["description"],
                score: audits["aria-roles"]["score"],
                displayValue: audits["aria-roles"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-roles"]["errorMessage"] || audits["aria-roles"]["displayValue"])
            },
            "aria-toggle-field-name": {
                title: audits["aria-toggle-field-name"]["title"],
                description: audits["aria-toggle-field-name"]["description"],
                score: audits["aria-toggle-field-name"]["score"],
                displayValue: audits["aria-toggle-field-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-toggle-field-name"]["errorMessage"] || audits["aria-toggle-field-name"]["displayValue"])
            },
            "aria-tooltip-name": {
                title: audits["aria-tooltip-name"]["title"],
                description: audits["aria-tooltip-name"]["description"],
                score: audits["aria-tooltip-name"]["score"],
                displayValue: audits["aria-tooltip-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-tooltip-name"]["errorMessage"] || audits["aria-tooltip-name"]["displayValue"])
            },
            "aria-treeitem-name": {
                title: audits["aria-treeitem-name"]["title"],
                description: audits["aria-treeitem-name"]["description"],
                score: audits["aria-treeitem-name"]["score"],
                displayValue: audits["aria-treeitem-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-treeitem-name"]["errorMessage"] || audits["aria-treeitem-name"]["displayValue"])
            },
            "aria-valid-attr-value": {
                title: audits["aria-valid-attr-value"]["title"],
                description: audits["aria-valid-attr-value"]["description"],
                score: audits["aria-valid-attr-value"]["score"],
                displayValue: audits["aria-valid-attr-value"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-valid-attr-value"]["errorMessage"] || audits["aria-valid-attr-value"]["displayValue"])
            },
            "aria-valid-attr": {
                title: audits["aria-valid-attr"]["title"],
                description: audits["aria-valid-attr"]["description"],
                score: audits["aria-valid-attr"]["score"],
                displayValue: audits["aria-valid-attr"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["aria-valid-attr"]["errorMessage"] || audits["aria-valid-attr"]["displayValue"])
            },
            "button-name": {
                title: audits["button-name"]["title"],
                description: audits["button-name"]["description"],
                score: audits["button-name"]["score"],
                displayValue: audits["button-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["button-name"]["errorMessage"] || audits["button-name"]["displayValue"])
            },
            "bypass": {
                title: audits["bypass"]["title"],
                description: audits["bypass"]["description"],
                score: audits["bypass"]["score"],
                displayValue: audits["bypass"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["bypass"]["errorMessage"] || audits["bypass"]["displayValue"])
            },
            "color-contrast": {
                title: audits["color-contrast"]["title"],
                description: audits["color-contrast"]["description"],
                score: audits["color-contrast"]["score"],
                displayValue: audits["color-contrast"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["color-contrast"]["errorMessage"] || audits["color-contrast"]["displayValue"])
            },
            "definition-list": {
                title: audits["definition-list"]["title"],
                description: audits["definition-list"]["description"],
                score: audits["definition-list"]["score"],
                displayValue: audits["definition-list"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["definition-list"]["errorMessage"] || audits["definition-list"]["displayValue"])
            },
            "dlitem": {
                title: audits["dlitem"]["title"],
                description: audits["dlitem"]["description"],
                score: audits["dlitem"]["score"],
                displayValue: audits["dlitem"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["dlitem"]["errorMessage"] || audits["dlitem"]["displayValue"])
            },
            "document-title": {
                title: audits["document-title"]["title"],
                description: audits["document-title"]["description"],
                score: audits["document-title"]["score"],
                displayValue: audits["document-title"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["document-title"]["errorMessage"] || audits["document-title"]["displayValue"])
            },
            "duplicate-id-active": {
                title: audits["duplicate-id-active"]["title"],
                description: audits["duplicate-id-active"]["description"],
                score: audits["duplicate-id-active"]["score"],
                displayValue: audits["duplicate-id-active"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["duplicate-id-active"]["errorMessage"] || audits["duplicate-id-active"]["displayValue"])
            },
            "duplicate-id-aria": {
                title: audits["duplicate-id-aria"]["title"],
                description: audits["duplicate-id-aria"]["description"],
                score: audits["duplicate-id-aria"]["score"],
                displayValue: audits["duplicate-id-aria"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["duplicate-id-aria"]["errorMessage"] || audits["duplicate-id-aria"]["displayValue"])
            },
            "form-field-multiple-labels": {
                title: audits["form-field-multiple-labels"]["title"],
                description: audits["form-field-multiple-labels"]["description"],
                score: audits["form-field-multiple-labels"]["score"],
                displayValue: audits["form-field-multiple-labels"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["form-field-multiple-labels"]["errorMessage"] || audits["form-field-multiple-labels"]["displayValue"])
            },
            "frame-title": {
                title: audits["frame-title"]["title"],
                description: audits["frame-title"]["description"],
                score: audits["frame-title"]["score"],
                displayValue: audits["frame-title"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["frame-title"]["errorMessage"] || audits["frame-title"]["displayValue"])
            },
            "heading-order": {
                title: audits["heading-order"]["title"],
                description: audits["heading-order"]["description"],
                score: audits["heading-order"]["score"],
                displayValue: audits["heading-order"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["heading-order"]["errorMessage"] || audits["heading-order"]["displayValue"])
            },
            "html-has-lang": {
                title: audits["html-has-lang"]["title"],
                description: audits["html-has-lang"]["description"],
                score: audits["html-has-lang"]["score"],
                displayValue: audits["html-has-lang"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["html-has-lang"]["errorMessage"] || audits["html-has-lang"]["displayValue"])
            },
            "html-lang-valid": {
                title: audits["html-lang-valid"]["title"],
                description: audits["html-lang-valid"]["description"],
                score: audits["html-lang-valid"]["score"],
                displayValue: audits["html-lang-valid"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["html-lang-valid"]["errorMessage"] || audits["html-lang-valid"]["displayValue"])
            },
            "image-alt": {
                title: audits["image-alt"]["title"],
                description: audits["image-alt"]["description"],
                score: audits["image-alt"]["score"],
                displayValue: audits["image-alt"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["image-alt"]["errorMessage"] || audits["image-alt"]["displayValue"])
            },
            "input-image-alt": {
                title: audits["input-image-alt"]["title"],
                description: audits["input-image-alt"]["description"],
                score: audits["input-image-alt"]["score"],
                displayValue: audits["input-image-alt"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["input-image-alt"]["errorMessage"] || audits["input-image-alt"]["displayValue"])
            },
            "label": {
                title: audits["label"]["title"],
                description: audits["label"]["description"],
                score: audits["label"]["score"],
                displayValue: audits["label"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["label"]["errorMessage"] || audits["label"]["displayValue"])
            },
            "link-name": {
                title: audits["link-name"]["title"],
                description: audits["link-name"]["description"],
                score: audits["link-name"]["score"],
                displayValue: audits["link-name"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["link-name"]["errorMessage"] || audits["link-name"]["displayValue"])
            },
            "list": {
                title: audits["list"]["title"],
                description: audits["list"]["description"],
                score: audits["list"]["score"],
                displayValue: audits["list"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["list"]["errorMessage"] || audits["list"]["displayValue"])
            },
            "listitem": {
                title: audits["listitem"]["title"],
                description: audits["listitem"]["description"],
                score: audits["listitem"]["score"],
                displayValue: audits["listitem"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["listitem"]["errorMessage"] || audits["listitem"]["displayValue"])
            },
            "meta-refresh": {
                title: audits["meta-refresh"]["title"],
                description: audits["meta-refresh"]["description"],
                score: audits["meta-refresh"]["score"],
                displayValue: audits["meta-refresh"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["meta-refresh"]["errorMessage"] || audits["meta-refresh"]["displayValue"])
            },
            "meta-viewport": {
                title: audits["meta-viewport"]["title"],
                description: audits["meta-viewport"]["description"],
                score: audits["meta-viewport"]["score"],
                displayValue: audits["meta-viewport"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["meta-viewport"]["errorMessage"] || audits["meta-viewport"]["displayValue"])
            },
            "object-alt": {
                title: audits["object-alt"]["title"],
                description: audits["object-alt"]["description"],
                score: audits["object-alt"]["score"],
                displayValue: audits["object-alt"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["object-alt"]["errorMessage"] || audits["object-alt"]["displayValue"])
            },
            "tabindex": {
                title: audits["tabindex"]["title"],
                description: audits["tabindex"]["description"],
                score: audits["tabindex"]["score"],
                displayValue: audits["tabindex"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["tabindex"]["errorMessage"] || audits["tabindex"]["displayValue"])
            },
            "td-headers-attr": {
                title: audits["td-headers-attr"]["title"],
                description: audits["td-headers-attr"]["description"],
                score: audits["td-headers-attr"]["score"],
                displayValue: audits["td-headers-attr"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["td-headers-attr"]["errorMessage"] || audits["td-headers-attr"]["displayValue"])
            },
            "th-has-data-cells": {
                title: audits["th-has-data-cells"]["title"],
                description: audits["th-has-data-cells"]["description"],
                score: audits["th-has-data-cells"]["score"],
                displayValue: audits["th-has-data-cells"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["th-has-data-cells"]["errorMessage"] || audits["th-has-data-cells"]["displayValue"])
            },
            "valid-lang": {
                title: audits["valid-lang"]["title"],
                description: audits["valid-lang"]["description"],
                score: audits["valid-lang"]["score"],
                displayValue: audits["valid-lang"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["valid-lang"]["errorMessage"] || audits["valid-lang"]["displayValue"])
            },
            "video-caption": {
                title: audits["video-caption"]["title"],
                description: audits["video-caption"]["description"],
                score: audits["video-caption"]["score"],
                displayValue: audits["video-caption"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["video-caption"]["errorMessage"] || audits["video-caption"]["displayValue"])
            },
            "custom-controls-labels": {
                title: audits["custom-controls-labels"]["title"],
                description: audits["custom-controls-labels"]["description"],
                score: audits["custom-controls-labels"]["score"],
                displayValue: audits["custom-controls-labels"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["custom-controls-labels"]["errorMessage"] || "Manual Assessment Needed")
            },
            "custom-controls-roles": {
                title: audits["custom-controls-roles"]["title"],
                description: audits["custom-controls-roles"]["description"],
                score: audits["custom-controls-roles"]["score"],
                displayValue: audits["custom-controls-roles"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["custom-controls-roles"]["errorMessage"] || "Manual Assessment Needed")
            },
            "focus-traps": {
                title: audits["focus-traps"]["title"],
                description: audits["focus-traps"]["description"],
                score: audits["focus-traps"]["score"],
                displayValue: audits["focus-traps"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["focus-traps"]["errorMessage"] || "Manual Assessment Needed")
            },
            "focusable-controls": {
                title: audits["focusable-controls"]["title"],
                description: audits["focusable-controls"]["description"],
                score: audits["focusable-controls"]["score"],
                displayValue: audits["focusable-controls"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["focusable-controls"]["errorMessage"] || "Manual Assessment Needed")
            },
            "interactive-element-affordance": {
                title: audits["interactive-element-affordance"]["title"],
                description: audits["interactive-element-affordance"]["description"],
                score: audits["interactive-element-affordance"]["score"],
                displayValue: audits["interactive-element-affordance"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["interactive-element-affordance"]["errorMessage"] || "Manual Assessment Needed")
            },
            "logical-tab-order": {
                title: audits["logical-tab-order"]["title"],
                description: audits["logical-tab-order"]["description"],
                score: audits["logical-tab-order"]["score"],
                displayValue: audits["logical-tab-order"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["logical-tab-order"]["errorMessage"] || "Manual Assessment Needed")
            },
            "managed-focus": {
                title: audits["managed-focus"]["title"],
                description: audits["managed-focus"]["description"],
                score: audits["managed-focus"]["score"],
                displayValue: audits["managed-focus"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["managed-focus"]["errorMessage"] || "Manual Assessment Needed")
            },
            "offscreen-content-hidden": {
                title: audits["offscreen-content-hidden"]["title"],
                description: audits["offscreen-content-hidden"]["description"],
                score: audits["offscreen-content-hidden"]["score"],
                displayValue: audits["offscreen-content-hidden"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["offscreen-content-hidden"]["errorMessage"] || "Manual Assessment Needed")
            },
            "visual-order-follows-dom": {
                title: audits["visual-order-follows-dom"]["title"],
                description: audits["visual-order-follows-dom"]["description"],
                score: audits["visual-order-follows-dom"]["score"],
                displayValue: audits["visual-order-follows-dom"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["visual-order-follows-dom"]["errorMessage"] || "Manual Assessment Needed")
            },
            "use-landmarks": {
                title: audits["use-landmarks"]["title"],
                description: audits["use-landmarks"]["description"],
                score: audits["use-landmarks"]["score"],
                displayValue: audits["use-landmarks"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["use-landmarks"]["errorMessage"] || "Manual Assessment Needed")
            },
            "uses-long-cache-ttl": {
                title: audits["uses-long-cache-ttl"]["title"],
                description: audits["uses-long-cache-ttl"]["description"],
                score: audits["uses-long-cache-ttl"]["score"],
                displayValue: audits["uses-long-cache-ttl"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-long-cache-ttl"]["errorMessage"] || audits["uses-long-cache-ttl"]["displayValue"])
            },
            "total-byte-weight": {
                title: audits["total-byte-weight"]["title"],
                description: audits["total-byte-weight"]["description"],
                score: audits["total-byte-weight"]["score"],
                displayValue: audits["total-byte-weight"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["total-byte-weight"]["errorMessage"] || audits["total-byte-weight"]["displayValue"])
            },
            "offscreen-images": {
                title: audits["offscreen-images"]["title"],
                description: audits["offscreen-images"]["description"],
                score: audits["offscreen-images"]["score"],
                displayValue: audits["offscreen-images"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["offscreen-images"]["errorMessage"] || audits["offscreen-images"]["displayValue"])
            },
            "render-blocking-resources": {
                title: audits["render-blocking-resources"]["title"],
                description: audits["render-blocking-resources"]["description"],
                score: audits["render-blocking-resources"]["score"],
                displayValue: audits["render-blocking-resources"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["render-blocking-resources"]["errorMessage"] || audits["render-blocking-resources"]["displayValue"])
            },
            "unminified-css": {
                title: audits["unminified-css"]["title"],
                description: audits["unminified-css"]["description"],
                score: audits["unminified-css"]["score"],
                displayValue: audits["unminified-css"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["unminified-css"]["errorMessage"] || audits["unminified-css"]["displayValue"])
            },
            "unminified-javascript": {
                title: audits["unminified-javascript"]["title"],
                description: audits["unminified-javascript"]["description"],
                score: audits["unminified-javascript"]["score"],
                displayValue: audits["unminified-javascript"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["unminified-javascript"]["errorMessage"] || audits["unminified-javascript"]["displayValue"])
            },
            "unused-css-rules": {
                title: audits["unused-css-rules"]["title"],
                description: audits["unused-css-rules"]["description"],
                score: audits["unused-css-rules"]["score"],
                displayValue: audits["unused-css-rules"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["unused-css-rules"]["errorMessage"] || audits["unused-css-rules"]["displayValue"])
            },
            "unused-javascript": {
                title: audits["unused-javascript"]["title"],
                description: audits["unused-javascript"]["description"],
                score: audits["unused-javascript"]["score"],
                displayValue: audits["unused-javascript"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["unused-javascript"]["errorMessage"] || audits["unused-javascript"]["displayValue"])
            },
            "modern-image-formats": {
                title: audits["modern-image-formats"]["title"],
                description: audits["modern-image-formats"]["description"],
                score: audits["modern-image-formats"]["score"],
                displayValue: audits["modern-image-formats"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["modern-image-formats"]["errorMessage"] || audits["modern-image-formats"]["displayValue"])
            },
            "uses-optimized-images": {
                title: audits["uses-optimized-images"]["title"],
                description: audits["uses-optimized-images"]["description"],
                score: audits["uses-optimized-images"]["score"],
                displayValue: audits["uses-optimized-images"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-optimized-images"]["errorMessage"] || audits["uses-optimized-images"]["displayValue"])
            },
            "uses-text-compression": {
                title: audits["uses-text-compression"]["title"],
                description: audits["uses-text-compression"]["description"],
                score: audits["uses-text-compression"]["score"],
                displayValue: audits["uses-text-compression"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-text-compression"]["errorMessage"] || audits["uses-text-compression"]["displayValue"])
            },
            "uses-responsive-images": {
                title: audits["uses-responsive-images"]["title"],
                description: audits["uses-responsive-images"]["description"],
                score: audits["uses-responsive-images"]["score"],
                displayValue: audits["uses-responsive-images"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-responsive-images"]["errorMessage"] || audits["uses-responsive-images"]["displayValue"])
            },
            "efficient-animated-content": {
                title: audits["efficient-animated-content"]["title"],
                description: audits["efficient-animated-content"]["description"],
                score: audits["efficient-animated-content"]["score"],
                displayValue: audits["efficient-animated-content"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["efficient-animated-content"]["errorMessage"] || audits["efficient-animated-content"]["displayValue"])
            },
            "duplicated-javascript": {
                title: audits["duplicated-javascript"]["title"],
                description: audits["duplicated-javascript"]["description"],
                score: audits["duplicated-javascript"]["score"],
                displayValue: audits["duplicated-javascript"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["duplicated-javascript"]["errorMessage"] || audits["duplicated-javascript"]["displayValue"])
            },
            "legacy-javascript": {
                title: audits["legacy-javascript"]["title"],
                description: audits["legacy-javascript"]["description"],
                score: audits["legacy-javascript"]["score"],
                displayValue: audits["legacy-javascript"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["legacy-javascript"]["errorMessage"] || audits["legacy-javascript"]["displayValue"])
            },
            "doctype": {
                title: audits["doctype"]["title"],
                description: audits["doctype"]["description"],
                score: audits["doctype"]["score"],
                displayValue: audits["doctype"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["doctype"]["errorMessage"] || audits["doctype"]["displayValue"])
            },
            "charset": {
                title: audits["charset"]["title"],
                description: audits["charset"]["description"],
                score: audits["charset"]["score"],
                displayValue: audits["charset"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["charset"]["errorMessage"] || audits["charset"]["displayValue"])
            },
            "dom-size": {
                title: audits["dom-size"]["title"],
                description: audits["dom-size"]["description"],
                score: audits["dom-size"]["score"],
                displayValue: audits["dom-size"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["dom-size"]["errorMessage"] || audits["dom-size"]["displayValue"])
            },
            "geolocation-on-start": {
                title: audits["geolocation-on-start"]["title"],
                description: audits["geolocation-on-start"]["description"],
                score: audits["geolocation-on-start"]["score"],
                displayValue: audits["geolocation-on-start"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["geolocation-on-start"]["errorMessage"] || audits["geolocation-on-start"]["displayValue"])
            },
            "inspector-issues": {
                title: audits["inspector-issues"]["title"],
                description: audits["inspector-issues"]["description"],
                score: audits["inspector-issues"]["score"],
                displayValue: audits["inspector-issues"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["inspector-issues"]["errorMessage"] || audits["inspector-issues"]["displayValue"])
            },
            "no-document-write": {
                title: audits["no-document-write"]["title"],
                description: audits["no-document-write"]["description"],
                score: audits["no-document-write"]["score"],
                displayValue: audits["no-document-write"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["no-document-write"]["errorMessage"] || audits["no-document-write"]["displayValue"])
            },
            "no-vulnerable-libraries": {
                title: audits["no-vulnerable-libraries"]["title"],
                description: audits["no-vulnerable-libraries"]["description"],
                score: audits["no-vulnerable-libraries"]["score"],
                displayValue: audits["no-vulnerable-libraries"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["no-vulnerable-libraries"]["errorMessage"] || audits["no-vulnerable-libraries"]["displayValue"])
            },
            "js-libraries": {
                title: audits["js-libraries"]["title"],
                description: audits["js-libraries"]["description"],
                score: audits["js-libraries"]["score"],
                displayValue: audits["js-libraries"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["js-libraries"]["errorMessage"] || audits["js-libraries"]["displayValue"])
            },
            "notification-on-start": {
                title: audits["notification-on-start"]["title"],
                description: audits["notification-on-start"]["description"],
                score: audits["notification-on-start"]["score"],
                displayValue: audits["notification-on-start"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["notification-on-start"]["errorMessage"] || audits["notification-on-start"]["displayValue"])
            },
            "password-inputs-can-be-pasted-into": {
                title: audits["password-inputs-can-be-pasted-into"]["title"],
                description: audits["password-inputs-can-be-pasted-into"]["description"],
                score: audits["password-inputs-can-be-pasted-into"]["score"],
                displayValue: audits["password-inputs-can-be-pasted-into"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["password-inputs-can-be-pasted-into"]["errorMessage"] || audits["password-inputs-can-be-pasted-into"]["displayValue"])
            },
            "uses-http2": {
                title: audits["uses-http2"]["title"],
                description: audits["uses-http2"]["description"],
                score: audits["uses-http2"]["score"],
                displayValue: audits["uses-http2"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-http2"]["errorMessage"] || audits["uses-http2"]["displayValue"])
            },
            "uses-passive-event-listeners": {
                title: audits["uses-passive-event-listeners"]["title"],
                description: audits["uses-passive-event-listeners"]["description"],
                score: audits["uses-passive-event-listeners"]["score"],
                displayValue: audits["uses-passive-event-listeners"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["uses-passive-event-listeners"]["errorMessage"] || audits["uses-passive-event-listeners"]["displayValue"])
            },
            "meta-description": {
                title: audits["meta-description"]["title"],
                description: audits["meta-description"]["description"],
                score: audits["meta-description"]["score"],
                displayValue: audits["meta-description"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["meta-description"]["errorMessage"] || audits["meta-description"]["displayValue"])
            },
            "http-status-code": {
                title: audits["http-status-code"]["title"],
                description: audits["http-status-code"]["description"],
                score: audits["http-status-code"]["score"],
                displayValue: audits["http-status-code"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["http-status-code"]["errorMessage"] || audits["http-status-code"]["displayValue"])
            },
            "font-size": {
                title: audits["font-size"]["title"],
                description: audits["font-size"]["description"],
                score: audits["font-size"]["score"],
                displayValue: audits["font-size"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["font-size"]["errorMessage"] || audits["font-size"]["displayValue"])
            },
            "link-text": {
                title: audits["link-text"]["title"],
                description: audits["link-text"]["description"],
                score: audits["link-text"]["score"],
                displayValue: audits["link-text"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["link-text"]["errorMessage"] || audits["link-text"]["displayValue"])
            },
            "crawlable-anchors": {
                title: audits["crawlable-anchors"]["title"],
                description: audits["crawlable-anchors"]["description"],
                score: audits["crawlable-anchors"]["score"],
                displayValue: audits["crawlable-anchors"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["crawlable-anchors"]["errorMessage"] || audits["crawlable-anchors"]["displayValue"])
            },
            "is-crawlable": {
                title: audits["is-crawlable"]["title"],
                description: audits["is-crawlable"]["description"],
                score: audits["is-crawlable"]["score"],
                displayValue: audits["is-crawlable"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["is-crawlable"]["errorMessage"] || audits["is-crawlable"]["displayValue"])
            },
            "robots-txt": {
                title: audits["robots-txt"]["title"],
                description: audits["robots-txt"]["description"],
                score: audits["robots-txt"]["score"],
                displayValue: audits["robots-txt"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["robots-txt"]["errorMessage"] || audits["robots-txt"]["displayValue"])
            },
            "tap-targets": {
                title: audits["tap-targets"]["title"],
                description: audits["tap-targets"]["description"],
                score: audits["tap-targets"]["score"],
                displayValue: audits["tap-targets"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["tap-targets"]["errorMessage"] || audits["tap-targets"]["displayValue"])
            },
            "hreflang": {
                title: audits["hreflang"]["title"],
                description: audits["hreflang"]["description"],
                score: audits["hreflang"]["score"],
                displayValue: audits["hreflang"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["hreflang"]["errorMessage"] || audits["hreflang"]["displayValue"])
            },
            "plugins": {
                title: audits["plugins"]["title"],
                description: audits["plugins"]["description"],
                score: audits["plugins"]["score"],
                displayValue: audits["plugins"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["plugins"]["errorMessage"] || audits["plugins"]["displayValue"])
            },
            "canonical": {
                title: audits["canonical"]["title"],
                description: audits["canonical"]["description"],
                score: audits["canonical"]["score"],
                displayValue: audits["canonical"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["canonical"]["errorMessage"] || audits["canonical"]["displayValue"])
            },
            "structured-data": {
                title: audits["structured-data"]["title"],
                description: audits["structured-data"]["description"],
                score: audits["structured-data"]["score"],
                displayValue: audits["structured-data"]["scoreDisplayMode"] === "notApplicable" ? "N/A" : (audits["structured-data"]["errorMessage"] || "Manual Assessment Needed")
            },
            diagnostics: {
                title: "Diagnostics",
                description: "Collection of useful page vitals.",
                details: [
                    { item: "Number of Requests", result: audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["numRequests"] : 0 },
                    { item: "Number of Scripts", result: audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["numScripts"] : 0 },
                    { item: "Number of Stylesheets", result: audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["numStylesheets"] : 0 },
                    { item: "Number of Fonts", result: audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["numFonts"] : 0 },
                    { item: "Number of Tasks", result: audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["numTasks"] : 0 },
                    { item: "Round-Trip Time", result: convertMS(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["rtt"] : 0) },
                    { item: "Throughput", result: convertBytes(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["throughput"] : 0) },
                    { item: "Max Round-Trip Time", result: convertMS(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["maxRtt"] : 0) },
                    { item: "Max Server Latency", result: convertMS(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["maxServerLatency"] : 0) },
                    { item: "Total Byte Weight", result: convertBytes(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["totalByteWeight"] : 0) },
                    { item: "Total Task Time", result: convertMS(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["totalTaskTime"] : 0) },
                    { item: "Transfer Size", result: convertBytes(audits["diagnostics"]["details"] ? audits["diagnostics"]["details"]["items"][0]["mainDocumentTransferSize"] : 0) }
                ]
            },
            percentages: {
                performance: audits['network-requests']['scoreDisplayMode'] !== 'error' ? performance : 0,
                seo: audits['network-requests']['scoreDisplayMode'] !== 'error' ? seo : 0,
                bestPractices: audits['network-requests']['scoreDisplayMode'] !== 'error' ? bestPractices : 0,
                accessibility: audits['network-requests']['scoreDisplayMode'] !== 'error' ? accessibility : 0,
                overallScore: audits['network-requests']['scoreDisplayMode'] !== 'error' ? overallScore : 0
            },
            success: audits['network-requests']['scoreDisplayMode'] === 'error' ? false : true
        })
    } catch {
        res.status(500).send({
            "is-on-https": {
                "title": "Uses HTTPS",
                "description": "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being served over HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more](https://web.dev/is-on-https/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "service-worker": {
                "title": "Registers a service worker that controls page and `start_url`",
                "description": "The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. [Learn more](https://web.dev/service-worker/).",
                "score": 0,
                "displayValue": "Required ServiceWorker gatherer did not run."
            },
            "viewport": {
                "title": "Has a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
                "description": "A `<meta name=\"viewport\">` not only optimizes your app for mobile screen sizes, but also prevents [a 300 millisecond delay to user input](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away). [Learn more](https://web.dev/viewport/).",
                "score": 0,
                "displayValue": "Required MetaElements gatherer did not run."
            },
            "first-contentful-paint": {
                "title": "First Contentful Paint",
                "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "largest-contentful-paint": {
                "title": "Largest Contentful Paint",
                "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "first-meaningful-paint": {
                "title": "First Meaningful Paint",
                "description": "First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "speed-index": {
                "title": "Speed Index",
                "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "screenshot-thumbnails": {
                "title": "Screenshot Thumbnails",
                "description": "This is what the load of your site looked like.",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "final-screenshot": {
                "title": "Final Screenshot",
                "description": "The last screenshot captured of the pageload.",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "total-blocking-time": {
                "title": "Total Blocking Time",
                "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "max-potential-fid": {
                "title": "Max Potential First Input Delay",
                "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "cumulative-layout-shift": {
                "title": "Cumulative Layout Shift",
                "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "errors-in-console": {
                "title": "No browser errors logged to the console",
                "description": "Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more](https://web.dev/errors-in-console/)",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "server-response-time": {
                "title": "Initial server response time was short",
                "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "interactive": {
                "title": "Time to Interactive",
                "description": "Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "user-timings": {
                "title": "User Timing marks and measures",
                "description": "Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. [Learn more](https://web.dev/user-timings/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "critical-request-chains": {
                "title": "Avoid chaining critical requests",
                "description": "The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "redirects": {
                "title": "Avoid multiple page redirects",
                "description": "Redirects introduce additional delays before the page can be loaded. [Learn more](https://web.dev/redirects/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "installable-manifest": {
                "title": "Web app manifest or service worker do not meet the installability requirements",
                "description": "Service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. With proper service worker and manifest implementations, browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement. [Learn more](https://web.dev/installable-manifest/).",
                "score": 0,
                "displayValue": "1 reason"
            },
            "apple-touch-icon": {
                "title": "Provides a valid `apple-touch-icon`",
                "description": "For ideal appearance on iOS when users add a progressive web app to the home screen, define an `apple-touch-icon`. It must point to a non-transparent 192px (or 180px) square PNG. [Learn More](https://web.dev/apple-touch-icon/).",
                "score": 0,
                "displayValue": "Required LinkElements gatherer did not run."
            },
            "splash-screen": {
                "title": "Is not configured for a custom splash screen",
                "description": "A themed splash screen ensures a high-quality experience when users launch your app from their homescreens. [Learn more](https://web.dev/splash-screen/).",
                "score": 0,
                "displayValue": "Failures: No manifest was fetched."
            },
            "themed-omnibox": {
                "title": "Sets a theme color for the address bar.",
                "description": "The browser address bar can be themed to match your site. [Learn more](https://web.dev/themed-omnibox/).",
                "score": 0,
                "displayValue": "Required MetaElements gatherer did not run."
            },
            "maskable-icon": {
                "title": "Manifest doesn't have a maskable icon",
                "description": "A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device. [Learn more](https://web.dev/maskable-icon-audit/).",
                "score": 0
            },
            "content-width": {
                "title": "Content is sized correctly for the viewport",
                "description": "If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens. [Learn more](https://web.dev/content-width/).",
                "score": 0,
                "displayValue": "Required ViewportDimensions gatherer did not run."
            },
            "image-aspect-ratio": {
                "title": "Displays images with correct aspect ratio",
                "description": "Image display dimensions should match natural aspect ratio. [Learn more](https://web.dev/image-aspect-ratio/).",
                "score": 0,
                "displayValue": "Required ImageElements gatherer did not run."
            },
            "image-size-responsive": {
                "title": "Serves images with appropriate resolution",
                "description": "Image natural dimensions should be proportional to the display size and the pixel ratio to maximize image clarity. [Learn more](https://web.dev/serve-responsive-images/).",
                "score": 0,
                "displayValue": "Required ImageElements gatherer did not run."
            },
            "preload-fonts": {
                "title": "Fonts with `font-display: optional` are preloaded",
                "description": "Preload `optional` fonts so first-time visitors may use them. [Learn more](https://web.dev/preload-optional-fonts/)",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "deprecations": {
                "title": "Avoids deprecated APIs",
                "description": "Deprecated APIs will eventually be removed from the browser. [Learn more](https://web.dev/deprecations/).",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "mainthread-work-breakdown": {
                "title": "Minimizes main-thread work",
                "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "bootup-time": {
                "title": "JavaScript execution time",
                "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "uses-rel-preload": {
                "title": "Preload key requests",
                "description": "Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn more](https://web.dev/uses-rel-preload/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "uses-rel-preconnect": {
                "title": "Preconnect to required origins",
                "description": "Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn more](https://web.dev/uses-rel-preconnect/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "font-display": {
                "title": "All text remains visible during webfont loads",
                "description": "Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading. [Learn more](https://web.dev/font-display/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "network-rtt": {
                "title": "Network Round Trip Times",
                "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more](https://hpbn.co/primer-on-latency-and-bandwidth/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "performance-budget": {
                "title": "Performance budget",
                "description": "Keep the quantity and size of network requests under the targets set by the provided performance budget. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "timing-budget": {
                "title": "Timing budget",
                "description": "Set a timing budget to help you keep an eye on the performance of your site. Performant sites load fast and respond to user input events quickly. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "resource-summary": {
                "title": "Keep request counts low and transfer sizes small",
                "description": "To set budgets for the quantity and size of page resources, add a budget.json file. [Learn more](https://web.dev/use-lighthouse-for-performance-budgets/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "third-party-summary": {
                "title": "Minimize third-party usage",
                "description": "Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn more](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "largest-contentful-paint-element": {
                "title": "Largest Contentful Paint element",
                "description": "This is the largest contentful element painted within the viewport. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "third-party-facades": {
                "title": "Lazy load third-party resources with facades",
                "description": "Some third-party embeds can be lazy loaded. Consider replacing them with a facade until they are required. [Learn more](https://web.dev/third-party-facades/).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "lcp-lazy-loaded": {
                "title": "Largest Contentful Paint image was not lazily loaded",
                "description": "Above-the-fold images that are lazily loaded render later in the page lifecycle, which can delay the largest contentful paint. [Learn more](https://web.dev/lcp-lazy-loading/).",
                "score": 0,
                "displayValue": "Required TraceElements gatherer did not run."
            },
            "layout-shift-elements": {
                "title": "Avoid large layout shifts",
                "description": "These DOM elements contribute most to the CLS of the page.",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "long-tasks": {
                "title": "Avoid long main-thread tasks",
                "description": "Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn more](https://web.dev/long-tasks-devtools/)",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "no-unload-listeners": {
                "title": "Avoids `unload` event listeners",
                "description": "The `unload` event does not fire reliably and listening for it can prevent browser optimizations like the Back-Forward Cache. Use `pagehide` or `visibilitychange` events instead. [Learn more](https://web.dev/bfcache/#never-use-the-unload-event)",
                "score": 0,
                "displayValue": "Required GlobalListeners gatherer did not run."
            },
            "non-composited-animations": {
                "title": "Avoid non-composited animations",
                "description": "Animations which are not composited can be janky and increase CLS. [Learn more](https://web.dev/non-composited-animations)",
                "score": 0,
                "displayValue": "Required TraceElements gatherer did not run."
            },
            "unsized-images": {
                "title": "Image elements have explicit `width` and `height`",
                "description": "Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn more](https://web.dev/optimize-cls/#images-without-dimensions)",
                "score": 0,
                "displayValue": "Required ImageElements gatherer did not run."
            },
            "valid-source-maps": {
                "title": "Page has valid source maps",
                "description": "Source maps translate minified code to the original source code. This helps developers debug in production. In addition, Lighthouse is able to provide further insights. Consider deploying source maps to take advantage of these benefits. [Learn more](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).",
                "score": 0,
                "displayValue": "Required ScriptElements gatherer did not run."
            },
            "preload-lcp-image": {
                "title": "Preload Largest Contentful Paint image",
                "description": "Preload the image used by the LCP element in order to improve your LCP time. [Learn more](https://web.dev/optimize-lcp/#preload-important-resources).",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "csp-xss": {
                "title": "Ensure CSP is effective against XSS attacks",
                "description": "A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. [Learn more](https://web.dev/csp-xss/)",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "script-treemap-data": {
                "title": "Script Treemap Data",
                "description": "Used for treemap app",
                "score": 0,
                "displayValue": "Required traces gatherer did not run."
            },
            "pwa-cross-browser": {
                "title": "Site works cross-browser",
                "description": "To reach the most number of users, sites should work across every major browser. [Learn more](https://web.dev/pwa-cross-browser/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "pwa-page-transitions": {
                "title": "Page transitions don't feel like they block on the network",
                "description": "Transitions should feel snappy as you tap around, even on a slow network. This experience is key to a user's perception of performance. [Learn more](https://web.dev/pwa-page-transitions/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "pwa-each-page-has-url": {
                "title": "Each page has a URL",
                "description": "Ensure individual pages are deep linkable via URL and that URLs are unique for the purpose of shareability on social media. [Learn more](https://web.dev/pwa-each-page-has-url/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "accesskeys": {
                "title": "`[accesskey]` values are unique",
                "description": "Access keys let users quickly focus a part of the page. For proper navigation, each access key must be unique. [Learn more](https://web.dev/accesskeys/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-allowed-attr": {
                "title": "`[aria-*]` attributes match their roles",
                "description": "Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn more](https://web.dev/aria-allowed-attr/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-command-name": {
                "title": "`button`, `link`, and `menuitem` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-hidden-body": {
                "title": "`[aria-hidden=\"true\"]` is not present on the document `<body>`",
                "description": "Assistive technologies, like screen readers, work inconsistently when `aria-hidden=\"true\"` is set on the document `<body>`. [Learn more](https://web.dev/aria-hidden-body/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-hidden-focus": {
                "title": "`[aria-hidden=\"true\"]` elements do not contain focusable descendents",
                "description": "Focusable descendents within an `[aria-hidden=\"true\"]` element prevent those interactive elements from being available to users of assistive technologies like screen readers. [Learn more](https://web.dev/aria-hidden-focus/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-input-field-name": {
                "title": "ARIA input fields have accessible names",
                "description": "When an input field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-meter-name": {
                "title": "ARIA `meter` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-progressbar-name": {
                "title": "ARIA `progressbar` elements have accessible names",
                "description": "When a `progressbar` element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-required-attr": {
                "title": "`[role]`s have all required `[aria-*]` attributes",
                "description": "Some ARIA roles have required attributes that describe the state of the element to screen readers. [Learn more](https://web.dev/aria-required-attr/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-required-children": {
                "title": "Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.",
                "description": "Some ARIA parent roles must contain specific child roles to perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-children/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-required-parent": {
                "title": "`[role]`s are contained by their required parent element",
                "description": "Some ARIA child roles must be contained by specific parent roles to properly perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-parent/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-roles": {
                "title": "`[role]` values are valid",
                "description": "ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more](https://web.dev/aria-roles/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-toggle-field-name": {
                "title": "ARIA toggle fields have accessible names",
                "description": "When a toggle field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-tooltip-name": {
                "title": "ARIA `tooltip` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-treeitem-name": {
                "title": "ARIA `treeitem` elements have accessible names",
                "description": "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-valid-attr-value": {
                "title": "`[aria-*]` attributes have valid values",
                "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more](https://web.dev/aria-valid-attr-value/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "aria-valid-attr": {
                "title": "`[aria-*]` attributes are valid and not misspelled",
                "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names. [Learn more](https://web.dev/aria-valid-attr/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "button-name": {
                "title": "Buttons have an accessible name",
                "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn more](https://web.dev/button-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "bypass": {
                "title": "The page contains a heading, skip link, or landmark region",
                "description": "Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently. [Learn more](https://web.dev/bypass/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "color-contrast": {
                "title": "Background and foreground colors have a sufficient contrast ratio",
                "description": "Low-contrast text is difficult or impossible for many users to read. [Learn more](https://web.dev/color-contrast/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "definition-list": {
                "title": "`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.",
                "description": "When definition lists are not properly marked up, screen readers may produce confusing or inaccurate output. [Learn more](https://web.dev/definition-list/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "dlitem": {
                "title": "Definition list items are wrapped in `<dl>` elements",
                "description": "Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>` element to ensure that screen readers can properly announce them. [Learn more](https://web.dev/dlitem/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "document-title": {
                "title": "Document has a `<title>` element",
                "description": "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "duplicate-id-active": {
                "title": "`[id]` attributes on active, focusable elements are unique",
                "description": "All focusable elements must have a unique `id` to ensure that they're visible to assistive technologies. [Learn more](https://web.dev/duplicate-id-active/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "duplicate-id-aria": {
                "title": "ARIA IDs are unique",
                "description": "The value of an ARIA ID must be unique to prevent other instances from being overlooked by assistive technologies. [Learn more](https://web.dev/duplicate-id-aria/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "form-field-multiple-labels": {
                "title": "No form fields have multiple labels",
                "description": "Form fields with multiple labels can be confusingly announced by assistive technologies like screen readers which use either the first, the last, or all of the labels. [Learn more](https://web.dev/form-field-multiple-labels/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "frame-title": {
                "title": "`<frame>` or `<iframe>` elements have a title",
                "description": "Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "heading-order": {
                "title": "Heading elements appear in a sequentially-descending order",
                "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more](https://web.dev/heading-order/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "html-has-lang": {
                "title": "`<html>` element has a `[lang]` attribute",
                "description": "If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader. If the page isn't actually in the default language, then the screen reader might not announce the page's text correctly. [Learn more](https://web.dev/html-has-lang/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "html-lang-valid": {
                "title": "`<html>` element has a valid value for its `[lang]` attribute",
                "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) helps screen readers announce text properly. [Learn more](https://web.dev/html-lang-valid/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "image-alt": {
                "title": "Image elements have `[alt]` attributes",
                "description": "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "input-image-alt": {
                "title": "`<input type=\"image\">` elements have `[alt]` text",
                "description": "When an image is being used as an `<input>` button, providing alternative text can help screen reader users understand the purpose of the button. [Learn more](https://web.dev/input-image-alt/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "label": {
                "title": "Form elements have associated labels",
                "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more](https://web.dev/label/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "link-name": {
                "title": "Links have a discernible name",
                "description": "Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn more](https://web.dev/link-name/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "list": {
                "title": "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).",
                "description": "Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. [Learn more](https://web.dev/list/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "listitem": {
                "title": "List items (`<li>`) are contained within `<ul>` or `<ol>` parent elements",
                "description": "Screen readers require list items (`<li>`) to be contained within a parent `<ul>` or `<ol>` to be announced properly. [Learn more](https://web.dev/listitem/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "meta-refresh": {
                "title": "The document does not use `<meta http-equiv=\"refresh\">`",
                "description": "Users do not expect a page to refresh automatically, and doing so will move focus back to the top of the page. This may create a frustrating or confusing experience. [Learn more](https://web.dev/meta-refresh/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "meta-viewport": {
                "title": "`[user-scalable=\"no\"]` is not used in the `<meta name=\"viewport\">` element and the `[maximum-scale]` attribute is not less than 5.",
                "description": "Disabling zooming is problematic for users with low vision who rely on screen magnification to properly see the contents of a web page. [Learn more](https://web.dev/meta-viewport/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "object-alt": {
                "title": "`<object>` elements have alternate text",
                "description": "Screen readers cannot translate non-text content. Adding alternate text to `<object>` elements helps screen readers convey meaning to users. [Learn more](https://web.dev/object-alt/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "tabindex": {
                "title": "No element has a `[tabindex]` value greater than 0",
                "description": "A value greater than 0 implies an explicit navigation ordering. Although technically valid, this often creates frustrating experiences for users who rely on assistive technologies. [Learn more](https://web.dev/tabindex/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "td-headers-attr": {
                "title": "Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.",
                "description": "Screen readers have features to make navigating tables easier. Ensuring `<td>` cells using the `[headers]` attribute only refer to other cells in the same table may improve the experience for screen reader users. [Learn more](https://web.dev/td-headers-attr/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "th-has-data-cells": {
                "title": "`<th>` elements and elements with `[role=\"columnheader\"/\"rowheader\"]` have data cells they describe.",
                "description": "Screen readers have features to make navigating tables easier. Ensuring table headers always refer to some set of cells may improve the experience for screen reader users. [Learn more](https://web.dev/th-has-data-cells/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "valid-lang": {
                "title": "`[lang]` attributes have a valid value",
                "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) on elements helps ensure that text is pronounced correctly by a screen reader. [Learn more](https://web.dev/valid-lang/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "video-caption": {
                "title": "`<video>` elements contain a `<track>` element with `[kind=\"captions\"]`",
                "description": "When a video provides a caption it is easier for deaf and hearing impaired users to access its information. [Learn more](https://web.dev/video-caption/).",
                "score": 0,
                "displayValue": "Required Accessibility gatherer did not run."
            },
            "custom-controls-labels": {
                "title": "Custom controls have associated labels",
                "description": "Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more](https://web.dev/custom-controls-labels/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "custom-controls-roles": {
                "title": "Custom controls have ARIA roles",
                "description": "Custom interactive controls have appropriate ARIA roles. [Learn more](https://web.dev/custom-control-roles/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "focus-traps": {
                "title": "User focus is not accidentally trapped in a region",
                "description": "A user can tab into and out of any control or region without accidentally trapping their focus. [Learn more](https://web.dev/focus-traps/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "focusable-controls": {
                "title": "Interactive controls are keyboard focusable",
                "description": "Custom interactive controls are keyboard focusable and display a focus indicator. [Learn more](https://web.dev/focusable-controls/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "interactive-element-affordance": {
                "title": "Interactive elements indicate their purpose and state",
                "description": "Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn more](https://web.dev/interactive-element-affordance/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "logical-tab-order": {
                "title": "The page has a logical tab order",
                "description": "Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more](https://web.dev/logical-tab-order/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "managed-focus": {
                "title": "The user's focus is directed to new content added to the page",
                "description": "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn more](https://web.dev/managed-focus/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "offscreen-content-hidden": {
                "title": "Offscreen content is hidden from assistive technology",
                "description": "Offscreen content is hidden with display: none or aria-hidden=true. [Learn more](https://web.dev/offscreen-content-hidden/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "use-landmarks": {
                "title": "HTML5 landmark elements are used to improve navigation",
                "description": "Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more](https://web.dev/use-landmarks/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "visual-order-follows-dom": {
                "title": "Visual order on the page follows DOM order",
                "description": "DOM order matches the visual order, improving navigation for assistive technology. [Learn more](https://web.dev/visual-order-follows-dom/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "uses-long-cache-ttl": {
                "title": "Uses efficient cache policy on static assets",
                "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more](https://web.dev/uses-long-cache-ttl/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "total-byte-weight": {
                "title": "Avoids enormous network payloads",
                "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn more](https://web.dev/total-byte-weight/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "offscreen-images": {
                "title": "Defer offscreen images",
                "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn more](https://web.dev/offscreen-images/).",
                "score": 0,
                "displayValue": "Required ImageElements gatherer did not run."
            },
            "render-blocking-resources": {
                "title": "Eliminate render-blocking resources",
                "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn more](https://web.dev/render-blocking-resources/).",
                "score": 0,
                "displayValue": "Required TagsBlockingFirstPaint gatherer did not run."
            },
            "unminified-css": {
                "title": "Minify CSS",
                "description": "Minifying CSS files can reduce network payload sizes. [Learn more](https://web.dev/unminified-css/).",
                "score": 0,
                "displayValue": "Required CSSUsage gatherer did not run."
            },
            "unminified-javascript": {
                "title": "Minify JavaScript",
                "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn more](https://web.dev/unminified-javascript/).",
                "score": 0,
                "displayValue": "Required ScriptElements gatherer did not run."
            },
            "unused-css-rules": {
                "title": "Reduce unused CSS",
                "description": "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn more](https://web.dev/unused-css-rules/).",
                "score": 0,
                "displayValue": "Required CSSUsage gatherer did not run."
            },
            "unused-javascript": {
                "title": "Reduce unused JavaScript",
                "description": "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn more](https://web.dev/unused-javascript/).",
                "score": 0,
                "displayValue": "Required JsUsage gatherer did not run."
            },
            "modern-image-formats": {
                "title": "Serve images in next-gen formats",
                "description": "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more](https://web.dev/uses-webp-images/).",
                "score": 0,
                "displayValue": "Required OptimizedImages gatherer did not run."
            },
            "uses-optimized-images": {
                "title": "Efficiently encode images",
                "description": "Optimized images load faster and consume less cellular data. [Learn more](https://web.dev/uses-optimized-images/).",
                "score": 0,
                "displayValue": "Required OptimizedImages gatherer did not run."
            },
            "uses-text-compression": {
                "title": "Enable text compression",
                "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more](https://web.dev/uses-text-compression/).",
                "score": 0,
                "displayValue": "Required ResponseCompression gatherer did not run."
            },
            "uses-responsive-images": {
                "title": "Properly size images",
                "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn more](https://web.dev/uses-responsive-images/).",
                "score": 0,
                "displayValue": "Required ImageElements gatherer did not run."
            },
            "efficient-animated-content": {
                "title": "Use video formats for animated content",
                "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more](https://web.dev/efficient-animated-content/)",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "duplicated-javascript": {
                "title": "Remove duplicate modules in JavaScript bundles",
                "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "legacy-javascript": {
                "title": "Avoid serving legacy JavaScript to modern browsers",
                "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn More](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "doctype": {
                "title": "Page has the HTML doctype",
                "description": "Specifying a doctype prevents the browser from switching to quirks-mode. [Learn more](https://web.dev/doctype/).",
                "score": 0,
                "displayValue": "Required Doctype gatherer did not run."
            },
            "charset": {
                "title": "Properly defines charset",
                "description": "A character encoding declaration is required. It can be done with a `<meta>` tag in the first 1024 bytes of the HTML or in the Content-Type HTTP response header. [Learn more](https://web.dev/charset/).",
                "score": 0,
                "displayValue": "Required MainDocumentContent gatherer did not run."
            },
            "dom-size": {
                "title": "Avoids an excessive DOM size",
                "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn more](https://web.dev/dom-size/).",
                "score": 0,
                "displayValue": "Required DOMStats gatherer did not run."
            },
            "geolocation-on-start": {
                "title": "Avoids requesting the geolocation permission on page load",
                "description": "Users are mistrustful of or confused by sites that request their location without context. Consider tying the request to a user action instead. [Learn more](https://web.dev/geolocation-on-start/).",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "inspector-issues": {
                "title": "No issues in the `Issues` panel in Chrome Devtools",
                "description": "Issues logged to the `Issues` panel in Chrome Devtools indicate unresolved problems. They can come from network request failures, insufficient security controls, and other browser concerns. Open up the Issues panel in Chrome DevTools for more details on each issue.",
                "score": 0,
                "displayValue": "Required InspectorIssues gatherer did not run."
            },
            "no-document-write": {
                "title": "Avoids `document.write()`",
                "description": "For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn more](https://web.dev/no-document-write/).",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "no-vulnerable-libraries": {
                "title": "Avoids front-end JavaScript libraries with known security vulnerabilities",
                "description": "Some third-party scripts may contain known security vulnerabilities that are easily identified and exploited by attackers. [Learn more](https://web.dev/no-vulnerable-libraries/).",
                "score": 0
            },
            "js-libraries": {
                "title": "Detected JavaScript libraries",
                "description": "All front-end JavaScript libraries detected on the page. [Learn more](https://web.dev/js-libraries/).",
                "score": 0,
            },
            "notification-on-start": {
                "title": "Avoids requesting the notification permission on page load",
                "description": "Users are mistrustful of or confused by sites that request to send notifications without context. Consider tying the request to user gestures instead. [Learn more](https://web.dev/notification-on-start/).",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "password-inputs-can-be-pasted-into": {
                "title": "Allows users to paste into password fields",
                "description": "Preventing password pasting undermines good security policy. [Learn more](https://web.dev/password-inputs-can-be-pasted-into/).",
                "score": 0,
                "displayValue": "Required PasswordInputsWithPreventedPaste gatherer did not run."
            },
            "uses-http2": {
                "title": "Use HTTP/2",
                "description": "HTTP/2 offers many benefits over HTTP/1.1, including binary headers and multiplexing. [Learn more](https://web.dev/uses-http2/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "uses-passive-event-listeners": {
                "title": "Uses passive listeners to improve scrolling performance",
                "description": "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more](https://web.dev/uses-passive-event-listeners/).",
                "score": 0,
                "displayValue": "Required ConsoleMessages gatherer did not run."
            },
            "meta-description": {
                "title": "Document has a meta description",
                "description": "Meta descriptions may be included in search results to concisely summarize page content. [Learn more](https://web.dev/meta-description/).",
                "score": 0,
                "displayValue": "Required MetaElements gatherer did not run."
            },
            "http-status-code": {
                "title": "Page has successful HTTP status code",
                "description": "Pages with unsuccessful HTTP status codes may not be indexed properly. [Learn more](https://web.dev/http-status-code/).",
                "score": 0,
                "displayValue": "Required devtoolsLogs gatherer did not run."
            },
            "font-size": {
                "title": "Document uses legible font sizes",
                "description": "Font sizes less than 12px are too small to be legible and require mobile visitors to “pinch to zoom” in order to read. Strive to have >60% of page text ≥12px. [Learn more](https://web.dev/font-size/).",
                "score": 0,
                "displayValue": "Required FontSize gatherer did not run."
            },
            "link-text": {
                "title": "Links have descriptive text",
                "description": "Descriptive link text helps search engines understand your content. [Learn more](https://web.dev/link-text/).",
                "score": 0,
                "displayValue": "Required AnchorElements gatherer did not run."
            },
            "crawlable-anchors": {
                "title": "Links are crawlable",
                "description": "Search engines may use `href` attributes on links to crawl websites. Ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered. [Learn More](https://support.google.com/webmasters/answer/9112205)",
                "score": 0,
                "displayValue": "Required AnchorElements gatherer did not run."
            },
            "is-crawlable": {
                "title": "Page isn’t blocked from indexing",
                "description": "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more](https://web.dev/is-crawable/).",
                "score": 0,
                "displayValue": "Required MetaElements gatherer did not run."
            },
            "robots-txt": {
                "title": "robots.txt is valid",
                "description": "If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more](https://web.dev/robots-txt/).",
                "score": 0,
                "displayValue": "Required RobotsTxt gatherer did not run."
            },
            "tap-targets": {
                "title": "Tap targets are sized appropriately",
                "description": "Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them, to be easy enough to tap without overlapping onto other elements. [Learn more](https://web.dev/tap-targets/).",
                "score": 0,
                "displayValue": "Required MetaElements gatherer did not run."
            },
            "hreflang": {
                "title": "Document has a valid `hreflang`",
                "description": "hreflang links tell search engines what version of a page they should list in search results for a given language or region. [Learn more](https://web.dev/hreflang/).",
                "score": 0,
                "displayValue": "Required LinkElements gatherer did not run."
            },
            "plugins": {
                "title": "Document avoids plugins",
                "description": "Search engines can't index plugin content, and many devices restrict plugins or don't support them. [Learn more](https://web.dev/plugins/).",
                "score": 0,
                "displayValue": "Required EmbeddedContent gatherer did not run."
            },
            "canonical": {
                "title": "Document has a valid `rel=canonical`",
                "description": "Canonical links suggest which URL to show in search results. [Learn more](https://web.dev/canonical/).",
                "score": 0,
                "displayValue": "Required LinkElements gatherer did not run."
            },
            "structured-data": {
                "title": "Structured data is valid",
                "description": "Run the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) and the [Structured Data Linter](http://linter.structured-data.org/) to validate structured data. [Learn more](https://web.dev/structured-data/).",
                "score": 0,
                "displayValue": "Manual Assessment Needed"
            },
            "diagnostics": {
                "id": "diagnostics",
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
            "percentages": {
                "performance": 0,
                "seo": 0,
                "bestPractices": 0,
                "accessibility": 0,
                "overallScore": 0
            },
            "success": false
        })
    }
}

module.exports = generateReport