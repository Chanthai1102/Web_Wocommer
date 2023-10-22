import {useState} from "react";
import React from "react";
import {
    BsArrowLeftShort,
    BsChevronDown,
    BsPerson,
    BsReverseLayoutTextSidebarReverse
} from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import {GiShop} from "react-icons/gi";
import {MdDashboard} from "react-icons/md";
import {
    AiOutlineBarChart,
    AiOutlineFileText, AiOutlineSetting,
} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export function Sidebar(){
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const navigate = useNavigate()
    const Menus = [
        { title: "Dashboard",route: "/dashboard"},
        { title: "Pages", icon: <AiOutlineFileText/>,route: "/dashboard/page"},
        { title: "Category", spacing: true, icon: <BiCategoryAlt/>, route: "/dashboard/category"},
        {
            title: "Projects",
            icon: <BsReverseLayoutTextSidebarReverse/>,
            route: "/dashboard/project",
            submenu: true,
            submenuItems: [
                {title: "Submenu 1",route: "/dashboard/project",},
                {title: "submenu 2",route: "/dashboard/project",},
                {title: "submenu 3",route: "/dashboard/project",}
            ]
        },
        {title: "Analytics", icon: <AiOutlineBarChart/>,route: "/dashboard/project",},
        {title: "Profile",spacing:true, icon: <BsPerson/>,route: "/dashboard/project",},
        {title: "Setting", icon: <AiOutlineSetting/>,route: "/dashboard/project",}
    ];
    const onChangeMenu = (item) => {
        navigate(item)
    }
    return(
        <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
            <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"} `} onClick={() => setOpen(!open) }/>
            <div className="inline-flex">
                <GiShop className={`bg-white text-4xl rounded cursor-pointer block float-left mr-2 ${open && "rotate-[360deg]"}`} />
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Shopping</h1>
            </div>
            <ul className="pt-2">
                {Menus.map((menu,index) => {
                    return(
                        <React.Fragment key={index} >
                            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`} onClick={() => onChangeMenu(menu.route)}>
                             <span className="text-2xl block float-left">
                                 { menu.icon ? menu.icon : <MdDashboard/>}
                             </span>
                                <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
                                 {menu.title}
                             </span>
                                {menu.submenu && open &&  (
                                    <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() =>
                                        setSubmenuOpen(!submenuOpen)}/>
                                )}
                            </li>

                            {menu.submenu && submenuOpen && open &&(
                                <ul key={`submenu-${index}`}>
                                    {menu.submenuItems.map((submenuItem, index) => {
                                        return(
                                            <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5  hover:bg-light-white rounded-md">
                                                {submenuItem.title}
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    )
}