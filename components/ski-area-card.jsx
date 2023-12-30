import classnames from 'classnames'

import InfoBlock from './info-block'
import ValuePair from './value-pair'
import SkiAreaCardTitle from './ski-area-card-title'
import SkiAreaCardSubTitle from './ski-area-card-sub-title'

export default function SkiAreaCard({
  data,
  name
}) {
  const areaWrapperClassnames = classnames({ "bg-gray-600 p-3 mb-5 rounded shadow-lg": true })
  const subHeaderClassnames = classnames({ "text-xl mb-3 text-gray-300": true })
  const infoBlockClassnames = classnames({ "p-3": true })

  const { liftInfo, snowInfo } = data

  return (
      <div className={areaWrapperClassnames}>
        <SkiAreaCardTitle title={name} />
        <SkiAreaCardSubTitle title={'Snow Info'} />
        <InfoBlock infoBlock={snowInfo} />
        <SkiAreaCardSubTitle title={'Lift Info'} />
        <InfoBlock infoBlock={liftInfo} />
      </div>
  )
}
