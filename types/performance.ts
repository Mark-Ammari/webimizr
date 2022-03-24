export type Performance = {
    "first-meaningful-paint": Metadata
    "dom-size": Metadata
    "uses-optimized-images": Metadata
    "critical-request-chains": Metadata
    "largest-contentful-paint-element": Metadata
    "diagnostics": Diagnostics
    "network-rtt": Metadata
    "offscreen-images": Metadata
    "legacy-javascript": Metadata
    "server-response-time": Metadata
    "render-blocking-resources": Metadata
    "unused-javascript": Metadata
    "max-potential-fid": Metadata
    // "full-page-screenshot": Metadata
    "font-display": Metadata
    "total-blocking-time": Metadata
    "uses-rel-preload": Metadata
    "cumulative-layout-shift": Metadata
    "uses-rel-preconnect": Metadata
    "duplicated-javascript": Metadata
    "timing-budget": Metadata
    "preload-lcp-image": Metadata
    "first-contentful-paint": Metadata
    "interactive": Metadata
    "speed-index": Metadata
    "network-requests": Metadata
    // "screenshot-thumbnails": Metadata
    "modern-image-formats": Metadata
    "main-thread-tasks": Metadata
    "no-document-write": Metadata
    "performance-budget": Metadata
    "unused-css-rules": Metadata
    "lcp-lazy-loaded": Metadata
    "unminified-javascript": Metadata
    "no-unload-listeners": Metadata
    "layout-shift-elements": Metadata
    "total-byte-weight": Metadata
    "network-server-latency": Metadata
    "script-treemap-data": Metadata
    "third-party-summary": Metadata
    "uses-long-cache-ttl": Metadata
    "long-tasks": Metadata
    "bootup-time": Metadata
    "third-party-facades": Metadata
    "uses-responsive-images": Metadata
    "viewport": Metadata
    "resource-summary": Metadata
    "efficient-animated-content": Metadata
    "mainthread-work-breakdown": Metadata
    "unsized-images": Metadata
    "redirects": Metadata
    "unminified-css": Metadata
    "non-composited-animations": Metadata
    "largest-contentful-paint": Metadata
    "uses-passive-event-listeners": Metadata
    "uses-text-compression": Metadata
    "user-timings": Metadata
    "percentage": string | number | null
    "message": string
    "success": boolean
}

export interface Metadata {
    title: string
    description: string
    score: null | number
    displayValue: string | ""
}

export interface Diagnostics {
    title: string
    description: string
    details: Detail[]
  }
  
  export interface Detail {
    item: string
    result: any
  }