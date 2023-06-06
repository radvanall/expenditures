import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import styles from "./MoneyPerDayChart.module.css";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Scatter,
  ComposedChart,
} from "recharts";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import useGetReq from "../../../services/hooks/useGetReq";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
type chartDataT = {
  date: string;
  money: number;
};
type moneyPerDay = {
  fields: chartDataT[];
};
const MoneyPerDayChart = () => {
  //const firstDate = DateTime.now().minus({ months: 1 }).toISODate();
  const [firstDate, setFirstDate] = useState<string>(
    DateTime.now().minus({ months: 1 }).toISODate() as string
  );
  const [activeButton, setActiveButton] = useState(1);
  const [range, setRange] = useState(7);
  const { data, loading, error, fetchData } = useGetReq<moneyPerDay>(
    `/invoice.php?request=money_per_date&first_date=${firstDate}`
  );
  const [chartData, setChartData] = useState<chartDataT[]>();
  const changeChart = () => {
    if (data) {
      const { fields } = data;
      const chartArray: chartDataT[] = [];

      if (data?.fields) console.log(data);
      for (let day = activeButton * 30; day >= 0; day--) {
        const newDate = DateTime.now().minus({ day: day }).toISODate();
        console.log(fields?.find((field) => field.date === newDate));
        const field = fields?.find((field) => field.date === newDate);
        const moneyValue = field ? parseFloat(field.money.toString()) : 0;
        chartArray.push({
          date: newDate as string,
          money: moneyValue,
        });
      }
      console.log(chartArray);
      setChartData(chartArray);
      setRange(7 * Math.ceil(activeButton / 2));
    }
  };
  useEffect(() => {
    changeChart();
  }, [data]);
  const handleChangeDate = (buttonId: number) => {
    setFirstDate(
      DateTime.now().minus({ months: buttonId }).toISODate() as string
    );
    setActiveButton(buttonId);
    fetchData();
    //changeChart();
  };
  return (
    <div className={styles.chart__wrapper}>
      <div className={styles.button__wrapper}>
        <BasicButton
          text="Last month"
          color={activeButton === 1 ? "pink" : "blue"}
          handleClick={() => handleChangeDate(1)}
        />
        <BasicButton
          text="Last three months"
          color={activeButton === 3 ? "pink" : "blue"}
          handleClick={() => handleChangeDate(3)}
        />
        <BasicButton
          text="Last six months"
          color={activeButton === 6 ? "pink" : "blue"}
          handleClick={() => handleChangeDate(6)}
        />
      </div>
      <ResponsiveContainer width={"100%"} height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#297497" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#297497" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="money" stroke="#297497" fill="url(#color)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickCount={4}
            interval={0}
            // interval={6}
            tickFormatter={(str) => {
              const datef = DateTime.fromISO(str);
              if (datef.day % range === 0) {
                console.log(datef.toFormat("MMM,d"));
                return datef.toFormat("MMM,d");
              } else return "";
            }}
          />

          <YAxis
            dataKey="money"
            type="number"
            domain={["auto", "dataMax"]}
            allowDataOverflow={true}
            // domain={["auto", "dataMax"]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(number: number) => `${number.toFixed(2)} lei`}
            width={100}
          />
          <CartesianGrid opacity={0.4} vertical={false} stroke="#297497" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#297497", strokeWidth: 1 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyPerDayChart;
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    const value = Number(payload[0]?.value);
    const formattedValue = isNaN(value) ? "" : value.toFixed(2);
    return (
      <div className={styles.tooltip}>
        <h4>{DateTime.fromISO(label).toFormat("cccc, d MMM, yyyy")}</h4>
        <p>{formattedValue} lei</p>
      </div>
    );
  }
  return null;
}
