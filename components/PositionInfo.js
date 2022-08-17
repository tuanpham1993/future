export default function PositionInfo(props) {
    return (
        <div className="position-info">
            <table className="position-info-table">
                <tr>
                    <td>Change</td>
                    <td>{props.pos.changePercent}</td>
                </tr> 
                <tr>
                    <td>Next DCA</td>
                    <td>{props.pos.nextDcaPercent}</td>
                </tr>   
                <tr>
                    <td>Next Sub DCA</td>
                    <td>{props.pos.nextSubDcaPercent}</td>
                </tr>    
                <tr>
                    <td>Next Cut</td>
                    <td>{props.pos.nextCutPercent}</td>
                </tr>    
                <tr>
                    <td>Next Profit</td>
                    <td>{props.pos.nextProfit}</td>
                </tr>    
            </table>    
        </div>
    )
}