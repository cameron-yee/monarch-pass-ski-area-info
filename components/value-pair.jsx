import React from 'react'
import classnames from 'classnames'

export default function ValuePair({ subValues, label, value, filterValues=[] }) {
  const valueLowerCase = String(value).toLowerCase()

  const labelClassNames = classnames({ "text-xl font-bold text-gray-300": true })
  const valueClassNames = classnames({
    "text-xl font-bold": true,
    "text-orange-200": valueLowerCase !== 'open' && valueLowerCase !== 'closed',
    "text-green-300": valueLowerCase === 'open',
    "text-red-300": valueLowerCase === 'closed'
  })
  const subValueDividerClassNames = classnames({ "text-sm font-normal text-gray-400": true })

  const subValueClassNames = React.useCallback((index) => {
    return classnames({
      "text-sm font-normal": true,
      "text-blue-300": index !== 1,
      "text-green-200": index === 1
    })
  }, [])

  for (let i = 0; i < filterValues.length; i++) {
    const filterFn = filterValues[i]
    if (typeof filterValues[i] === 'function') {
      if (filterFn(value) === false) {
        return null
      }
    }
  }

  if (!subValues) {
    return (
      <div>
        <span className={labelClassNames}>{label}: </span><span className={valueClassNames}>{value}</span>
      </div>
    )
  }

  const subValueMap = subValues.map((subValue, index) => {
    if (index === 0) {
      return (
        <span className={subValueClassNames(index)} key={subValue}>{subValue}</span>
      )
    }

    return (
      <>
        <span className={subValueDividerClassNames}> / </span><span className={subValueClassNames(index)}>{subValue}</span>
      </>
    )
  })

  if (subValues) {
    return (
      <div>
        <span className={labelClassNames}>{label}: </span><span className={valueClassNames}>{value}</span> {subValueMap}
      </div>
    )
  }

}
