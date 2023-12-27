import React from 'react'
import classnames from 'classnames'

import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer';

async function fetchHTML(page) {
  const resp = await fetch(page, { cache: 'no-store' })
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
  let infoObject = {
    liftInfo: {},
    snowInfo: {}
  }

  /**
    * Calculating open runs with icon elements
    */
  const openRuns = $('img[src$="icon_open.png"]').length - 1
  const closedRuns = $('img[src$="icon_closed.png"]').length - 1
  const totalRuns = openRuns + closedRuns
  infoObject.liftInfo['Open Runs'] = `${openRuns} / ${totalRuns}`

  /**
    * Lift Report
    */
  const liftInfoElements = $('h2[id^="tablepress-"]')
  liftInfoElements.each((i, elem) => {
    const [label, value] = $(elem).text().split('-')
    infoObject.liftInfo[label.trim()] = value.trim()
  })

  /**
    * Snow Report
    */
  const snowTable = $('#tablepress-1')
  let labels = []
  snowTable
    .find('th')
    .contents()
    .each((i, content) => {
      labels.push(content.data)
    })

  let values = []
  snowTable
    .find('td')
    .contents()
    .each((i, content) => {
      values.push(content.data)
    })

  if (labels.length !== values.length) {
    console.warn('Error fetching Loveland snow info. Check scraping elements.')
    return infoObject
  }

  for (let i = 0; i < labels.length; i++) {
    infoObject.snowInfo[labels[i]] = values[i]
  }

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

async function getCopperInfo() {
  const browser = await puppeteer.launch({ 'headless': 'new' })
  const page = await browser.newPage()

  await page.goto('https://www.coppercolorado.com/the-mountain/trail-lift-info/winter-trail-report/')
  const liftInfoAccordion = await page.waitForSelector('#sector-all-lifts-accordion')
  const liftsOpen = await liftInfoAccordion?.evaluate(el => el.querySelector('ul').querySelector('li').textContent)
  const [_, label, value] = liftsOpen.match(/(^[A-Za-z\s]+)(.+$)/)

  return {
    liftInfo: { [label]: value }
  }
}

async function compileInfo() {
  const aBasinInfo = await getABasinInfo()
  const copperInfo = await getCopperInfo()
  const lovelandInfo = await getLovelandInfo()
  const monarchInfo = await getMonarchInfo()

  const info = {
    aBasinInfo,
    copperInfo,
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

  const {
    aBasinInfo,
    copperInfo,
    lovelandInfo,
    monarchInfo
  } = data

  const wrapperClassnames = classnames({ "p-3 bg-gray-800": true })
  const titleClassnames = classnames({ "text-3xl mb-5 text-gray-300": true })
  const areaTitleClassnames = classnames({ "text-2xl mb-3 pb-1 text-gray-200 border-b-4 border-blue-900": true })
  const areaWrapperClassnames = classnames({ "bg-gray-600 p-3 mb-5 rounded shadow-lg": true })
  const subHeaderClassnames = classnames({ "text-xl mb-3 text-gray-300": true })
  const infoBlockClassnames = classnames({ "p-3": true })
  const labelClassNames = classnames({ "font-bold text-gray-400": true })
  const infoClassNames = classnames({ "font-bold text-gray-300": true })

  return (
    <div className={wrapperClassnames}>
      <h1 className={titleClassnames}>Monarch Pass Ski Area Info</h1>
      <div className={areaWrapperClassnames}>
        <h2 className={areaTitleClassnames}>Arapahoe Basin</h2>
        <h3 className={subHeaderClassnames}>Snow Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(aBasinInfo.snowInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{aBasinInfo.snowInfo[label]}</span>
               </div>
             )
          })}
        </div>
        <h3 className={subHeaderClassnames}>Lift Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(aBasinInfo.liftInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{aBasinInfo.liftInfo[label]}</span>
               </div>
             )
          })}
        </div>
      </div>
      <div className={areaWrapperClassnames}>
        <h2 className={areaTitleClassnames}>Copper Mountain</h2>
        <h3 className={subHeaderClassnames}>Snow Info</h3>
        <div className={infoBlockClassnames}>
          <p>No Data</p>
        </div>
        <h3 className={subHeaderClassnames}>Lift Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(copperInfo.liftInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{copperInfo.liftInfo[label]}</span>
               </div>
             )
          })}
        </div>
      </div>
      <div className={areaWrapperClassnames}>
        <h2 className={areaTitleClassnames}>Loveland</h2>
        <h3 className={subHeaderClassnames}>Snow Info</h3>
        <div className={infoBlockClassnames}>
           {Object.keys(lovelandInfo.snowInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{lovelandInfo.snowInfo[label]}</span>
               </div>
             )
          })}
        </div>
        <h3 className={subHeaderClassnames}>Lift Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(lovelandInfo.liftInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{lovelandInfo.liftInfo[label]}</span>
               </div>
             )
          })}
        </div>
      </div>
      <div className={areaWrapperClassnames}>
        <h2 className={areaTitleClassnames}>Monarch</h2>
        <h3 className={subHeaderClassnames}>Snow Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(monarchInfo.snowInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{monarchInfo.snowInfo[label]}</span>
               </div>
             )
          })}
        </div>
        <h3 className={subHeaderClassnames}>Lift Info</h3>
        <div className={infoBlockClassnames}>
          {Object.keys(monarchInfo.liftInfo).map((label) => {
             return (
               <div key={label}>
                 <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{monarchInfo.liftInfo[label]}</span>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  )
}
