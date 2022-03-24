
import { NextPage } from 'next'
import React from 'react';
import AuditProgressBar from 'modules/home/AuditProgressBar';
import { DesktopSpecifications, MobileSpecifications } from 'types/emulationType';
import ConfigurationBar from 'modules/home/ConfigurationBar';
import ReportSummary from 'modules/home/ReportSummary';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AuditTablet from 'modules/home/AuditTablet';
import SearchBar from 'components/SearchBar';
import { onFetchPerformanceReport } from 'store/reducers/lighthouse/performanceSlice';
import { onFetchSEOReport } from 'store/reducers/lighthouse/seoSlice';
import { onFetchPWAReport } from 'store/reducers/lighthouse/pwaSlice';
import { onFetchBestPracticesReport } from 'store/reducers/lighthouse/bestPracticesSlice';
import { onFetchAccessibilityReport } from 'store/reducers/lighthouse/accessibilitySlice';
import SEO from 'layouts/SEO';

// https://www.webimizr.com
const Homepage: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (router.query.url) {
      dispatch(onFetchPerformanceReport(router.query.url as string, router.query.emulation as string))
      dispatch(onFetchSEOReport(router.query.url as string, router.query.emulation as string))
      dispatch(onFetchPWAReport(router.query.url as string, router.query.emulation as string))
      dispatch(onFetchBestPracticesReport(router.query.url as string, router.query.emulation as string))
      dispatch(onFetchAccessibilityReport(router.query.url as string, router.query.emulation as string))
    }
  }, [dispatch, router.query.url, router.query.emulation])
  return (
    <>
      <SEO
        author='Webimizr'
        canonical=''
        keywords='Vitals, Performance, SEO, PWA, Accessibility, Best Practices, Speed, Optimize, Improve, Innovate'
        title='Webimizr | Local Performance Insights'
        description='Test your webpage performance to assess failures and to improve your webpage overall performance.'
        subject='Performance'
      />
      <main className='main'>
        <SearchBar />
        <AuditProgressBar />
        <ConfigurationBar
          specifications={router.query.emulation === 'mobile' ? MobileSpecifications : DesktopSpecifications}
        />
        <ReportSummary />
        <AuditTablet />
      </main>
    </>
  )
}

export default Homepage;
