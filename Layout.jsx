import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";



export function Layout() {
  return (
    <div className="layout w-full  ">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="  ">
        <Outlet />
      </div>
    </div>
  );
}
