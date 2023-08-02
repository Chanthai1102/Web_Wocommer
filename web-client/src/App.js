import {BrowserRouter, Routes, Route} from "react-router-dom";

import LayoutDashboard from "./component/layout/LayoutDashboard"

function App() {
  return (
      <BrowserRouter>
          <Routes>
            {/*Website-client*/}
              <Route>
                  <Route />
              </Route>
              {/*Back-End*/}
            <Route path="/dashboard" element={<LayoutDashboard/>}>
              <Route />
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
