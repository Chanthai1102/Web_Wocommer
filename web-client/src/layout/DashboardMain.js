import {Sidebar} from "./Sidebar";
import {Outlet} from "react-router-dom";


export function DashboardMain(){

    return(
      <div className="flex">
         <Sidebar/>
         <div className="p-7 w-full h-screen">
             <Outlet/>
         </div>
      </div>
    );
}