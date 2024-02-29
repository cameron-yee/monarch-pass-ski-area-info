import React from 'react'

import getABasinInfo from '../data/get-a-basin-info'
import getCopperInfo from '../data/get-copper-info'
import getLovelandInfo from '../data/get-loveland-info'
import getMonarchInfo from '../data/get-monarch-info'
import getPowderhornInfo from '../data/get-powderhorn-info'
import getPurgatoryInfo from '../data/get-purgatory-info'
import getSunlightInfo from '../data/get-sunlight-info'

import SkiAreaUI from '@/components/ski-area-ui'

async function getData() {
  const [
    aBasinInfo,
    copperInfo,
    lovelandInfo,
    monarchInfo,
    powderhornInfo,
    purgatoryInfo,
    sunlightInfo
  ] = await Promise.all([
    getABasinInfo(),
    getCopperInfo(),
    getLovelandInfo(),
    getMonarchInfo(),
    getPowderhornInfo(),
    getPurgatoryInfo(),
    getSunlightInfo()
  ])

  const info = {
    aBasin: {
      data: aBasinInfo,
      name: 'Arapahoe Basin'
    },
    copper: {
      data: copperInfo,
      name: 'Copper Mountain'
    },
    loveland: {
      data: lovelandInfo,
      name: 'Loveland'
    },
    monarch: {
      data: monarchInfo,
      name: 'Monarch'
    },
    powderhorn: {
      data: powderhornInfo,
      name: 'Powderhorn'
    },
    purgatory: {
      data: purgatoryInfo,
      name: 'Purgatory'
    },
    sunlight: {
      data: sunlightInfo,
      name: 'Sunlight'
    }
  }

  return info
}

export default async function Main() {
  const data = await getData()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <SkiAreaUI data={data} />
  )
}
