"use client"
import React from "react"
import classnames from "classnames"

export default function OpenFilter({ openFilter, setOpenFilter }) {
  const buttonClassNames = classnames({
    "border-slate-500 focus:border-slate-100 p-3 shadow-lg rounded-lg text-sm font-semibold h-full outline-none border-2 opacity-90 focus:opacity-100": true,
    "text-zinc-200": !openFilter,
    "bg-orange-300 text-gray-800": openFilter
  })

  const toggle = React.useCallback(() => {
    setOpenFilter((current) => !current)
  }, [setOpenFilter])

  return (
    <>
      <div
        className="flex mb-5 overflow-x-auto"
        name="filter open"
        id="filter-open"
      >
        <div className="flex mb-5 overflow-x-auto">
          <button
            className={buttonClassNames}
            onClick={toggle}
          >
            Only show open: {String(openFilter)}
          </button>
        </div>
      </div>
    </>
  )
}
