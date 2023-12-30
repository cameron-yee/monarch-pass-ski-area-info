import classnames from 'classnames'

export default function ValuePair({ label, value }) {
  const labelClassNames = classnames({ "font-bold text-gray-400": true })
  const infoClassNames = classnames({ "font-bold text-gray-300": true })

  return (
    <div>
      <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{value}</span>
    </div>
  )
}
