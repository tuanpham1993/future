import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { map } from "lodash";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function OrdersChart(props) {
  const data = map(props.pos.orders, (order, index) => +order.price);
  data.push(props.pos.price);
  const labels = map(props.pos.orders, (order) => new Date(order.time));
  labels.push(new Date());

  return (
    <div className="chart">
      <Line
        datasetIdKey="id"
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return props.pos.orders[context.dataIndex]?.kind || "NOW";
                },
              },
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                minUnit: "day",
              },
            },
          },
          maintainAspectRatio: false,
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: props.pos.symbol,
              data,
              borderColor: "green",
            },
          ],
        }}
      />
    </div>
  );
}
