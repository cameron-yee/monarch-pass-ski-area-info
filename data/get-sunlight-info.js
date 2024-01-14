import fetchHTML from './fetch-html'
import * as cheerio from 'cheerio'

export default async function getSunlightInfo() {
  const html = await fetchHTML('https://sunlightmtn.com/the-mountain/snow-weather-report')
  const $ = cheerio.load(html)
  let infoObject = {
    liftInfo: {},
    snowInfo: {}
  }

  /**
    * Lift Report
    */
  const conditionsMain = $('div.conditions-main')
  const liftElems = $(conditionsMain).find('div[class="condition-names"]')
  liftElems.each((i, elem) => {
    const label = $(elem).text().trim()
    const value = $(elem).next().text().trim()
    infoObject.liftInfo[label] = value
  })

  /**
    * Snow Report
    */
  const snowFallMain = $('div.snow-fall-main')
  const snowElems = $(snowFallMain).find('div[class="hours"]')
  snowElems.each((i, elem) => {
    const label = $(elem).text().trim()
    const value = $(elem).next().text().trim()
    infoObject.snowInfo[label] = value
  })

  return infoObject
}
