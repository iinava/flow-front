import { Link } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <div className=" flex justify-center gap-4 align-middle  text-white bg-black h-18 font-bold ">
     <a className="p-3 hover:text-green-400 rounded text-center"  href="/view"> View entries</a>
     <a className="p-3 hover:text-green-500   rounded text-center" href="/"> Add new</a>
    </div>
  );
}
