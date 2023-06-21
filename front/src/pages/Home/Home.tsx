import UserCard from "../../components/Cards/UserCard/UserCard";
import styles from "./Home.module.css";
import MoneyPerDayChart from "../../components/Charts/MoneyPerDayChart/MoneyPerDayChart";
import CategoryCard from "../../components/Cards/CategoryCard/CategoryCard";
import ItemCard from "../../components/Cards/ItemCard/ItemCard";
import PieChartsWrapper from "../../components/PieChartsWrapper/PieChartsWrapper";
const Home = () => {
  return (
    <div className={styles.home__wrapper}>
      <div className={styles.card}>
        <UserCard />
      </div>
      <div className={styles.lineChart}>
        <MoneyPerDayChart />
      </div>
      <div className={styles.pieWrapper}>
        <PieChartsWrapper />
      </div>
      <div className={styles.categories}>
        <CategoryCard />
      </div>
      <div className={styles.items}>
        <ItemCard />
      </div>
    </div>
  );
};

export default Home;
