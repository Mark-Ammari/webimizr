export interface PWA {
    "viewport": Metadata
    "apple-touch-icon": Metadata
    "themed-omnibox": Metadata
    // "full-page-screenshot": Metadata
    "pwa-cross-browser": Metadata
    "installable-manifest": Metadata
    "maskable-icon": Metadata
    "pwa-each-page-has-url": Metadata
    "splash-screen": Metadata
    "content-width": Metadata
    "pwa-page-transitions": Metadata
    "service-worker": Metadata
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