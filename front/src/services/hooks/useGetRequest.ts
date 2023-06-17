import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import renameObjectKeys from "../functions/renameObjectKeys";
import api from "./api";
import { useTranslation } from "react-i18next";

export const useGetRequest = <T>(url: string, typeObject?: object) => {
  const { t } = useTranslation(["serverResponse"]);
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(url);
      if (typeObject) {
        const itemArray: T[] = renameObjectKeys(response.data, typeObject);
        setData(itemArray);
        return;
      }
      setData(response.data);
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        // setError("Server does not answer");
        setError(t("netWorkError"));
        console.log(err);
        return;
      }
      const axiosError = err as AxiosError<{ error: string }>;
      if (!axiosError.response) {
        // setError("Network Error");
        setError(t("netWorkError"));
        console.log("Networkt answer");
        return;
      }

      console.log("axiosError:", axiosError);
      // setError(axiosError.response.data?.error);
      setError(t(axiosError.response.data?.error));
      console.log(t(axiosError.response.data?.error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error, fetchData };
};
export default useGetRequest;
