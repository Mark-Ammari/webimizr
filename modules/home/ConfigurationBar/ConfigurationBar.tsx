import Heading from 'components/Heading';
import React from 'react';
import { Specifications } from 'types/emulationType';

interface Props {
    specifications: Specifications
}

const ConfigurationBar: React.FC<Props> = ({ specifications }) => {
    return (
        <>
            <section id='configuration-bar-container' className='container'>
                <Heading
                    title='Configurations'
                    subHeading='Configuration of emulated device specifications, CPU power, and network speed.'
                />
                <div id='configuration-bar' className='section'>
                    <div id='grid-configuration-section'>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.device.title}</h2>
                            <p className='subheading'>{specifications.device.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.resolutionSize.title}</h2>
                            <p className='subheading'>{specifications.resolutionSize.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.connectionType.title}</h2>
                            <p className='subheading'>{specifications.connectionType.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.cpuSlowdownMultiplyer.title}</h2>
                            <p className='subheading'>{specifications.cpuSlowdownMultiplyer.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.rttMs.title}</h2>
                            <p className='subheading'>{specifications.rttMs.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.requestLatencyMs.title}</h2>
                            <p className='subheading'>{specifications.requestLatencyMs.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.throughputKbps.title}</h2>
                            <p className='subheading'>{specifications.throughputKbps.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.downloadThroughputKbps.title}</h2>
                            <p className='subheading'>{specifications.downloadThroughputKbps.value}</p>
                        </div>
                        <div className='grid-item'>
                            <h2 className='title'>{specifications.uploadThroughputKbps.title}</h2>
                            <p className='subheading'>{specifications.uploadThroughputKbps.value}</p>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>
                {`#configuration-bar-container {
                    margin: 3rem 0;
                }
                #configuration-bar {
                    background: var(--whiteBackgroundColor);
                    display: flex;
                    max-width: 1366px;
                    margin: auto;
                    padding: var(--spacing);
                    border-radius: var(--radius);
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-direction: column
                }
                #grid-configuration-section {
                    display: grid;
                    width: 100%;
                    box-shadow: var(--shadow);
                    padding: var(--spacing);
                    gap: var(--spacing);
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))
                }
                .grid-item {
                    max-width: 300px;
                    padding-left: 1rem;
                    border-left: 3px solid var(--accentColor)
                }
                .title {
                    font-size: 1rem;
                    font-weight: bold;
                    color: var(--primaryColor)
                }
                .subheading {
                    font-size: .9rem;
                    color: var(--secondaryTextColor)
                }`}
            </style>
        </>
    )
}

export default ConfigurationBar;

