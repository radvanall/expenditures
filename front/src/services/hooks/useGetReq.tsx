import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useAuth, useUserData } from "../../context/Provider";
import api from "./api";
import { useTranslation } from "react-i18next";

export const useGetReq = <T,>(url: string) => {
  const { t } = useTranslation(["serverResponse"]);
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const { setUserData } = useUserData();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(url);
      setData(() => response.data);
      setError(null);
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        setError(t("netWorkError"));
        return;
      }
      const axiosError = err as AxiosError<{
        status?: boolean;
        error: string;
      }>;
      if (axiosError.response) {
        if (!axiosError.response.data?.status) {
          setAuth(false);
          setUserData(null);
        }
        setError(t(axiosError.response.data?.error));
      } else {
        setError(t("netWorkError"));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error, fetchData };
};
export default useGetReq;
