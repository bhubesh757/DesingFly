import LoginForm from '@/components/LoginComponent'
import React from 'react'

function Login() {
  return (
    <div className="flex w-full h-screen" >
        {/* two division */}
        {/* one left image and formik */}
        <div className="w-2/6 h-full" >
            <img className="w-full h-full object-cover " src = "https://cdn.dribbble.com/userupload/10721735/file/original-3e6813bbb237f0c45c15508e32e8ccdd.png?resize=1504x1128" alt = "Auth preview Image" ></img>
        </div>

        <div className = "w-4/6 justify-center "  >
            {/* formik */}
            <LoginForm ></LoginForm>

        </div>
    </div>
  )
}

export default Login