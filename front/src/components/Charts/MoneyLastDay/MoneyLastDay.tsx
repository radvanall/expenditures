import React, { FC, useEffect, useState } from "react";
import useGetReq from "../../../services/hooks/useGetReq";
import Card from "../../Cards/Card/Card";
import styles from "./MoneyLastDay.module.css";
import { Tooltip, PieChart, Pie, Cell, TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useTranslation } from "react-i18next";
type chartDataT = {
  Item: string;
  "Total price": number;
};
interface Props {
  chartData: chartDataT[] | undefined;
  totalPrice: number;
  title: string;
  top?: boolean;
}
const MoneyLastDay: FC<Props> = ({ chartData, totalPrice, title, top }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  const COLORS = ["#178582", "#bfa181", "#f07f93", "#297497"];

  return (
    <Card>
      {chartData && (
        // <ResponsiveContainer width="100%" height={195}>
        // <ResponsiveContainer>
        <div className={styles.chart__wrapper}>
          <PieChart height={210} width={170}>
            <Pie
              data={chartData}
              dataKey="Total price"
              nameKey="Item"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={80}
              stroke="none"
              strokeWidth={0}
              //   onMouseEnter={handleMouseEnter}
              //   onMouseLeave={handleMouseLeave}
              //   activeIndex={activeIndex}

              // fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell
                  //   onMouseEnter={handleMouseEnter}
                  //   onMouseLeave={handleMouseLeave}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={
                    index === activeIndex
                      ? {
                          filter: `drop-shadow(0px 0px 5px ${
                            COLORS[index % COLORS.length]
                          }`,
                          cursor: "pointer",
                        }
                      : {}
                  }
                  stroke="0"
                />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              content={<CustomTooltip />}
            />
            {/* <Legend verticalAlign="middle" layout="vertical" align="right" /> */}

            {/* <Pie
              data={data?.items}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            /> */}
          </PieChart>
          <div
            className={
              top
                ? `${styles.total__price} ${styles.top_40}`
                : styles.total__price
            }
          >
            <span>{title}</span>
            {/* <span>Expenses last 7 days:</span> */}
            {/* <br /> */}
            <span>{totalPrice}$</span>
          </div>
        </div>
        // {/* </ResponsiveContainer> */}
      )}
    </Card>
  );
};

export default MoneyLastDay;

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  const { t } = useTranslation(["pieChart"]);
  if (active && payload) {
    const value = Number(payload[0]?.value);
    console.log("label", label);
    console.log("value", payload[0].payload);
    const color: string = payload[0].payload.fill;
    //   const formattedValue = isNaN(value) ? "" : value.toFixed(2);
    return (
      <div className={styles.tooltip}>
        <p style={{ color: color }}>
          {t("item")} {payload[0].payload.Item}
        </p>
        <p>
          {t("expenses")} {payload[0].payload["Total price"]}$
        </p>
        <p>
          {t("category")}
          {payload[0].payload.Category}
        </p>

        {/* <h4>
            {DateTime.fromISO(label)
              .setLocale(t("luxonLocale"))
              .toFormat("cccc, d MMM, yyyy")}
          </h4>
          <p>{formattedValue} lei</p> */}
      </div>
    );
  }
  return null;
}
