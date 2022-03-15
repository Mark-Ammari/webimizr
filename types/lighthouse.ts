export interface Lighthouse {
  "is-on-https": IsOnHttps
  "service-worker": ServiceWorker
  viewport: Viewport
  "first-contentful-paint": FirstContentfulPaint
  "largest-contentful-paint": LargestContentfulPaint
  "first-meaningful-paint": FirstMeaningfulPaint
  "speed-index": SpeedIndex
  "screenshot-thumbnails": ScreenshotThumbnails
  "final-screenshot": FinalScreenshot
  "total-blocking-time": TotalBlockingTime
  "max-potential-fid": MaxPotentialFid
  "cumulative-layout-shift": CumulativeLayoutShift
  "errors-in-console": ErrorsInConsole
  "server-response-time": ServerResponseTime
  interactive: Interactive
  "user-timings": UserTimings
  "critical-request-chains": CriticalRequestChains
  redirects: Redirects
  "installable-manifest": InstallableManifest
  "apple-touch-icon": AppleTouchIcon
  "splash-screen": SplashScreen
  "themed-omnibox": ThemedOmnibox
  "maskable-icon": MaskableIcon
  "content-width": ContentWidth
  "image-aspect-ratio": ImageAspectRatio
  "image-size-responsive": ImageSizeResponsive
  "preload-fonts": PreloadFonts
  deprecations: Deprecations
  "mainthread-work-breakdown": MainthreadWorkBreakdown
  "bootup-time": BootupTime
  "uses-rel-preload": UsesRelPreload
  "uses-rel-preconnect": UsesRelPreconnect
  "font-display": FontDisplay
  "network-rtt": NetworkRtt
  "performance-budget": PerformanceBudget
  "timing-budget": TimingBudget
  "resource-summary": ResourceSummary
  "third-party-summary": ThirdPartySummary
  "largest-contentful-paint-element": LargestContentfulPaintElement
  "third-party-facades": ThirdPartyFacades
  "lcp-lazy-loaded": LcpLazyLoaded
  "layout-shift-elements": LayoutShiftElements
  "long-tasks": LongTasks
  "no-unload-listeners": NoUnloadListeners
  "non-composited-animations": NonCompositedAnimations
  "unsized-images": UnsizedImages
  "valid-source-maps": ValidSourceMaps
  "preload-lcp-image": PreloadLcpImage
  "csp-xss": CspXss
  "script-treemap-data": ScriptTreemapData
  "pwa-cross-browser": PwaCrossBrowser
  "pwa-page-transitions": PwaPageTransitions
  "pwa-each-page-has-url": PwaEachPageHasUrl
  accesskeys: Accesskeys
  "aria-allowed-attr": AriaAllowedAttr
  "aria-command-name": AriaCommandName
  "aria-hidden-body": AriaHiddenBody
  "aria-hidden-focus": AriaHiddenFocus
  "aria-input-field-name": AriaInputFieldName
  "aria-meter-name": AriaMeterName
  "aria-progressbar-name": AriaProgressbarName
  "aria-required-attr": AriaRequiredAttr
  "aria-required-children": AriaRequiredChildren
  "aria-required-parent": AriaRequiredParent
  "aria-roles": AriaRoles
  "aria-toggle-field-name": AriaToggleFieldName
  "aria-tooltip-name": AriaTooltipName
  "aria-treeitem-name": AriaTreeitemName
  "aria-valid-attr-value": AriaValidAttrValue
  "aria-valid-attr": AriaValidAttr
  "button-name": ButtonName
  bypass: Bypass
  "color-contrast": ColorContrast
  "definition-list": DefinitionList
  dlitem: Dlitem
  "document-title": DocumentTitle
  "duplicate-id-active": DuplicateIdActive
  "duplicate-id-aria": DuplicateIdAria
  "form-field-multiple-labels": FormFieldMultipleLabels
  "frame-title": FrameTitle
  "heading-order": HeadingOrder
  "html-has-lang": HtmlHasLang
  "html-lang-valid": HtmlLangValid
  "image-alt": ImageAlt
  "input-image-alt": InputImageAlt
  label: Label
  "link-name": LinkName
  list: List
  listitem: Listitem
  "meta-refresh": MetaRefresh
  "meta-viewport": MetaViewport
  "object-alt": ObjectAlt
  tabindex: Tabindex
  "td-headers-attr": TdHeadersAttr
  "th-has-data-cells": ThHasDataCells
  "valid-lang": ValidLang
  "video-caption": VideoCaption
  "custom-controls-labels": CustomControlsLabels
  "custom-controls-roles": CustomControlsRoles
  "focus-traps": FocusTraps
  "focusable-controls": FocusableControls
  "interactive-element-affordance": InteractiveElementAffordance
  "logical-tab-order": LogicalTabOrder
  "managed-focus": ManagedFocus
  "offscreen-content-hidden": OffscreenContentHidden
  "visual-order-follows-dom": VisualOrderFollowsDom
  "use-landmarks": UseLandmarks
  "uses-long-cache-ttl": UsesLongCacheTtl
  "total-byte-weight": TotalByteWeight
  "offscreen-images": OffscreenImages
  "render-blocking-resources": RenderBlockingResources
  "unminified-css": UnminifiedCss
  "unminified-javascript": UnminifiedJavascript
  "unused-css-rules": UnusedCssRules
  "unused-javascript": UnusedJavascript
  "modern-image-formats": ModernImageFormats
  "uses-optimized-images": UsesOptimizedImages
  "uses-text-compression": UsesTextCompression
  "uses-responsive-images": UsesResponsiveImages
  "efficient-animated-content": EfficientAnimatedContent
  "duplicated-javascript": DuplicatedJavascript
  "legacy-javascript": LegacyJavascript
  doctype: Doctype
  charset: Charset
  "dom-size": DomSize
  "geolocation-on-start": GeolocationOnStart
  "inspector-issues": InspectorIssues
  "no-document-write": NoDocumentWrite
  "no-vulnerable-libraries": NoVulnerableLibraries
  "js-libraries": JSLibraries
  "notification-on-start": NotificationOnStart
  "password-inputs-can-be-pasted-into": PasswordInputsCanBePastedInto
  "uses-http2": UsesHttp2
  "uses-passive-event-listeners": UsesPassiveEventListeners
  "meta-description": MetaDescription
  "http-status-code": HttpStatusCode
  "font-size": FontSize
  "link-text": LinkText
  "crawlable-anchors": CrawlableAnchors
  "is-crawlable": IsCrawlable
  "robots-txt": RobotsTxt
  "tap-targets": TapTargets
  hreflang: Hreflang
  plugins: Plugins
  canonical: Canonical
  "structured-data": StructuredData
  diagnostics: Diagnostics
  percentages: Percentages
  success: boolean
}

