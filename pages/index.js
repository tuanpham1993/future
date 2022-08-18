import useSWR from "swr";
import  { reduce } from 'lodash'

import Positions from "../components/Positions";
import RiskyRatio from "../components/RiskyRatio";
import { future } from "../next.config";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: positions, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/positions`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { data: futureBalance } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/balances`, fetcher);

  if (error) return <p>Loading failed...</p>;
  if (!positions) return <h1>Loading...</h1>;

  const positionsBalance = reduce(positions, (sum, pos) => sum + pos.notional, 0)
  const ratio = futureBalance / positionsBalance;

  return (
    <>
      <RiskyRatio futureBalance={futureBalance} positionsBalance={positionsBalance} ratio={ratio > 1 ? 1 : ratio}/>
      <Positions positions={positions} />
    </>
  ) 
}
