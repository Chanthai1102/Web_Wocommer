import {BrowserRouter, Routes, Route} from "react-router-dom";


import LayoutDashboardMain from "./component/layout/LayoutDashboardMain"
import {CategoryPage} from "./PageDashboard/CategoryPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<LayoutDashboardMain/>}>
              <Route path="category" element={<CategoryPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
