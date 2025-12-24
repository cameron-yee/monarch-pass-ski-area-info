"use client"
import React from "react"
import classnames from "classnames"

export default function SkiAreaFilter({ data, onFilter }) {
  const allAreaFilterKeys = Object.keys(data)
    .map((key) => data[key].name)

  const [selected, setSelected] = React.useState(allAreaFilterKeys)

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
    "p-3 shadow-lg rounded-lg text-sm font-semibold h-full outline-none border-2 opacity-90 focus:opacity-100": true
  })

  const metaButtonClassNames = classnames({
    [baseButtonClassName]: true,
    "border-slate-500 focus:border-slate-100 text-zinc-200": true
  })

  return (
    <>
      <div
        className="flex mb-5 overflow-x-auto"
        name="filter ski areas"
        id="filter-ski-areas"
      >
        {allAreaFilterKeys.map((name, index) => {
          const className = classnames({
            [baseButtonClassName]: true,
            "border-transparent flex items-center gap-2": true,
            "ml-2": index !== 0,
            "bg-orange-300 focus:border-orange-700 text-gray-800": selected.includes(name),
            "bg-slate-600 focus:border-slate-100 text-zinc-200": !selected.includes(name)
          })
          const areaData = Object.values(data).find((value) => value.name === name)
          const snowInfo = areaData?.data?.snowInfo || {}
          let snowAmount = Object.values(snowInfo).find((value) => {
            return (
              !value.includes(":") ||
              value.includes('”') ||
              value.includes('"') ||
              value.includes("in")
            )
          })

          if (name === "Copper Mountain") {
            snowAmount = areaData?.data?.snowReports[0]?.amount
          }

          let formattedSnow = snowAmount
          try {
            formattedSnow = `${parseInt(formattedSnow, 10)}"`
          } catch {}

          return (
            <div key={name}>
              <button
                className={className}
                onClick={() => toggleFilter(name)}
              >
                <span>{name}</span>
                {snowAmount !== undefined ? (
                  <span className="bg-gray-800 text-orange-300 p-2 rounded-md">
                    {formattedSnow}
                  </span>)
                  : null
                }
              </button>
            </div>
          )
        })}
      </div>
      <div className="flex mb-5 overflow-x-auto">
        <button className={metaButtonClassNames} onClick={() => updateFilters([])}>Remove All</button>
        <button className={classnames(metaButtonClassNames, 'ml-2')} onClick={() => updateFilters(allAreaFilterKeys)}>Reset</button>
      </div>
    </>
  )
}
