import {BrowserRouter, Routes, Router, Route} from "react-router-dom";


import {LayoutDashboard} from "./component/layout/LayoutDashboard"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<LayoutDashboard/>}>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
