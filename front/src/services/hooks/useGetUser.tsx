import axios from "axios";
import { useUserData } from "../../context/Provider";
export const useGetUser = () => {
  const { setUserData } = useUserData();
  async function getRequest() {
    axios
      .get(
        "http://localhost:84/expenditures/back/public/userController.php?request=getLoggedUser",
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { getRequest };
};
export default useGetUser;
