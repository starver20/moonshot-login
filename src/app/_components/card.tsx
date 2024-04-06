import React from 'react'

const Card = ({children, width}:{children:React.ReactNode, width?:string
}) => {
  return (
    <div className={`py-12 px-6 border rounded-2xl border-slate-250 w-[450px]`}>{children}</div>
  )
}

export default Card