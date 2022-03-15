
import { NextPage } from 'next'
import React from 'react';
import AuditProgressBar from 'modules/home/AuditProgressBar';
import { DesktopSpecifications, MobileSpecifications } from 'types/emulationType';
import ConfigurationBar from 'modules/home/ConfigurationBar';
import ReportSummary from 'modules/home/ReportSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { lighthouseData, onFetchLighthouseReport } from 'store/reducers/lighthouse/lighthouseSlice';
import AuditTablet from 'modules/home/AuditTablet';
import SearchBar from 'components/SearchBar';

// https://www.webimizr.com
const Homepage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const data = useSelector(lighthouseData)
  React.useEffect(() => {
    if (router.query.url) {
      dispatch(onFetchLighthouseReport(router.query.url as string, router.query.emulation as string))
    }
  }, [router.query.url, router.query.emulation, dispatch])

  return (
    <main className='main'>
      <SearchBar />
      <AuditProgressBar />
      <ConfigurationBar
        specifications={router.query.emulation === 'mobile' ? MobileSpecifications : DesktopSpecifications}
      />
      <ReportSummary
        reportSummary={data}
      />
      <AuditTablet />
    </main>
  )
}

export default Homepage;
