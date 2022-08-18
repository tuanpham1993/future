import GaugeChart from "react-gauge-chart";

export default function RiskyRatio(props) {
  return (
    <div className="risky-ratio">
      <div className="risky-ratio__chart">
        <GaugeChart
          id="gauge-chart1"
          animate={false}
          percent={props.ratio}
          colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        />
      </div>

      <div>
        <table>
          <tr>
            <td>Balance</td>
            <td>{props.futureBalance}</td>
          </tr>
          <tr>
            <td>Used</td>
            <td>{props.positionsBalance}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
