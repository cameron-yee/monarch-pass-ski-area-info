import React from 'react'
import classnames from 'classnames'

import getABasinInfo from '../data/get-a-basin-info'
import getCopperInfo from '../data/get-copper-info'
import getLovelandInfo from '../data/get-loveland-info'
import getMonarchInfo from '../data/get-monarch-info'

import SkiAreaCard from '../components/ski-area-card'
import SkiAreaCardSubTitle from '../components/ski-area-card-sub-title'
import SkiAreaCardTitle from '../components/ski-area-card-title'

async function getData() {
  const [
    aBasinInfo,
    copperInfo,
    lovelandInfo,
    monarchInfo
  ] = await Promise.all([
    getABasinInfo(),
    getCopperInfo(),
    getLovelandInfo(),
    getMonarchInfo()
  ])

  const info = {
    aBasinInfo,
    copperInfo,
    lovelandInfo,
    monarchInfo
  }

  return info
}

export default async function Main() {
  const data = await getData()

  if (!data) {
    return <div>Loading...</div>
  }

  const {
    aBasinInfo,
    copperInfo,
    lovelandInfo,
    monarchInfo
  } = data

  const wrapperClassnames = classnames({ "p-3 bg-gray-800": true })
  const titleClassnames = classnames({ "text-4xl mb-5 text-zinc-200": true })
  const areaWrapperClassnames = classnames({ "bg-gray-600 p-3 mb-5 rounded shadow-lg": true })
  const infoBlockClassnames = classnames({ "py-3": true })
  const labelClassNames = classnames({ "text-xl font-bold text-gray-300": true })
  const infoClassNames = classnames({ "text-xl font-bold text-orange-200": true })

  return (
    <div className={wrapperClassnames}>
      <h1 className={titleClassnames}>Monarch Pass Ski Area Info</h1>
      <SkiAreaCard
        data={aBasinInfo}
        name={'Arapahoe Basin'}
      />
      <div className={areaWrapperClassnames}>
        <SkiAreaCardTitle title={'Copper Mountain'} />
        <SkiAreaCardSubTitle title={'Snow Info'} />
        <div className={infoBlockClassnames}>
           {(copperInfo?.snowReport[0]?.items || []).map((item) => {
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
             <span className={labelClassNames}>Lifts Open: </span><span className={infoClassNames}>{copperInfo?.liftReport?.open} out of {copperInfo?.liftReport?.total}</span>
           </div>
           {(copperInfo?.liftReport?.sectors || []).map((sector) => {
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
             <span className={labelClassNames}>Trails Open: </span><span className={infoClassNames}>{copperInfo?.trailReport?.open} out of {copperInfo?.trailReport?.total}</span>
           </div>
           {(copperInfo?.trailReport?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Terrain Park Info'} />
        <div className={infoBlockClassnames}>
           {(copperInfo?.terrainPark?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
        <SkiAreaCardSubTitle title={'Uphill Info'} />
        <div className={infoBlockClassnames}>
           {(copperInfo?.uphillTrail?.sectors || []).map((sector) => {
             return (
               <div key={sector.name}>
                 <span className={labelClassNames}>{sector.name}: </span><span className={infoClassNames}>{sector.open} out of {sector.total}</span>
               </div>
             )
          })}
        </div>
      </div>
      <SkiAreaCard
        data={lovelandInfo}
        name='Loveland'
      />
      <SkiAreaCard
        data={monarchInfo}
        name='Monarch'
      />
      <div className={areaWrapperClassnames}>
        <SkiAreaCardTitle title={'Ski Cooper'} />
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
      </div>
    </div>
  )
}