export interface IsOnHttps {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ServiceWorker {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Viewport {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FirstContentfulPaint {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LargestContentfulPaint {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FirstMeaningfulPaint {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface SpeedIndex {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ScreenshotThumbnails {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FinalScreenshot {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface TotalBlockingTime {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MaxPotentialFid {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CumulativeLayoutShift {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ErrorsInConsole {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ServerResponseTime {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Interactive {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UserTimings {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CriticalRequestChains {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Redirects {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface InstallableManifest {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AppleTouchIcon {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface SplashScreen {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ThemedOmnibox {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MaskableIcon {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ContentWidth {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ImageAspectRatio {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ImageSizeResponsive {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PreloadFonts {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Deprecations {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MainthreadWorkBreakdown {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface BootupTime {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesRelPreload {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesRelPreconnect {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FontDisplay {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NetworkRtt {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PerformanceBudget {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface TimingBudget {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ResourceSummary {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ThirdPartySummary {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LargestContentfulPaintElement {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ThirdPartyFacades {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LcpLazyLoaded {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LayoutShiftElements {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LongTasks {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NoUnloadListeners {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NonCompositedAnimations {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UnsizedImages {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ValidSourceMaps {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PreloadLcpImage {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CspXss {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ScriptTreemapData {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PwaCrossBrowser {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PwaPageTransitions {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PwaEachPageHasUrl {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Accesskeys {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaAllowedAttr {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaCommandName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaHiddenBody {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaHiddenFocus {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaInputFieldName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaMeterName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaProgressbarName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaRequiredAttr {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaRequiredChildren {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaRequiredParent {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaRoles {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaToggleFieldName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaTooltipName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaTreeitemName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaValidAttrValue {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface AriaValidAttr {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ButtonName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Bypass {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ColorContrast {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DefinitionList {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Dlitem {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DocumentTitle {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DuplicateIdActive {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DuplicateIdAria {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FormFieldMultipleLabels {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FrameTitle {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface HeadingOrder {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface HtmlHasLang {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface HtmlLangValid {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ImageAlt {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface InputImageAlt {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Label {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LinkName {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface List {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Listitem {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MetaRefresh {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MetaViewport {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ObjectAlt {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Tabindex {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface TdHeadersAttr {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ThHasDataCells {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ValidLang {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface VideoCaption {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CustomControlsLabels {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CustomControlsRoles {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FocusTraps {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FocusableControls {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface InteractiveElementAffordance {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LogicalTabOrder {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ManagedFocus {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface OffscreenContentHidden {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface VisualOrderFollowsDom {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UseLandmarks {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesLongCacheTtl {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface TotalByteWeight {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface OffscreenImages {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface RenderBlockingResources {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UnminifiedCss {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UnminifiedJavascript {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UnusedCssRules {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UnusedJavascript {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface ModernImageFormats {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesOptimizedImages {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesTextCompression {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesResponsiveImages {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface EfficientAnimatedContent {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DuplicatedJavascript {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LegacyJavascript {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Doctype {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Charset {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface DomSize {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface GeolocationOnStart {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface InspectorIssues {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NoDocumentWrite {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NoVulnerableLibraries {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface JSLibraries {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface NotificationOnStart {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface PasswordInputsCanBePastedInto {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesHttp2 {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface UsesPassiveEventListeners {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface MetaDescription {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface HttpStatusCode {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface FontSize {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface LinkText {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface CrawlableAnchors {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface IsCrawlable {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface RobotsTxt {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface TapTargets {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Hreflang {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Plugins {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Canonical {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface StructuredData {
  title: string
  description: string
  score: number | null
  displayValue: string
}

export interface Diagnostics {
  id: string
  title: string
  description: string
  details: Detail[]
}

export interface Detail {
  item: string
  result: any
}

export interface Percentages {
  performance: number
  seo: number
  bestPractices: number
  accessibility: number
  overallScore: number
}
