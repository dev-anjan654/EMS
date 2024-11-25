import React from 'react'
import { Card, CardContent } from '../ui/card'

const Widget = ({icon, title, count, money}) => {
  return (
    <Card className='w-full h-20'>
        <CardContent className='p-0 h-full overflow-hidden'>
            <div className='flex w-full h-full'>
                {/* Icon Container */}
                <div className="flex items-center justify-center bg-slate-700 h-full w-1/4 rounded-l-xl">
                    <img 
                        src={icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                    />
                </div>
                {/* Content Container */}
                <div className="flex flex-col gap-2 w-3/4 p-2">
                    <p className='text-base  font-semibold text-gray-500'>{title}</p>
                    <p className='text-base  font-semibold'>{count ? count : money}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default Widget
