import React from 'react'
import RightSidebar from './RightSidebar'
import CodeDisplay from './CodeDisplay'

const RightComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:w-1/3">
        <RightSidebar />
      </div>
      <div className="w-full lg:w-2/3">
        <CodeDisplay />
      </div>
    </div>
  )
}

export default RightComponent