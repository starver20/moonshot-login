/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'

// @ts-ignore
const ButtonPrimary = ({label, type, onClick}) => {

  return (
    <>
    <button type={type} onClick={onClick}  className="w-full rounded-md bg-black py-5 my-6 font-semibold transition hover:bg-white/20 text-white" >{label}</button>
    </>
  )
}

export default ButtonPrimary