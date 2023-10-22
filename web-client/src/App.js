import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DashboardMain} from "./layout/DashboardMain";
import {CategoryPage} from "./Page-Dashboard/Category/CategoryPage"
import {DashboardLogin} from "./layout/DashboardLogin";
import {RegisterDashboard} from "./Page-Dashboard/LoginRegisterPage/RegisterDashboard";
import {LoginDashboard} from "./Page-Dashboard/LoginRegisterPage/LoginDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<DashboardMain/>}>
              <Route path="category" element={<CategoryPage/>}/>
          </Route>
          <Route path="/dashboard" element={<DashboardLogin/>} >
                <Route path="register" element={<RegisterDashboard/>} />
                <Route path="login" element={<LoginDashboard/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
