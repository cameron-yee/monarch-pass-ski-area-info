import classnames from 'classnames'
import { IconChevronUp } from '@tabler/icons-react'

export default function SkiAreaCardTitle({ isExpanded, onClick, title }) {
  const areaTitleClassnames = classnames({ "text-3xl text-zinc-100 mr-3": true })
  const borderClassnames = classnames({ "block border-4 border-yellow-600 my-4 rounded": true })
  const toggleClassnames = classnames({
    "text-gray-300 bg-gray-800 text-xs px-4 py-1 outline-none focus:ring-2 rounded-full ring-yellow-600 border border-gray-500": true
  })
  const toggleIconClassnames = classnames({
    "transition ease-in-out duration-200 inline w-4 h-4": true
  })
  const showIconClassnames = classnames(toggleIconClassnames, {
    "rotate-180": true
  })

  return (
    <>
      <div className={'flex'}>
        <h2 className={areaTitleClassnames}>{title}</h2>
        {isExpanded
           ? <button onClick={onClick} className={toggleClassnames}>Hide <IconChevronUp className={toggleIconClassnames} /></button>
           : <button onClick={onClick} className={toggleClassnames}>Show <IconChevronUp className={showIconClassnames} /></button>
        }
      </div>
      <span className={borderClassnames} />
    </>
  )
}
