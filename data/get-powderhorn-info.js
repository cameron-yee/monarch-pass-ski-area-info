import fetchHTML from './fetch-html'
import * as cheerio from 'cheerio'

export default async function getPowderhornInfo() {
  const html = await fetchHTML('https://www.powderhorn.com/explore/conditions/weather-report.html')
  const $ = cheerio.load(html)
  let infoObject = {
    liftInfo: {
    },
    snowInfo: {}
  }

  /**
    * Lift Report
    */
  const liftElements = $('i[class="groomed"]')
  liftElements.each((i, elem) => {
    const text = $(elem).text().trim()

    if (infoObject.liftInfo[text]) {
      infoObject.liftInfo[text] += 1
      return
    }

    infoObject.liftInfo[text] = 1
  })

  /**
    * Snow Report
    */
  let snowElements = {}
  const inElements = $('span:contains("in")')
  inElements.each((i, elem) => {
    const text = $(elem).text().trim()
    if (text === 'in') {
      const parentElement = $(elem).parent()
      const label = $(parentElement).prev().text()
      infoObject.snowInfo[label] = parentElement.text()
    }
  })

  return infoObject
}
