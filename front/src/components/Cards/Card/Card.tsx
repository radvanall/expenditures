import { FC, ReactNode } from "react";
import styles from "./Card.module.css";
interface Props {
  children: ReactNode;
}
const Card: FC<Props> = ({ children }) => {
  return <div className={styles.card__wrapper}>{children}</div>;
};

export default Card;
