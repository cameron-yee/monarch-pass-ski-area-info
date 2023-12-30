import classnames from 'classnames'

export default function SkiAreaCardTitle({ title }) {
  const areaTitleClassnames = classnames({ "text-3xl text-zinc-100": true })
  const borderClassnames = classnames({ "block border-4 border-yellow-600 my-4 rounded": true })

  return (
    <>
      <h2 className={areaTitleClassnames}>{title}</h2>
      <span className={borderClassnames} />
    </>
  )
}
