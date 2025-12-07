import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as PATH from "./config/Path";
import NotFoundPage from "./pages/NotFoundPage";
import { DashboardPage } from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.DASHBOARD} element={<DashboardPage />}></Route>
        <Route path={PATH.TRANSACTIONS} element={<TransactionsPage />}></Route>
        <Route path={"*"} element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
