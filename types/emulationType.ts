const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

export const MobileSpecifications = {
    device: { title: 'Device Type', rawValue: 'Moto G4', value: 'Moto G4' },
    resolutionSize: { title: 'Device Dimensions', rawValue: '360x640', value: '360x640' },
    connectionType: { title: 'Connection Type', rawValue: '4G slowed down', value: '4G slowed down' },
    cpuSlowdownMultiplyer: { title: 'CPU Slowdown Multiplyer', rawValue: 4, value: '4x CPU Slowdown' },
    rttMs: { title: 'Round-trip time', rawValue: 150, value: '150 ms' },
    requestLatencyMs: { title: 'Server Request Latency', rawValue: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR, value: '562.5 ms' },
    throughputKbps: { title: 'Throughput', rawValue: 1.6 * 1024, value: '1.6 Mbps' },
    downloadThroughputKbps: { title: 'Download Speed', rawValue: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR, value: '1.4 Mbps' },
    uploadThroughputKbps: { title: 'Upload Speed', rawValue: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR, value: '675 Kbps' }
}

export const DesktopSpecifications = {
    device: { title: 'Device Type', rawValue: 'Desktop', value: 'Desktop' },
    resolutionSize: { title: 'Device Dimensions', rawValue: '1350x940', value: '1350x940' },
    connectionType: { title: 'Connection Type', rawValue: 'Broadband', value: 'Broadband' },
    cpuSlowdownMultiplyer: { title: 'CPU Slowdown Multiplyer', rawValue: 1, value: '1x CPU Slowdown' },
    rttMs: { title: 'Round-trip time', rawValue: 40, value: '40 ms' },
    requestLatencyMs: { title: 'Server Request Latency', rawValue: 0, value: 'unset' },
    throughputKbps: { title: 'Throughput', rawValue: 10 * 1024, value: '10 Mbps' },
    downloadThroughputKbps: { title: 'Download Speed', rawValue: 0, value: 'unset' },
    uploadThroughputKbps: { title: 'Upload Speed', rawValue: 0, value: 'unset' }
}

export interface SpecificationMetadata {
    title: string
    rawValue: string | number
    value: string
}

export interface Specifications {
    device: SpecificationMetadata
    resolutionSize: SpecificationMetadata
    connectionType: SpecificationMetadata
    cpuSlowdownMultiplyer: SpecificationMetadata
    rttMs: SpecificationMetadata
    requestLatencyMs: SpecificationMetadata
    throughputKbps: SpecificationMetadata
    downloadThroughputKbps: SpecificationMetadata
    uploadThroughputKbps: SpecificationMetadata
}