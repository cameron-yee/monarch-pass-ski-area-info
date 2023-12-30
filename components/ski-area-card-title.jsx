import classnames from 'classnames'

export default function SkiAreaCardTitle({ title }) {
  const areaTitleClassnames = classnames({ "text-3xl mb-3 pb-1 text-zinc-100 border-b-4 border-blue-900": true })

  return (
    <h2 className={areaTitleClassnames}>{title}</h2>
  )
}
