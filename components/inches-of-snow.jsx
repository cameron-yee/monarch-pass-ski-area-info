function findSnowAmount(snowInfo) {
  return Object.values(snowInfo).find((value) => {
    return (
      !value.includes(":") ||
      value.includes('”') ||
      value.includes('"') ||
      value.includes("in")
    )
  })
}

function parseInchesOfSnow(snowAmount) {
  try {
    const snowAmountInt = parseInt(snowAmount, 10)
    if (isNaN(snowAmountInt)) {
      return null
    }
    return `${snowAmountInt}"`
  } catch {}

  return null
}

export default function InchesOfSnow({ name, snowInfo, areaData }) {
  let snowAmount = areaData?.data?.snowReports?.[0]?.amount
  if (name !== "Copper Mountain") {
    snowAmount = findSnowAmount(snowInfo)
  }
  const inchesOfSnow = parseInchesOfSnow(snowAmount)
  if (inchesOfSnow === null) {
    return null
  }

  return (
    <span className="bg-gray-800 text-orange-300 p-2 rounded-md">
      {inchesOfSnow}
    </span>
  )
}
