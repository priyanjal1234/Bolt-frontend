import React from 'react'
import RightSidebar from './RightSidebar'
import CodeDisplay from './CodeDisplay'


const RightComponent = () => {
  return (
    <div className='ml-10 right flex gap-4'>
        <RightSidebar />
        <CodeDisplay />
    </div>
  )
}

export default RightComponent