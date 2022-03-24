import Heading from 'components/Heading';
import Tablet from 'components/Tablet';
import React from 'react';
import AccessibilityTab from '../auditTabs/AccessibilityTab';
import BestPracticesTab from '../auditTabs/BestPracticesTab';
import PerformanceTab from '../auditTabs/PerformanceTab';
import ProgressiveTab from '../auditTabs/ProgressiveTab';
import SeoTab from '../auditTabs/SeoTab';

interface Props {
    url?: string | undefined
    jobResult?: 'Success' | 'Failed' | 'Running' | undefined
}

const AuditTablet: React.FC<Props> = ({ url, jobResult }) => {
    return (
        <>
            <section id='audit-tablet-bar-container' className='container'>
                <Heading
                    title='Audit Report'
                    subHeading='Checklist based on the quality of your application.'
                />
                <div id='audit-tablet-bar' className='section'>
                    <Tablet
                        data={[
                            { title: 'Performance', element: <PerformanceTab /> },
                            { title: 'SEO Analysis', element: <SeoTab /> },
                            { title: 'Best Practices', element: <BestPracticesTab /> },
                            { title: 'Accessibility', element: <AccessibilityTab /> },
                            { title: 'Progressive', element: <ProgressiveTab /> },
                        ]}
                    />
                </div>
            </section>
            <style jsx>
                {`#audit-tablet-bar-container {
                    margin: 3rem 0
                }
                #audit-tablet-bar {
                   
                }`}
            </style>
        </>
    )
}

export default AuditTablet;

