import { useAuth } from "./../../context/Provider";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { blob } from "stream/consumers";

function usePost(url: string, request: string, isFile?: boolean) {
  const { setAuth } = useAuth();
  const { t } = useTranslation(["serverResponse"]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  async function makePostRequest(data: object = {}) {
    return new Promise((resolve, reject) => {
      setPending(true);
      const formData = new FormData();
      formData.append("request", request);
      formData.append(
        "formData",
        isFile ? (data as Blob) : JSON.stringify(data)
      );

      axios
        .post(url, formData, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setError(null);
            // setMessage(response.data.success);
            setMessage(t(response.data.success));
            // setMessage(response.data);
            //   window.localStorage.setItem("isAuth", "true");
            //setAuth(true);
            resolve(true);
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          console.log(error.response);
          setMessage(null);
          setError(t(error.response.data.error));
          reject(false);
          // setError(error.response.data.error);
          //setAuth(false);
          // window.localStorage.removeItem("isAuth");
        })
        .finally(() => {
          setPending(false);
        });
    });
  }
  function resetPost() {
    setError(null);
    setPending(false);
    setMessage(null);
  }
  return { error, pending, message, makePostRequest, resetPost };
}
export default usePost;
