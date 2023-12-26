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

  terrainAndLiftStatusElements.each((i, elem) => {
    const rawText = $(elem).text()
    const texts = rawText.split('\n')
      .map(t => t.trim())
      .filter(Boolean)

    const [value, label] = texts
    infoObject[label] = value
  })

  /**
    * Snow Stats
    */
  const snowStats = $('.snow-stats')
  snowStats.find('h5').each((i, elem) => {
    const value = $(elem).text().trim()
    const label = $(elem).next().text().trim()

    infoObject[label] = value
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
    console.warn('Error scraping Monarch lift info. . Check scraping elements.')
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

async function main() {
  const info = await compileInfo()
  console.log(JSON.stringify(info, null, 2))
}

main()
