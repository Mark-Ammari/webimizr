export interface BestPractices {
    "no-vulnerable-libraries": Metadata
    "errors-in-console": Metadata
    "notification-on-start": Metadata
    // "full-page-screenshot": Metadata
    "preload-fonts": Metadata
    "image-size-responsive": Metadata
    "valid-source-maps": Metadata
    "password-inputs-can-be-pasted-into": Metadata
    "csp-xss": Metadata
    "charset": Metadata
    "image-aspect-ratio": Metadata
    "is-on-https": Metadata
    "geolocation-on-start": Metadata
    "js-libraries": Metadata
    "deprecations": Metadata
    "doctype": Metadata
    "inspector-issues": Metadata
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