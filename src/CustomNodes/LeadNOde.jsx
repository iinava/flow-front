import React from "react";
import { UserRoundPlus } from "lucide-react";
import { Handle, Position } from "reactflow";
export default function LeadNOde({ data }) {
  return (
    <div
      className="border border-white bg-white
    p-2 rounded-lg text-black"
    >
     
      <div className="flex align-middle justify-between gap-2">
        <h1 className=" text-red-500 border border-red-600 p-2 rounded-md">
          {" "}
          <UserRoundPlus />
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">{data.label}</h1>
          <h1 className="text-sm  text-red-600 cursor-pointer">
            {data.source}
          </h1>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
    </div>
  );
}
