'use client'
import React from 'react'
import classnames from 'classnames'

export default function SkiAreaFilter({ options, onFilter }) {
  const [selected, setSelected] = React.useState(options)

  function toggleFilter(name) {
    const idx = selected.indexOf(name)
    if (idx === -1) {
      const updated = [...selected, name]
      setSelected(updated)
      onFilter(updated)
      return
    }

    const updated = [...selected]
    updated.splice(idx, 1)
    setSelected(updated)
    onFilter(updated)
  }

  return (
    <div
      className='flex mb-5 p-2 overflow-x-auto'
      name='filter ski areas'
      id='filter-ski-areas'
    >
      {options.map((name, index) => {
        const className = classnames({
          'p-3 shadow-lg rounded-lg text-sm font-bold h-full outline-none border-2 opacity-90 focus:border-[#ffcb03] focus:opacity-100': true,
          'ml-2': index !== 0,
          'bg-[#ffcb03]': selected.includes(name),
          'bg-slate-500': !selected.includes(name)
        })
        return (
          <div key={name}>
            <button className={className} onClick={() => toggleFilter(name)}>{name}</button>
          </div>
        )
      })}
    </div>
  )
}
