import classnames from 'classnames'

export default function SkiAreaCardTitle({ title }) {
  const areaTitleClassnames = classnames({ "text-2xl mb-3 pb-1 text-gray-200 border-b-4 border-blue-900": true })

  return (
    <h2 className={areaTitleClassnames}>{title}</h2>
  )
}
