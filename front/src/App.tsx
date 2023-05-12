import React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/ProtectedRoutesWrapper/RequireAuth";
import "./App.css";
import Login from "./pages/Login/Login";
import About from "./pages/About";
import Missing from "./pages/Missing/Missing";
import Home from "./pages/Home/Home";
import NewInvoice from "./pages/NewInvoice/NewInvoice";
import RequireUnauth from "./pages/ProtectedRoutesWrapper/RequireUnauth";
function App() {
  console.log("app rerender");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireUnauth />}>
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="new_invoice" element={<NewInvoice />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
