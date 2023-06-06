import React, { useState } from "react";
import UserCard from "../../components/Cards/UserCard/UserCard";
import styles from "./Home.module.css";
import MoneyPerDayChart from "../../components/Charts/MoneyPerDayChart/MoneyPerDayChart";
import CategoryCard from "../../components/Cards/CategoryCard/CategoryCard";
import ItemCard from "../../components/Cards/ItemCard/ItemCard";
const Home = () => {
  return (
    <div className={styles.home__wrapper}>
      <UserCard />
      <div className={styles.grid_col_span_3}>
        <MoneyPerDayChart />
      </div>
      <div className={styles.grid_col_span_2}>
        <CategoryCard />
        {/* <ProgressBar max={1000000000} value={100000000} /> */}
      </div>
      <div className={styles.grid_col_span_2}>
        <ItemCard />
      </div>
    </div>
  );
};

export default Home;
