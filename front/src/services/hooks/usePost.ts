import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function usePost(url: string, request: string, isFile?: boolean) {
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
            setError(null);
            setMessage(t(response.data.success));
            console.log(response);
            resolve(true);
          }
        })
        .catch((error) => {
          setMessage(null);
          setError(t(error.response.data.error));
          console.log(error);
          reject(false);
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
