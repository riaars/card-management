import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as PATH from "./routes/Path";
import NotFoundPage from "./pages/NotFoundPage";
import { DashboardPage } from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={PATH.DASHBOARD} element={<DashboardPage />}></Route>
        <Route path={PATH.TRANSACTIONS} element={<TransactionsPage />}></Route>
        <Route path={"*"} element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
