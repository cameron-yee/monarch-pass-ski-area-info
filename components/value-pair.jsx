import classnames from 'classnames'

export default function ValuePair({ label, value }) {
  const labelClassNames = classnames({ "text-xl font-bold text-gray-300": true })
  const infoClassNames = classnames({ "text-xl font-bold text-gray-50": true })

  return (
    <div>
      <span className={labelClassNames}>{label}: </span><span className={infoClassNames}>{value}</span>
    </div>
  )
}
