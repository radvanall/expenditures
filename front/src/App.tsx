import React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
// interface formData{
//   data:string;
// }

import "./App.css";
import Login from "./pages/Login/Login";
import About from "./pages/About";
function App() {
  // const login: React.FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const formData = new FormData();
  //   const formObject: Record<string, string> = {};
  //   for (const [key, value] of Object.entries(Object.fromEntries(data))) {
  //     formObject[key] = value as string;
  //   }

  //   formData.append("request", "login");
  //   formData.append("formData", JSON.stringify(formObject));
  //   fetch("http://localhost:84/expenditures/public/userController.php", {
  //     method: "POST",
  //     headers: {
  //     },
  //     body: formData,
  //   })
  //     .then((res) => res.text())
  //     .then((res) => console.log(res));
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>

      {/* <form onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
}

export default App;
