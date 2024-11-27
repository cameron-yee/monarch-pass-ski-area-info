'use client'
import React from 'react'
import classnames from 'classnames'

import OpenFilter from '@/components/open-filter'
import SkiAreaCard from '@/components/ski-area-card'
import SkiAreaCardSubTitle from '@/components/ski-area-card-sub-title'
import SkiAreaFilter from '@/components/ski-area-filter'
import ValuePair from '@/components/value-pair'

export default function SkiAreaUI({ data }) {
  const {
    aBasin,
    copper,
    loveland,
    monarch,
    powderhorn,
    purgatory,
    sunlight
  } = data

  const wrapperClassnames = classnames({ "p-3 bg-gray-800 min-h-screen": true })
  const titleClassnames = classnames({ "text-4xl mb-5 text-zinc-200": true })
  const infoBlockClassnames = classnames({ "py-3 tracking-wider": true })

  const allAreaFilterKeys = Object.keys(data)
    .map((key) => data[key].name)

  allAreaFilterKeys.push("Ski Cooper")
  const [areaFilter, setAreaFilter] = React.useState(allAreaFilterKeys)
  const [openFilter, setOpenFilter] = React.useState(false)

  const filterNotClosed = React.useCallback((value) => {
    if (!openFilter) {
      return true
    }

    return String(value).toLowerCase() !== 'closed'
  }, [openFilter])

  return (
    <div className={wrapperClassnames}>
      <h1 className={titleClassnames}>Monarch Pass Ski Area Info</h1>
      <SkiAreaFilter options={allAreaFilterKeys} onFilter={setAreaFilter} />
      <OpenFilter setOpenFilter={setOpenFilter} openFilter={openFilter} />
      <SkiAreaCard
        data={aBasin.data}
        filter={areaFilter}
        name={aBasin.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={loveland.data}
        filter={areaFilter}
        name={loveland.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={monarch.data}
        filter={areaFilter}
        name={monarch.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={powderhorn.data}
        filter={areaFilter}
        name={powderhorn.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={purgatory.data}
        filter={areaFilter}
        name={purgatory.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={sunlight.data}
        filter={areaFilter}
        name={sunlight.name}
        filterValues={[filterNotClosed]}
      />
      <SkiAreaCard
        data={copper.data}
        filter={areaFilter}
        name={copper.name}
      >
        <SkiAreaCardSubTitle title={'Snow Info'} />
        <div className={infoBlockClassnames}>
           {Object.entries(copper.data?.snowReports[0]?.computed || {}).map(([key, value]) => {
             return (
               <ValuePair key={key} label={key.split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')} value={value} />
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Lift Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <ValuePair
               label={'Lifts Open'}
               value={`${copper.data?.liftReports?.reduce((acc, liftReport) => (acc + (liftReport.status === 'open' ? 1 : 0)), 0)} out of ${copper.data?.liftReports?.length}`}
             />
           </div>
           {(copper.data?.liftReports || []).map((liftReport) => {
             const { name, hours, status } = liftReport

             return (
               <ValuePair
                 filterValues={[filterNotClosed]}
                 key={name}
                 label={name}
                 value={status}
                 subValues={status === 'open' ? [hours] : null}
               />
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Trail Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <ValuePair
               label={'Trails Open'}
               value={`${copper.data?.trailReports?.reduce((acc, trailReport) => (acc + (trailReport.status === 'open' ? 1 : 0)), 0)} out of ${copper.data?.trailReports?.length}`}
             />
           </div>
           {(copper.data?.trailReports || []).map((trailReport) => {
             const { name, status, difficulty, season, sector } = trailReport

             if (season !== 'winter') {
               return null
             }

             return (
               <ValuePair
                 key={name}
                 filterValues={[filterNotClosed]}
                 label={name}
                 value={status}
                 subValues={[difficulty.split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '), sector.name]}
               />
             )
          })}
        </div>
      </SkiAreaCard>
      <SkiAreaCard
        filter={areaFilter}
        name={'Ski Cooper'}
      >
        <SkiAreaCardSubTitle title={'Snow Info'} />
        <img
          src="https://www.skicooper.com/static/images/SnowReport.jpg"
          alt="Ski Cooper snow info"
        />
        <SkiAreaCardSubTitle title={'Lift Info'} />
        <img
          src="https://www.skicooper.com/static/images/TrailReport.jpg"
          alt="Ski Cooper run and lift info"
        />
      </SkiAreaCard>
    </div>
  )
}
