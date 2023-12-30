import fetchHTML from '../data/fetch-html'
import * as cheerio from 'cheerio'

export default async function getABasinInfo() {
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
