import { useState } from "react";
import axios from "axios";

function usePost(url: string, request: string) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  function makePostRequest(data: object = {}) {
    setPending(true);
    const formData = new FormData();
    formData.append("request", request);
    formData.append("formData", JSON.stringify(data));
    axios
      .post(url, formData, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.success);
          setError(null);
          setMessage(response.data.success);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setMessage(null);
        setError(error.response.data.error);
      })
      .finally(() => {
        setPending(false);
      });
  }
  return { error, pending, message, makePostRequest };
}
export default usePost;
