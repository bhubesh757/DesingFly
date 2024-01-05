import Link from 'next/link'
import React from 'react'

function NavigationBar() {
  return (
    <div className="flex justify-between w-full" >

        <div className="flex space-x-4 w-2/5 " >
            {/* Logo */}
            <img className="w-6 h-5"  src = "https://cdn.dribbble.com/userupload/6022597/file/original-fc57867d58966a972c13d404a6ba7d84.png?resize=1504x1504" alt = "Designfly logo" ></img>
            <span>DesignFly</span>
        </div>

        <div className="flex space-x-10 " >
            {/* Buttons */}
            <Link href = "/signup" >
            <button className="cursor-pointer" href = "/signup"  >Sign up</button>
            </Link>
            <Link href = "/login" >
            <button className="bg-[#444444] px-8 py-2 rounded-full cursor-pointer " href = "/login" > Log in</button>
            </Link>
            
           
        </div>

    </div>
  )
}

export default NavigationBar