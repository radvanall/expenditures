import React from "react";
import UserCard from "../../components/Cards/UserCard/UserCard";
import styles from "./Home.module.css";
import MoneyPerDayChart from "../../components/Charts/MoneyPerDayChart/MoneyPerDayChart";
const Home = () => {
  return (
    <div className={styles.home__wrapper}>
      <UserCard />
      <div className={styles.grid_col_span_3}>
        <MoneyPerDayChart />
      </div>
      <div className={styles.grid_col_span_2}> df</div>
      <div className={styles.grid_col_span_2}>dfs</div>
    </div>
  );
};

export default Home;
