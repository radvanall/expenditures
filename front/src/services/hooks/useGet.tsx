import React, { useState } from "react";
import axios from "axios";
export const useGet = (url: string) => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios.get(url, { withCredentials: true }).then((response) => {
      setData(response.data);
    });
  };
  return { getData, data };
};
export default useGet;
