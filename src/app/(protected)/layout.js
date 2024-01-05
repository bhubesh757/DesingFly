'use client'
import { useAppContext } from "@/contexts/Provider";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
// import { LogOut } from "lucide-react";


export default function ProtectedLayout({ children }) {
  const {getPicPreview , getUserDetails , getLoggeInUser , logout} = useAppContext();
  const [imagePreview , setImagePreview] = useState("");
  const [loading,  setLoading] = useState(false);
  const [userDetails , setUserDetails] = useState({});
  const [ userId , setuserId] = useState("");

  const router = useRouter();

  useEffect( () => {
    getCurrUser();
  } , [])

  const getCurrUser = async () => {
    setLoading(true)
    const user = await getLoggeInUser();
    const userId = user?.$id;
    setuserId(userId)
    let userDetails = await getUserDetails(userId);
    console.log(user);
    console.log(userDetails);
    if (userDetails?.ProfilePic) {
        handleImagePreview(userDetails?.ProfilePic);
      }
      setUserDetails(userDetails);
    setLoading(false);
}

const handleImagePreview = async (fileId) => {
  const url = await getPicPreview(fileId);
  setImagePreview(url);
};

const handleLogout = async () => {
  await logout();
  router.push("/")

}
  return (
    <html lang="en">
      <body>

      <div className="w-full flex justify-between bg-[#1B1B1B] text-white p-10" >
            <div className="flex space-x-4 w-2/5" >
            <img
            src = "https://cdn.dribbble.com/userupload/6022601/file/original-39189f0e752fcf83e902237a748151df.png?resize=1504x1504&vertical=center"
            className="h-6 w-6"
            alt = "Designfly Logo"
            >
            </img>
            <Link  href="/dashboard">
            <span className="text- " >
              DesignFly
            </span>
            </Link>
            
            </div>
            <Link href = '/profile' >
            <DropdownMenu>
            <DropdownMenuTrigger>
            <div className='cursor-pointer w-10 h-10 rounded-full flex justify-center items-center bg-white text-gray-500'  >
            {!imagePreview && (
                <span>{userDetails && userDetails?.Name?.[0]}</span>
              )}
                {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              )}
        </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href = "/profile" >
                <DropdownMenuItem className = "cursor-pointer" >My Profile</DropdownMenuItem>
                </Link>
                
                <DropdownMenuItem className = "cursor-pointer" 
                onClick = {handleLogout}
                >Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </Link>
           
    </div>
        
        {children}
        
        </body>
    </html>
  )
}
