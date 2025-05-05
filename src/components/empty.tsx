import React from 'react'
import { GrInbox } from 'react-icons/gr'

const Empty = ({ description }: { description: string }) => {
    return (
        <div className='flex justify-center items-center h-[500px] w-full'>
            <div className='flex justify-center items-center flex-col'>
                <GrInbox className='text-[50px] text-gray-100 ' />
                <h2 className=' text-xl  text-gray-200'>{description}</h2>
            </div>

        </div>
    )
}

export default Empty