import React from 'react'
import { Clock } from 'lucide-react';
import { Handle, Position } from 'reactflow';
export default function WaitNode( {data}) {
  return (
    <div className='border border-white bg-white
    p-2 rounded-lg text-black'>
     
   <div className='flex align-middle justify-between gap-2'>
  <h1 className=' text-blue-500 border border-blue-600 p-2 rounded-md'> <Clock/></h1>
   <div className='flex flex-col gap-2'>
    <h1 className='text-sm'>{data.label}</h1>
    <h1 className='text-sm  text-blue-600 cursor-pointer'>{data.time}</h1>
   </div>
   </div>
   <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
    </div>
  )
}
