import { FC } from "react";
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
  const COLORS = ["#178582", "#bfa181", "#f07f93", "#297497"];
  return (
    <Card>
      {chartData && (
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
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="0"
                />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              content={<CustomTooltip />}
            />
          </PieChart>
          <div
            className={
              top
                ? `${styles.total__price} ${styles.top_40}`
                : styles.total__price
            }
          >
            <span>{title}</span>

            <span>{totalPrice}$</span>
          </div>
        </div>
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
    const color: string = payload[0].payload.fill;
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
      </div>
    );
  }
  return null;
}
