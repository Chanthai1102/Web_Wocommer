import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
// Page
import Homepage from "./Page/Homepage/Homepage"

// Component
import Headerlayout from "./component/header/headerlayout"

function App() {
  return (
    <BrowserRouter>
        <Headerlayout/>
      <Routes>
        <Route path="/" element={ <Homepage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
