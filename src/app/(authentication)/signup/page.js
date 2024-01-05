import LoginForm from '@/components/LoginComponent'
import SignUpForm from '@/components/SignupComponent'
import React from 'react'

function Login() {
  return (
    <div className="flex w-full h-screen" >
        {/* two division */}
        {/* one left image and formik */}
        <div className="w-2/6 h-full" >
            <img className="w-full h-full object-cover " src = "https://cdn.dribbble.com/userupload/10915867/file/original-bfd234de8906d339c1cb1fb7573842fa.jpg?resize=2048x1365" alt = "Auth preview Image" ></img>
        </div>

        <div className = "w-4/6 justify-center "  >
            {/* formik */}
            {/* Signup form */}
            <SignUpForm></SignUpForm>

        </div>
    </div>
  )
}

export default Login