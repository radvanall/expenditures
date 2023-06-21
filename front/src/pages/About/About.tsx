import { useTranslation } from "react-i18next";
import styles from "./About.module.css";
const About = () => {
  const { t } = useTranslation(["about"]);
  return (
    <div className={styles.about}>
      <h3>{t("title")}</h3>
      <br />
      <p>{t("p1")}</p>
      <br />
      <p>{t("p2")}</p>
      <br />
      <p>{t("p3")}</p>
      <br />
      <p>{t("p4")}</p>
      <br />
      <p>{t("p5")}</p>
      <br />
      <p>{t("p6")}</p>
      <br />
      <p>{t("p7")}</p>
    </div>
  );
};

export default About;
