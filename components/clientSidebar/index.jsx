'use client'

import { LuLayoutDashboard, LuContact } from "react-icons/lu";
import { TbBrandProducthunt,TbLogout } from "react-icons/tb";
import { PiUsersFourLight } from "react-icons/pi";
import { RiInboxArchiveFill } from "react-icons/ri";
import { LiaFileInvoiceSolid } from "react-icons/lia";
// import { useContext } from "react";
// import { GlobalContext } from "@components/context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { GlobalContext } from "../context";



const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/client",
    icon: <LuLayoutDashboard size={25} />,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/client/clientProject",
    icon: <TbBrandProducthunt size={25} />,
  },
  // {
  //   id: "clients",
  //   label: "Clients",
  //   path: "/client/clients",
  //   icon: <PiUsersFourLight size={25} />,
  // },
  {
    id: "inbox",
    label: "Inbox",
    path: "/",
    icon: <RiInboxArchiveFill size={25} />,
  },
  {
    id: "invoices",
    label: "Invoices",
    path: "/client/clientInvoice",
    icon: <LiaFileInvoiceSolid size={25} />,
  },
  // {
  //   id: "contactList",
  //   label: "Contact List",
  //   path: "/",
  //   icon: <LuContact size={25} />,
  // },
  // {
  //   id: "task",
  //   label: "Task",
  //   path: "/admin/task",
  //   icon: <LiaFileInvoiceSolid size={25} />,
  // },
];

export default function ClientSidebar() {
    // const { sideBarOpen, setSideBarOpen } = useContext(GlobalContext);
    // const {status} = useSession()
  
    const pathName = usePathname();
    if(pathName){
        console.log(pathName,"path")
    }
    const router = useRouter();
  
    const handlenavigate = (getMenuItem) => {
      console.log(getMenuItem,"menu")
    //   if(status === 'unauthenticated') {
    //     router.push('/unauth-page')
    //     return
    //   }
      router.push(getMenuItem.path);
    };

  return (
    <>
  <aside
      style={{borderRight:"1px solid gray"}}
    //   className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0
    // ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
    // `}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0
    `}
    >
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href={"/"} className="text-[40px] text-black">
          Ioninks
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <label
                    onClick={() => handlenavigate(menuItem)}
                    className={`group relative cursor-pointer flex items-center gap-2.5 rounded-sm py-4 px-4 font-medium text-black duration-300 ease-in-out hover:bg-[#FF730F] hover:rounded-r-[30px] 
                             ${pathName.includes(menuItem.id) && "bg-[#FF730F] rounded-r-[30px]"}
                            `}
                  >
                    {menuItem.icon}
                    {menuItem.label}
                  </label>
                </li>
              ))}
            </ul>
    
          </div>
          <div className="mt-11">
            <ul>
                <li className="flex justify-center items-center">
                    <label className="cursor-pointer flex items-center gap-2.5 rounded-sm py-4 px-4 font-medium text-black duration-300 ease-in-out hover:bg-[#FF730F]" >
                      <TbLogout/>  Logout
                    </label>
                    
                </li>
            </ul>

            </div>
        </nav>
      </div>
    </aside>

</>  )
}