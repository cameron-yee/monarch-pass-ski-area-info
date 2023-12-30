import fetchHTML from '../data/fetch-html'
import * as cheerio from 'cheerio'

export default async function getLovelandInfo() {
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
