import classnames from 'classnames'

import InfoBlock from './info-block'
import SkiAreaCardTitle from './ski-area-card-title'
import SkiAreaCardSubTitle from './ski-area-card-sub-title'

export default function SkiAreaCard({
  data,
  name
}) {
  const areaWrapperClassnames = classnames({ "bg-gray-600 p-3 mb-5 rounded shadow-lg": true })

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
