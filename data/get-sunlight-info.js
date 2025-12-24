import fetchHTML from './fetch-html'
import * as cheerio from 'cheerio'

export default async function getSunlightInfo() {
  const html = await fetchHTML('https://sunlightmtn.com/explore/mountain-status/')
  const $ = cheerio.load(html)
  let infoObject = {
    liftInfo: {},
    snowInfo: {}
  }

  /**
    * Lift Report
    */
  const liftQueries = [
    "Primo Chair",
    "Segundo Chair",
    "Tercero Chair"
  ]
  liftQueries.forEach((query) => {
    const spans = $(`span:contains("${query}")`)
    const target = spans[spans.length - 1]
    const status = $(target).next().text()
    infoObject.liftInfo[query] = status
  })

  /**
    * Snow Report
    */
  const snowQueries = [
    "Since 4PM",
    "Last 24 Hours",
    "Last 48 Hours",
    "Season Total"
  ]
  snowQueries.forEach((query) => {
    const spans = $(`span:contains("${query}")`)
    const target = spans[spans.length - 1]
    const amount = $(target).parent().next().text()
    infoObject.snowInfo[query] = amount
  })

  return infoObject
}
