'use client'
import React from 'react'
import classnames from 'classnames'

import SkiAreaCard from '@/components/ski-area-card'
import SkiAreaCardSubTitle from '@/components/ski-area-card-sub-title'
import SkiAreaFilter from '@/components/ski-area-filter'

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
  const labelClassNames = classnames({ "text-xl font-bold text-gray-300": true })
  const infoClassNames = classnames({ "text-xl font-bold text-orange-200": true })

  const allfilterKeys = Object.keys(data)
    .map((key) => data[key].name)

  allfilterKeys.push("Ski Cooper")
  const [filter, setFilter] = React.useState(allfilterKeys)

  return (
    <div className={wrapperClassnames}>
      <h1 className={titleClassnames}>Monarch Pass Ski Area Info</h1>
      <SkiAreaFilter options={allfilterKeys} onFilter={setFilter} />
      <SkiAreaCard
        data={aBasin.data}
        filter={filter}
        name={aBasin.name}
      />
      <SkiAreaCard
        data={loveland.data}
        filter={filter}
        name={loveland.name}
      />
      <SkiAreaCard
        data={monarch.data}
        filter={filter}
        name={monarch.name}
      />
      <SkiAreaCard
        data={powderhorn.data}
        filter={filter}
        name={powderhorn.name}
      />
      <SkiAreaCard
        data={purgatory.data}
        filter={filter}
        name={purgatory.name}
      />
      <SkiAreaCard
        data={sunlight.data}
        filter={filter}
        name={sunlight.name}
      />
      <SkiAreaCard
        data={copper.data}
        filter={filter}
        name={copper.name}
      >
        <SkiAreaCardSubTitle title={'Snow Info'} />
        <div className={infoBlockClassnames}>
           {Object.entries(copper.data?.snowReports[0]?.computed || {}).map(([key, value]) => {
             return (
               <div key={key}>
                 <span className={labelClassNames}>{key}: </span><span className={infoClassNames}>{value}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Lift Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <span className={labelClassNames}>Lifts Open: </span><span className={infoClassNames}>{copper.data?.liftReports?.reduce((acc, liftReport) => (acc + (liftReport.status === 'open' ? 1 : 0)), 0)} out of {copper.data?.liftReports?.length}</span>
           </div>
           {(copper.data?.liftReports || []).map((liftReport) => {
             const { name, hours, status } = liftReport

             return (
               <div key={name}>
                 <span className={labelClassNames}>{name}: </span><span className={infoClassNames}>{status} ({status === 'open' ? hours : '--'})</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Trail Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <span className={labelClassNames}>Trails Open: </span><span className={infoClassNames}>{copper.data?.trailReports?.reduce((acc, trailReport) => (acc + (trailReport.status === 'open' ? 1 : 0)), 0)} out of {copper.data?.trailReports?.length}</span>
           </div>
           {(copper.data?.trailReports || []).map((trailReport) => {
             const { name, status, difficulty, season, sector } = trailReport

             if (season !== 'winter') {
               return null
             }

             return (
               <div key={name}>
                 <span className={labelClassNames}>{name}: </span><span className={infoClassNames}>{sector.name} / {difficulty} / {status}</span>
               </div>
             )
          })}
        </div>
      </SkiAreaCard>
      <SkiAreaCard
        filter={filter}
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
