export default async function fetchHTML(page) {
  const resp = await fetch(page, { cache: 'no-store' })
  const text = await resp.text()
  return text
}
