"use client";

import { GlobalContext } from "../context";
// import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaCog, FaBell, FaUser } from 'react-icons/fa';

export default function Header() {
    // const { sideBarOpen, setSideBarOpen } = useContext(GlobalContext);

    const router = useRouter();


    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow">
            <div className="flex flex-grow items-center  gap-2 justify-between py-4 px-4 shadow md:px-6 2xl:px-11">

                <p><span >Welcome,</span> Admin</p>

                <div className="flex gap-2">
                    <div style={{border:"1px solid #FF730F"}} className="w-12 bg-[#EEF2FB] h-12 bg-blue-500 rounded-full flex items-center justify-center ">
                        <div className="text-[#FF730F] text-xl  "><FaCog /></div>
                    </div>
                    <div style={{border:"1px solid #FF730F"}} className="w-12 bg-[#EEF2FB] h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="text-[#FF730F] text-xl " ><FaBell /></div>
                    </div>
                    <div style={{border:"1px solid #FF730F"}} className="w-12 bg-[#EEF2FB] h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="text-black text-xl " ><FaUser /></div>
                    </div>
                </div>
                {/* <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase">
           Logo
          </button>
        </div>
        <button

          className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase"
        >
       Submit
        </button> */}
            </div>
        </header>
    );
}