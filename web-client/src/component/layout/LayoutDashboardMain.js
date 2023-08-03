import React from "react";
import {LayoutDashboard} from "./LayoutDashboard";
import {Outlet} from "react-router-dom";


function LayoutDashboardMain(){
    return(
        <div className="w-full h-full flex">
           <div className="w-full max-w-[20rem]">
               <LayoutDashboard/>
           </div>
            <div className="w-full relative ">
                <Outlet/>
            </div>
        </div>
    )
}

export default LayoutDashboardMain;