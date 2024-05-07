import React from "react";
import { Mail } from "lucide-react";
import { Handle, Position } from "reactflow";
import useStore from "../zustand/usestore";
export default function EmailNode({ id, data }) {
 
  return (
   <>
    <Handle type="target" position={Position.Top} />

<div   
  className="border border-white bg-white
p-2 rounded-lg text-black"
>
  <div className="flex align-middle justify-between gap-2">
    <h1 className=" text-purple-600 border border-purple-600 p-2 rounded-md">
      {" "}
      <Mail />
    </h1>
    <div className="flex flex-col gap-2">
      <h1 className="text-sm">{data.label} </h1>
      <h1 className="text-sm  text-purple-600 cursor-pointer">
        {" "}
        <span className="text-black">Template : </span>
        {data.EmailTemplate}
      </h1>
    </div>
  </div>
</div>
  <Handle type="source" position={Position.Bottom} /></>
  );
}
