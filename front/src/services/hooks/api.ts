import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:84/expenditures/public",
  withCredentials: true,
});
