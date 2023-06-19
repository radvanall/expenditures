import React, { useEffect, useState } from "react";
import useGetReq from "../../services/hooks/useGetReq";
import MoneyLastDay from "../Charts/MoneyLastDay/MoneyLastDay";
import styles from "./PieChartsWrapper.module.css";
import { useTranslation } from "react-i18next";
type ItemsT = {
  id: number;
  [key: string]: string | number;
};
type ItemTableT = {
  items: ItemsT[];
};
type chartDataT = {
  Item: string;
  "Total price": number;
};
const PieChartsWrapper = () => {
  const { t } = useTranslation(["pieChart"]);
  const { data, loading, error, fetchData } = useGetReq<ItemTableT>(
    `/item.php?request=get_item_chart`
  );
  const {
    data: dataWeek,
    loading: loadingWeek,
    error: errorWeek,
    fetchData: fetchDataWeek,
  } = useGetReq<ItemTableT>(`/item.php?request=get_item_chart_week`);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPriceWeek, setTotalPriceWeek] = useState<number>(0);
  console.log("moneylastdate:", data);
  const [chartData, setChartData] = useState<chartDataT[]>();
  const [chartDataWeek, setChartDataWeek] = useState<chartDataT[]>();
  useEffect(() => {
    let total = 0;
    if (data) {
      const newArray: chartDataT[] = data.items.map((item) => {
        total += parseFloat(item["Total price"].toString());
        return {
          Item: item.Item as string,
          Category: item["Category name"] as string,
          ["Total price"]: parseFloat(item["Total price"].toString()),
        };
      });
      setChartData(newArray);
      setTotalPrice(total);
    }
  }, [data]);
  useEffect(() => {
    let total = 0;
    if (dataWeek) {
      const newArray: chartDataT[] = dataWeek.items.map((item) => {
        total += parseFloat(item["Total price"].toString());
        return {
          Item: item.Item as string,
          Category: item["Category name"] as string,
          ["Total price"]: parseFloat(item["Total price"].toString()),
        };
      });
      setChartDataWeek(newArray);
      setTotalPriceWeek(total);
    }
  }, [data]);
  return (
    <div className={styles.money_last_day}>
      <MoneyLastDay
        chartData={chartData}
        totalPrice={totalPrice}
        title={t("title")}
        top={true}
      />
      <MoneyLastDay
        chartData={chartDataWeek}
        totalPrice={totalPriceWeek}
        title={t("titleWeek")}
      />
    </div>
  );
};

export default PieChartsWrapper;
