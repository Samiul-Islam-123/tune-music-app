import React from 'react'

function Sidebar() {
  return (
    <div className=' w-1/6 flex justify-center h-[93vh] border-r pt-36'>
        <div className=' flex items-center flex-col w-full h-auto '>
            {["Home","Library","Profile"].map((opt)=>(
                <div className='w-[95%] h-[7vh] border rounded-md m-2 flex items-center justify-center'>
                    <h1 className=' text-xl'>{opt}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar