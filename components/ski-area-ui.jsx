'use client'
import React from 'react'
import classnames from 'classnames'

import SkiAreaCard from '../components/ski-area-card'
import SkiAreaCardSubTitle from '../components/ski-area-card-sub-title'
import SkiAreaFilter from '../components/ski-area-filter'

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

  const wrapperClassnames = classnames({ "p-3 bg-gray-800": true })
  const titleClassnames = classnames({ "text-4xl mb-5 text-zinc-200": true })
  const infoBlockClassnames = classnames({ "py-3 tracking-wider": true })
  const labelClassNames = classnames({ "text-xl font-bold text-gray-300": true })
  const infoClassNames = classnames({ "text-xl font-bold text-orange-200": true })

  const allfilterKeys = Object.keys(data)
    .map((key) => data[key].name)

  allfilterKeys.push('Ski Cooper')
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
           {(copper.data?.snowReport[0]?.items || []).map((item) => {
             return (
               <div key={item.duration}>
                 <span className={labelClassNames}>{item.duration}: </span><span className={infoClassNames}>{item.amount}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Lift Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <span className={labelClassNames}>Lifts Open: </span><span className={infoClassNames}>{copper.data?.liftReport?.open} out of {copper.data?.liftReport?.total}</span>
           </div>
           {(copper.data?.liftReport?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Trail Info'} />
        <div className={infoBlockClassnames}>
           <div className="pb-3 mb-3 border-b border-gray-900">
             <span className={labelClassNames}>Trails Open: </span><span className={infoClassNames}>{copper.data?.trailReport?.open} out of {copper.data?.trailReport?.total}</span>
           </div>
           {(copper.data?.trailReport?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Terrain Park Info'} />
        <div className={infoBlockClassnames}>
           {(copper.data?.terrainPark?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Uphill Info'} />
        <div className={infoBlockClassnames}>
           {(copper.data?.uphillTrail?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
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
