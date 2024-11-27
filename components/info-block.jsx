import classnames from 'classnames'

import ValuePair from './value-pair'

export default function InfoBlock({ infoBlock, filterValues }) {
  const infoBlockClassnames = classnames({ "py-3 tracking-wider": true })

  return (
    <div className={infoBlockClassnames}>
      {Object.keys(infoBlock).map((label) => {
         return (
           <ValuePair
             label={label}
             value={infoBlock[label]}
             key={label}
             filterValues={filterValues}
           />
         )
      })}
    </div>
  )
}
