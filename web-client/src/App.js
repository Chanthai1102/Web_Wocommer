import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DashboardMain} from "./layout/DashboardMain";
import {CategoryPage} from "./Page-Dashboard/Category/CategoryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<DashboardMain/>}>
              <Route path="category" element={<CategoryPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
