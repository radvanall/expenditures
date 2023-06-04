import React, { useEffect, useState } from "react";
import useGetReq from "../../../../services/hooks/useGetReq";
import ProgressBar, { ProgressBarI } from "../../../ProgressBar/ProgressBar";
import Table from "../../../Table/Table";
import Card from "../Card";
type categoriesT = {
  id: number;
  "Category name": string;
  "Number of items": number;
  "Total price": number;
};
type CategoryTableT = {
  categories: categoriesT[];
};

type categoriesElementsT = {
  id: number;
  "Category name": string;
  "Number of items": number;
  "Total price": JSX.Element;
};
const CategoryCard = () => {
  const { data, loading, error, fetchData } = useGetReq<CategoryTableT>(
    "http://localhost:84/expenditures/public/category.php?request=get_category_table"
  );
  const [cateogries, setCategories] = useState<categoriesElementsT[]>([]);

  const ion = <ProgressBar value={1} max={2} key={56} />;
  useEffect(() => {
    if (data) {
      const totalPrice = data?.categories[0]["Total price"];
      const newArray: categoriesElementsT[] = data?.categories.map(
        (category, index) => {
          return {
            ...category,
            ["Total price"]: (
              <ProgressBar
                value={category["Total price"] as number}
                max={totalPrice as number}
                additionalLabel="lei"
                key={index}
              />
            ),
          };
        }
      );
      newArray.push({
        id: 500,
        "Category name": "test",
        "Number of items": 34,
        "Total price": (
          <ProgressBar
            value={40000000}
            max={50000000}
            additionalLabel="lei"
            key={45}
          />
        ),
      });
      setCategories(newArray);
    }

    console.log(data);
  }, [data]);
  //   const [progress, setProgress] = useState<ProgressBarI[]>([]);
  //   useEffect(() => {
  //     const newDivs: ProgressBarI[] = [];
  //     for (let i = 98; i <= 105; i++) {
  //       newDivs.push({ value: i, max: 105 });
  //     }
  //     setProgress(newDivs);
  //   }, []);

  //   const createProgressBars = () => {
  //     return progress.map((item) => (
  //       <ProgressBar
  //         value={item.value}
  //         max={item.max}
  //         key={item.value as number}
  //       />
  //     ));
  //   };
  return (
    <Card>
      {/* {createProgressBars()} */}
      {/* {ion} */}
      {
        cateogries && (
          <Table<categoriesElementsT>
            tableTitle="Categories"
            tableFields={cateogries}
            buttonPading="10px"
            handleEdit={() => {}}
            handleDelete={() => {}}
            customColumnWidth={{ columnName: "Total price", width: 40 }}
          />
        )
        // cateogries.map((category) => category["Total price"])
        // <ProgressBar
        //   value={40000000}
        //   max={50000000}
        //   additionalLabel="lei"
        //   // key={index}
        // />
      }
    </Card>
  );
};

export default CategoryCard;
