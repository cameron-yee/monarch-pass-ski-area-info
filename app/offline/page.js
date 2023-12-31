import React from 'react'
import classnames from 'classnames'

export default function Offline() {
  const offlineClassnames = classnames({ 'text-xl h-screen w-screen p-3 bg-gray-800': true })

  return (
    <div className={offlineClassnames}>
      {'Data can\'t be fetched offline.'}
    </div>
  )
}
