import fetchHTML from "../data/fetch-html"
import * as cheerio from "cheerio"

export default async function getPurgatoryInfo() {
  const html = await fetchHTML("https://www.purgatory.ski/mountain/weather-conditions-webcams/snow-weather/")
  const $ = cheerio.load(html)
  let infoObject = {
    liftInfo: {},
    snowInfo: {}
  }

  /**
    * Terrain and Lift Status elements
    */
  const terrainAndLiftStatus = $(".m-weather-header-charts")
  const terrainAndLiftStatusValueElements = terrainAndLiftStatus.find("tspan.donut-percent")
  const terrainAndLiftStatusValueTotalElements = terrainAndLiftStatus.find("tspan.donut-data")

  const labels = ["Trails Open", "Lifts Open"]
  terrainAndLiftStatusValueElements.each((i, valueElem) => {
    // ignore hidden tab with duplicate lift info
    if (i >= 2) {
      return
    }

    terrainAndLiftStatusValueTotalElements.each((idx, valueTotalElem) => {
      if (i === idx) {
        infoObject.liftInfo[labels[i]] = `${$(valueElem).text()} ${$(valueTotalElem).text()}`
      }
    })
  })

  /**
    * Snow Stats
    */
  const snowStats = $(".m-snow-totals-top")
  const snowLabels = $(".m-snow-totals-label")

  if (snowStats.length !== snowLabels.length) {
    return infoObject
  }

  snowStats.each((i, valueElem) => {
    snowLabels.each((idx, labelElem) => {
      if (i === idx) {
        const value = $(valueElem).text().trim()
        const label = $(labelElem).text().trim()

        infoObject.snowInfo[label] = value
      }
    })
  })

  return infoObject
}
