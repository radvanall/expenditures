import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
} from "recharts";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import useGetReq from "../../../services/hooks/useGetReq";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import { useTheme } from "../../../context/Provider";
type chartDataT = {
  date: string;
  money: number;
};
type moneyPerDay = {
  fields: chartDataT[];
};
const MoneyPerDayChart = () => {
  const { t } = useTranslation(["chart"]);
  const { theme } = useTheme();
  const [firstDate, setFirstDate] = useState<string>(
    DateTime.now()
      .setLocale(t("luxonLocale"))
      .minus({ months: 1 })
      .toISODate() as string
  );
  const [activeButton, setActiveButton] = useState(1);
  const [range, setRange] = useState(7);
  const [money, setMoney] = useState(0);
  const [totalMessage, setTotalMessage] = useState("");
  const { data, loading, error, fetchData } = useGetReq<moneyPerDay>(
    `/invoice.php?request=money_per_date&first_date=${firstDate}`
  );
  const [chartData, setChartData] = useState<chartDataT[]>();
  const changeChart = () => {
    if (data) {
      const { fields } = data;
      const chartArray: chartDataT[] = [];
      let totalMoney = 0;
      if (data?.fields) console.log(data);
      for (let day = activeButton * 30; day >= 0; day--) {
        // const newDate = DateTime.now().minus({ day: day }).toISODate();
        const newDate = DateTime.now()
          .setLocale(t("luxonLocale"))
          .minus({ day: day })
          .toISODate();
        console.log(fields?.find((field) => field.date === newDate));
        const field = fields?.find((field) => field.date === newDate);
        const moneyValue = field ? parseFloat(field.money.toString()) : 0;
        if (field)
          totalMoney = totalMoney + (parseFloat(field.money.toString()) ?? 0);
        chartArray.push({
          date: newDate as string,
          money: moneyValue,
        });
      }
      console.log(chartArray);
      setMoney(totalMoney);
      setChartData(chartArray);
      setRange(7 * Math.ceil(activeButton / 2));
    }
  };
  useEffect(() => {
    changeChart();
  }, [data]);
  useEffect(() => {
    setTotalMessage(
      activeButton === 1
        ? (t("lastMonth") as string)
        : activeButton === 3
        ? (t("last3Months") as string)
        : (t("last6Months") as string)
    );
  }, [t]);
  const handleChangeDate = (buttonId: number) => {
    setFirstDate(
      // DateTime.now().minus({ months: buttonId }).toISODate() as string
      DateTime.now()
        .setLocale(t("luxonLocale"))
        .minus({ months: buttonId })
        .toISODate() as string
    );
    setTotalMessage(
      buttonId === 1
        ? (t("lastMonth") as string)
        : buttonId === 3
        ? (t("last3Months") as string)
        : (t("last6Months") as string)
    );
    setActiveButton(buttonId);
    fetchData();
    //changeChart();
  };
  console.log("t:", t);
  return (
    <div className={styles.chart__wrapper}>
      <div className={styles.button__wrapper}>
        <span className={styles.total}>{totalMessage}</span>
        <span className={styles.total_money}>{money} $</span>
        <BasicButton
          // text="Last month"
          text={t("oneM")}
          color={activeButton === 1 ? "pink" : "blue"}
          handleClick={() => handleChangeDate(1)}
        />
        <BasicButton
          // text="Last three months"
          text={t("threeM")}
          color={activeButton === 3 ? "pink" : "blue"}
          handleClick={() => handleChangeDate(3)}
        />
        <BasicButton
          // text="Last six months"
          text={t("sixM")}
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
            tick={{ fill: theme ? "black" : "#bfa181", fillOpacity: 0.8 }}
            // interval={6}
            tickFormatter={(str) => {
              // const datef = DateTime.fromISO(str);
              const datef = DateTime.fromISO(str);
              if (datef.day % range === 0) {
                console.log(datef.toFormat("MMM,d"));
                // return datef.toFormat("MMM,d");
                return datef.setLocale(t("luxonLocale")).toFormat("MMM,d");
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
            tick={{ fill: theme ? "black" : "#bfa181", fillOpacity: 0.8 }}
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
// interface CustomTooltipProps<ValueType, NameType> extends TooltipProps<ValueType, NameType> {
//   t: TFunction;
// }
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  const { t } = useTranslation(["chart"]);
  if (active && payload) {
    const value = Number(payload[0]?.value);
    const formattedValue = isNaN(value) ? "" : value.toFixed(2);
    return (
      <div className={styles.tooltip}>
        <h4>
          {DateTime.fromISO(label)
            .setLocale(t("luxonLocale"))
            .toFormat("cccc, d MMM, yyyy")}
        </h4>
        <p>{formattedValue} lei</p>
      </div>
    );
  }
  return null;
}
