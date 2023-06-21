import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/ProtectedRoutesWrapper/RequireAuth";
import "./App.css";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Missing from "./pages/Missing/Missing";
import Home from "./pages/Home/Home";
import NewInvoice from "./pages/NewInvoice/NewInvoice";
import RequireUnauth from "./pages/ProtectedRoutesWrapper/RequireUnauth";
import Invoices from "./pages/Invoices/Invoices";
import Invoice from "./pages/Invoice/Invoice";
import { useTheme } from "./context/Provider";

function App() {
  const { theme } = useTheme();
  return (
    <Suspense fallback={null}>
      <div className={theme ? "App" : "App dark"}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireUnauth />}>
              <Route index element={<Missing address="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Missing address="login" />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route index element={<Missing address="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="new_invoice" element={<NewInvoice />} />
              <Route path="invoices">
                <Route index element={<Invoices />} />
                <Route path=":id" element={<Invoice />} />
              </Route>
              <Route path="*" element={<Missing address="home" />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
