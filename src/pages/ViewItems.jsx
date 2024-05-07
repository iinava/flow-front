import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/getallsequences').then((res)=>{
          console.log(res.data.sequences);
          setItems(res.data.sequences);
          setIsLoading(false); // Set loading state to false after data is fetched
        }).catch((error)=>{
          console.log(error);
          // setIsLoading(false)
        })
        
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleclick = (id) => {
    navigate(`/viewsequence/${id}`);
  };

  return (
    <>
      <h1 className='text-clip text-white bg-black text-center text-3xl font-bold '>View entries</h1>
      <div className='w-full h-screen flex flex-wrap gap-8 bg-black text-white'>
        {isLoading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className='w-[400px] h-[200px] rounded-md bg-zinc-800 text-white font-bold flex p-5 gap-10 flex-col'>
              <h1>{item.name}</h1>
              <h1>{item._id}</h1>
              <button className='p-3 bg-zinc-300 rounded-md hover:bg-white text-black' onClick={() => {
                handleclick(item._id);
              }}>View</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
