import React, { useEffect, useState } from "react";
import ProgressBar, { ProgressBarI } from "../../../ProgressBar/ProgressBar";
import Card from "../Card";

const CategoryCard = () => {
  const [progress, setProgress] = useState<ProgressBarI[]>([]);
  useEffect(() => {
    const newDivs: ProgressBarI[] = [];
    for (let i = 98; i <= 105; i++) {
      newDivs.push({ value: i, max: 105 });
    }
    setProgress(newDivs);
  }, []);

  const createProgressBars = () => {
    return progress.map((item) => (
      <ProgressBar value={item.value} max={item.max} />
    ));
  };
  return <Card>{createProgressBars()}</Card>;
};

export default CategoryCard;
