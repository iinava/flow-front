import React from "react";
import { CircleStop } from 'lucide-react';
import { Handle, Position } from "reactflow";
export default function EndNode({ data }) {
  return (
    <div
      className="border border-white bg-white
    p-2 rounded-lg text-black"
    >
      <div className="flex align-middle justify-between gap-2">
        <h1 className=" text-black border border-black p-2 rounded-md">
          <CircleStop />
        </h1>
        <div className="flex flex-col gap-2 justify-center align-middle">
          <h1 className="text-sm">{data.label}</h1>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
