import React from 'react';
import { Save } from 'lucide-react';
import { SquareUserRound } from 'lucide-react';
import { Grip } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Clock } from 'lucide-react';
export default () => {
  const onDragStart = (event, nodeType,label) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <aside className='space-y-10 bg-black '>
      <div>
      <h1 className='font-bold text-2xl mb-3'>Save File</h1>
      <button className='bg-zinc-300 p-3 text-black font-bold text-sm rounded-lg flex gap-2 hover:bg-white'>Save Progress <Save/></button>
      </div>
      <h1 className='font-bold text-2xl'>Actions</h1>
      <div className="description font-bold">You can drag these nodes to the pane on the right.</div>
      <div className="flex justify-between cursor-grab    align-middle input border p-5 border-gray-400 rounded-lg gap-4 text-center " onDragStart={(event) => onDragStart(event, 'LeadNOde')} draggable>
       <div className='text-green-500 rounded-xl'><SquareUserRound/></div>
       <div className='text-green-500 rounded-xl'>Add New source </div>
       <div className='text-green-500 rounded-xl'><Grip/> </div>
      </div>
      <div className="flex justify-between cursor-grab    align-middle input border p-5 border-gray-400 rounded-lg gap-4 text-center  " onDragStart={(event) => onDragStart(event, 'EmailNode')} draggable>
       <div className='text-purple-500 rounded-xl'><Mail/></div>
       <div className='text-purple-500 rounded-xl'>Email  </div>
       <div className='text-purple-500 rounded-xl'><Grip/> </div>
      </div>
      <div className="flex justify-between cursor-grab    align-middle input border p-5 border-gray-400 rounded-lg gap-4 text-center  " onDragStart={(event) => onDragStart(event, 'WaitNode')} draggable>
       <div className='text-blue-500 rounded-xl'><Clock/></div>
       <div className='text-blue-500 rounded-xl'>Delay</div>
       <div className='text-blue-500 rounded-xl'><Grip/> </div>
      </div>
    </aside>
  );
};