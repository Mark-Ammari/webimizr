export interface Seo {
    "is-crawlable": Metadata
    "hreflang": Metadata
    "plugins": Metadata
    "document-title": Metadata
    "robots-txt": Metadata
    // "full-page-screenshot": FullPageScreenshot
    "font-size": Metadata
    "link-text": Metadata
    "crawlable-anchors": Metadata
    "tap-targets": Metadata
    "viewport": Metadata
    "http-status-code": Metadata
    "image-alt": Metadata
    "meta-description": Metadata
    "canonical": Metadata
    "structured-data": Metadata
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