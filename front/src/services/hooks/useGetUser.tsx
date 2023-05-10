import React from "react";
import axios from "axios";
import { useAuth } from "../../context/Provider";
import { useUserData } from "../../context/Provider";
export const useGetUser = () => {
  const { setUserData } = useUserData();
  function getRequest() {
    axios
      .get(
        "http://localhost:84/expenditures/public/userController.php?request=getLoggedUser",
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { getRequest };
};
export default useGetUser;
