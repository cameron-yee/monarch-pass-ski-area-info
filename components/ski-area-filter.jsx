"use client"
import React from "react"
import classnames from "classnames"

export default function SkiAreaFilter({ options, onFilter }) {
  const [selected, setSelected] = React.useState(options)

  function updateFilters(updatedValue) {
    setSelected(updatedValue)
    onFilter(updatedValue)
  }

  function toggleFilter(name) {
    const idx = selected.indexOf(name)
    if (idx === -1) {
      const updatedValue = [...selected, name]
      updateFilters(updatedValue)
      return
    }

    const updatedValue = [...selected]
    updatedValue.splice(idx, 1)
    updateFilters(updatedValue)
  }

  const baseButtonClassName = classnames({
    "p-3 shadow-lg rounded-lg text-sm font-bold h-full outline-none border-2 border-transparent opacity-90 focus:opacity-100 text-zinc-100": true
  })

  const metaButtonClassNames = classnames({
    [baseButtonClassName]: true,
    "border-slate-600 focus:border-slate-900": true
  })

  return (
    <>
      <div
        className="flex mb-5 overflow-x-auto"
        name="filter ski areas"
        id="filter-ski-areas"
      >
        {options.map((name, index) => {
          const className = classnames({
            [baseButtonClassName]: true,
            "ml-2": index !== 0,
            "bg-[#ffcb03] focus:border-[#ffcb03]": selected.includes(name),
            "bg-slate-500 focus:border-slate-900": !selected.includes(name)
          })
          return (
            <div key={name}>
              <button className={className} onClick={() => toggleFilter(name)}>{name}</button>
            </div>
          )
        })}
      </div>
      <div className="flex mb-5 overflow-x-auto">
        <button className={metaButtonClassNames} onClick={() => updateFilters([])}>Remove All</button>
        <button className={classnames(metaButtonClassNames, 'ml-2')} onClick={() => updateFilters(options)}>Reset</button>
      </div>
    </>
  )
}
