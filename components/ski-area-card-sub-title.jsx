import classnames from 'classnames'

export default function SkiAreaCardSubTitle({ title }) {
  const subHeaderClassnames = classnames({ "text-2xl mb-3 text-blue-100": true })

  return (
    <h3 className={subHeaderClassnames}>{title}</h3>
  )
}
