export default async function getCopperInfo() {
  const resp = await fetch('https://api.coppercolorado.com/api/v1/dor/conditions', {
    cache: 'no-store'
  })

  const json = await resp.json()
  return json
}
