import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DashboardMain} from "./layout/DashboardMain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<DashboardMain/>}>

          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
