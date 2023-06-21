import { useState } from "react";
import { useAuth } from "../../context/Provider";
import { useUserData } from "../../context/Provider";
import axios from "axios";
import { useTranslation } from "react-i18next";

function useAuthorization() {
  const { setAuth } = useAuth();
  const { t } = useTranslation(["serverResponse"]);
  const { setUserData } = useUserData();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const logout = () => {
    setPending(true);
    const formData = new FormData();
    formData.append("request", "logout");
    axios
      .post(
        "http://localhost:84/expenditures/public/userController.php",
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setError(null);
          setMessage(t(response.data.success));
          setAuth(false);
          setUserData(null);
        }
      })
      .catch((error) => {
        setMessage(null);
        setError(t(error.response.data.error));
        setAuth(false);
        setUserData(null);
      })
      .finally(() => {
        setPending(false);
      });
  };
  const login = (data: object = {}) => {
    setPending(true);
    const formData = new FormData();
    formData.append("formData", JSON.stringify(data));
    formData.append("request", "login");
    axios
      .post(
        "http://localhost:84/expenditures/public/userController.php",
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setError(null);
          setMessage(t(response.statusText));
          setUserData(response.data);
          setAuth(true);
        }
      })
      .catch((error) => {
        setMessage(null);
        setError(t(error.response.data.error));
        setAuth(false);
        setUserData(null);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { error, pending, message, logout, login };
}
export default useAuthorization;
