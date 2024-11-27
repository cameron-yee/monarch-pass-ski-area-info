async function fetchCopperAPI(url) {
  try {
    const resp = await fetch(url, {
      cache: 'no-store'
    })

    if (resp.status !== 200) {
      throw new Error(`Copper Info: ${resp.status} ${resp.statusText}`)
    }

    const json = await resp.json()
    return json
  } catch (err) {
    console.error(err)
    return null
  }
}

async function getCopperLiftReports() {
  const url = 'https://api.coppercolorado.com/api/v1/dor/drupal/lifts'
  return fetchCopperAPI(url)
}

async function getCopperSnowReports() {
  const url = 'https://api.coppercolorado.com/api/v1/dor/drupal/snow-reports?sort=date&direction=desc'
  return fetchCopperAPI(url)
}

async function getCopperTrailReports() {
  const url = 'https://api.coppercolorado.com/api/v1/dor/drupal/trails'
  return fetchCopperAPI(url)
}

export default async function getCopperInfo() {
  try {
    const [liftReports, snowReports, trailReports] = await Promise.all([getCopperLiftReports(), getCopperSnowReports(), getCopperTrailReports()])

    return {
      liftReports,
      snowReports,
      trailReports
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
