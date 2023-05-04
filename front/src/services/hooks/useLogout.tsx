import { useState } from "react";
import { useAuth } from "../../context/Provider";
import axios from "axios";

function useLogout() {
  const { setAuth } = useAuth();
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
          console.log(response.data.success);
          setError(null);
          setMessage(response.data.success);
          //   window.localStorage.removeItem("isAuth");
          setAuth(false);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setMessage(null);
        setError(error.response.data.error);
        setAuth(false);
        // window.localStorage.removeItem("isAuth");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { error, pending, message, logout };
}
export default useLogout;
