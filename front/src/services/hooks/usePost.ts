import { useAuth } from "./../../context/Provider";
import { useState } from "react";
import axios from "axios";

function usePost(url: string, request: string) {
  const { setAuth } = useAuth();
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
          console.log(response);
          setError(null);
          setMessage(response.data.success);
          // setMessage(response.data);
          //   window.localStorage.setItem("isAuth", "true");
          //setAuth(true);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setMessage(null);
        setError(error.response.data.error);
        //setAuth(false);
        // window.localStorage.removeItem("isAuth");
      })
      .finally(() => {
        setPending(false);
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
