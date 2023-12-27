import React from 'react'

import * as cheerio from 'cheerio'

async function fetchHTML(page) {
  const resp = await fetch(page)
  const text = await resp.text()
  return text
}

async function getABasinInfo() {
  const html = await fetchHTML('https://www.arapahoebasin.com/snow-report/#terrainAndLiftStatus')
  const $ = cheerio.load(html)
  let infoObject = {}

  /**
    * Terrain and Lift Status elements
    */
  const terrainAndLiftStatus = $('#terrainAndLiftStatus')
  const terrainAndLiftStatusElements = terrainAndLiftStatus.next().find('div')

  infoObject.liftInfo = {}

  terrainAndLiftStatusElements.each((i, elem) => {
    const rawText = $(elem).text()
    const texts = rawText.split('\n')
      .map(t => t.trim())
      .filter(Boolean)

    const [value, label] = texts
    infoObject.liftInfo[label] = value
  })

  /**
    * Snow Stats
    */
  infoObject.snowInfo = {}
  const snowStats = $('.snow-stats')
  snowStats.find('h5').each((i, elem) => {
    const value = $(elem).text().trim()
    const label = $(elem).next().text().trim()

    infoObject.snowInfo[label] = value
  })

  return infoObject
}

async function getLovelandInfo() {
  const html = await fetchHTML('https://skiloveland.com/trail-lift-report/')
  const $ = cheerio.load(html)
  let infoObject = {}

  const liftInfoElements = $('h2[id^="tablepress-"]')
  liftInfoElements.each((i, elem) => {
    const [label, value] = $(elem).text().split('-')
    infoObject[label.trim()] = value.trim()
  })

  return infoObject
}

async function getMonarchInfo() {
  const html = await fetchHTML('https://skimonarch.com/conditions/')
  const $ = cheerio.load(html)
  let infoObject = {}

  /**
    * Snow Report
    */
  const accumulationTable = $('.accumulation__table')

  const values = accumulationTable
    .find('thead')
    .find('th')
    .text()
    .split('\n')
    .map(t => t.trim())
    .filter(Boolean)

  const labels = accumulationTable
    .find('tbody')
    .find('td')
    .text()
    .split('\n')
    .map(t => t.trim())
    .filter(Boolean)

  if (values.length !== labels.length) {
    console.warn('Error fetching Monarch snow info. Check scraping elements.')
    return infoObject
  }

  infoObject.snowInfo = {}
  for (let i = 0; i < values.length; i++) {
    infoObject.snowInfo[labels[i]] = values[i]
  }

  /**
    * Lift Report
    */
  const liftsTable = $('table.lifts-table')

  const lifts = liftsTable
    .find('tbody')
    .find('tr')
    .text()
    .split('\n')
    .map(t => t.trim())
    .filter(Boolean)

  if (lifts.length % 2 !== 0) {
    console.warn('Error scraping Monarch lift info. Check scraping elements.')
    return infoObject
  }

  infoObject.liftInfo = {}
  for (let i = 0; i < lifts.length; i+=2) {
    const label = lifts[i]
    const value = lifts[i+1]

    infoObject.liftInfo[label] = value
  }
  return infoObject
}

async function compileInfo() {
  const aBasinInfo = await getABasinInfo()
  const lovelandInfo = await getLovelandInfo()
  const monarchInfo = await getMonarchInfo()

  const info = {
    aBasinInfo,
    lovelandInfo,
    monarchInfo
  }

  return info
}

async function getData() {
  const info = await compileInfo()
  return info
}

export default async function Main() {
  const data = await getData()

  if (!data) {
    return <div>Loading...</div>
  }

  const { aBasinInfo, lovelandInfo, monarchInfo } = data

  return (
    <div className="p-3">
      <h1 className="text-3xl mb-5">Monarch Pass Ski Area Info</h1>
      <h2 className="text-2xl mb-3">Arapahoe Basin</h2>
      <h3 className="text-xl mb-3">Snow Info</h3>
      <div className="p-3">
        {Object.keys(aBasinInfo.snowInfo).map((label) => {
           return (
             <div key={label}>
               <span className="font-bold">{label}: </span><span>{aBasinInfo.snowInfo[label]}</span>
             </div>
           )
        })}
      </div>
      <h3 className="text-xl mb-3">Lift Info</h3>
      <div className="p-3">
        {Object.keys(aBasinInfo.liftInfo).map((label) => {
           return (
             <div key={label}>
               <span className="font-bold">{label}: </span><span>{aBasinInfo.liftInfo[label]}</span>
             </div>
           )
        })}
      </div>
      <h2 className="text-2xl mb-3">Loveland</h2>
      <h3 className="text-xl">Snow Info</h3>
      <div className="p-3 font-bold">
         No Data
      </div>
      <h3 className="text-xl mb-3">Lift Info</h3>
      <div className="p-3">
        {Object.keys(lovelandInfo).map((label) => {
           return (
             <div key={label}>
               <span className="font-bold">{label}: </span><span>{lovelandInfo[label]}</span>
             </div>
           )
        })}
      </div>
      <h2 className="text-2xl mb-3">Monarch</h2>
      <h3 className="text-xl mb-3">Snow Info</h3>
      <div className="p-3">
        {Object.keys(monarchInfo.snowInfo).map((label) => {
           return (
             <div key={label}>
               <span className="font-bold">{label}: </span><span>{monarchInfo.snowInfo[label]}</span>
             </div>
           )
        })}
      </div>
      <h3 className="text-xl my-3">Lift Info</h3>
      <div className="p-3">
        {Object.keys(monarchInfo.liftInfo).map((label) => {
           return (
             <div key={label}>
               <span className="font-bold">{label}: </span><span>{monarchInfo.liftInfo[label]}</span>
             </div>
           )
        })}
      </div>
    </div>
  )
}
