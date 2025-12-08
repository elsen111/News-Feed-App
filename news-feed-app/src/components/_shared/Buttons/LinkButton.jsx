import React from 'react'

const LinkButton = () => {
  return (
    <a
      href='/categories'
      className="h-9 w-[180px] sm:w-[200px] sm:h-11 bg-[#67a193] flex justify-center items-center uppercase text-[14px] sm:text-[16px] font-medium text-amber-50 cursor-pointer tracking-[0.5px] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:opacity-50"
    >
      see categories
    </a>
  )
}

export default LinkButton