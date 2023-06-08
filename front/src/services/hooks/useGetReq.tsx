import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useAuth, useUserData } from "../../context/Provider";
import api from "./api";

export const useGetReq = <T,>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const { setUserData } = useUserData();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(url);
      console.log("USEGETREQ:", response.data);
      setData(() => response.data);
      setError(null);
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        setError("Server does not answer");
        return;
      }
      const axiosError = err as AxiosError<{
        status?: boolean;
        error: string;
      }>;
      if (axiosError.response) {
        // console.log("axiosError:", axiosError);
        if (!axiosError.response.data?.status) {
          setAuth(false);
          setUserData(null);
        }

        console.log(axiosError.response);
        setError(axiosError.response.data?.error);
      } else {
        setError("Network Error");
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
