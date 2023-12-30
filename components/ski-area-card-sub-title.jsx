import classnames from 'classnames'

export default function SkiAreaCardSubTitle({ title }) {
  const subHeaderClassnames = classnames({ "text-xl mb-3 text-gray-300": true })

  return (
    <h3 className={subHeaderClassnames}>{title}</h3>
  )
}
