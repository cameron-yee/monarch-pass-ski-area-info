import fetchHTML from '../data/fetch-html'
import * as cheerio from 'cheerio'

export default async function getMonarchInfo() {
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
