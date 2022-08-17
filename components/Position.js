import OrdersChart from './OrdersChart'
import PositionInfo from './PositionInfo'

export default function Position (props) {
    return <div className='position-detail'>
        <OrdersChart pos={props.pos} />
        <PositionInfo pos={props.pos} />
    </div>
}