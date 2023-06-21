import BasicInput from "../Inputs/BasicInput/BasicInput";
import styles from "./FilterMenu.module.css";
import Radiobox from "../Radiobox/Radiobox";
import Checkbox from "../Checkbox/Checkbox";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import RangeInput from "../RangeInput/RangeInput";
import { useInvoicesContext } from "../../pages/Invoices/InvoincesContext";
import { useTranslation } from "react-i18next";
const FilterMenu = () => {
  const { t } = useTranslation(["filterMenu"]);
  const {
    handleSubmit,
    handleFormChange,
    handleRadioClick,
    formData,
    maxPrice,
    isChecked,
  } = useInvoicesContext();
  return (
    <div className={styles.menu__wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.checkbox__wrapper}>
          <Radiobox
            id="date"
            name="date_radio"
            label={t("filterByDate")}
            labelFontWeight="600"
            checked={isChecked.date}
            value="date"
            onChange={handleFormChange}
            onClick={handleRadioClick}
          />
        </div>
        <div className={`${styles.input__wrapper} ${styles.date__wrapper}`}>
          <BasicInput
            type="date"
            label=""
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.checkbox__wrapper}>
          <Radiobox
            id="date2"
            name="date_radio"
            label={t("filterByARangeOfDates")}
            labelFontWeight="600"
            checked={isChecked.range}
            value="range"
            onChange={handleFormChange}
            onClick={handleRadioClick}
          />
        </div>
        <div className={`${styles.input__wrapper} ${styles.range__wrapper}`}>
          <BasicInput
            type="date"
            label={t("firstDate") as string}
            name="first_date"
            value={formData.first_date}
            onChange={handleFormChange}
          />
        </div>
        <div className={`${styles.input__wrapper} ${styles.range__wrapper}`}>
          <BasicInput
            type="date"
            label={t("lastDate") as string}
            name="last_date"
            value={formData.last_date}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.checkbox__wrapper}>
          <Checkbox
            name="min_price_checkbox"
            label={t("minPrice") as string}
            id="min_price"
            labelFontWeight="600"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.input__wrapper}>
          <RangeInput
            name="min_price"
            value={formData.min_price}
            max={maxPrice}
            unit="$"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.checkbox__wrapper}>
          <Checkbox
            name="max_price_checkbox"
            label={t("maxPrice") as string}
            id="max_price"
            labelFontWeight="600"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.input__wrapper}>
          <RangeInput
            name="max_price"
            value={formData.max_price}
            max={maxPrice}
            unit="$"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.button__wrapper}>
          <BasicButton
            type="submit"
            text={t("submit") as string}
            fontSize="16px"
          />
        </div>
      </form>
    </div>
  );
};

export default FilterMenu;
