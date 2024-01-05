'use client'
import ProfileDialog from '@/components/ProfileDialog';
import { useAppContext } from '@/contexts/Provider'
import React, { useEffect, useState } from 'react'

function UserPage() {

    const {getLoggeInUser , 
        getUserDetails ,
        getPicPreview
    } = useAppContext();
    const [imagePreview , setImagePreview] = useState("");
    const [userDetails , setUserDetails] = useState({});
    const [loading , setLoading] = useState(false);
    //for edit profile
    const [profilemodalState,setProfileModalState] = useState(false);
    const [ userId , setuserId] = useState("");

    const getCurrUser = async () => {
        setLoading(true)
        const user = await getLoggeInUser();

        const userId = user?.$id;
        if(userId) {
          setuserId(userId)
        const userDetails = await getUserDetails(userId);
        console.log(user);
        console.log(userDetails);
        if (userDetails?.ProfilePic) {
            handleImagePreview(userDetails?.ProfilePic);
          }
        setUserDetails({...userDetails})
        }
        //lets get the information from the appwrite
        //after everything is done
        setLoading(false);
    }

    const handleImagePreview = async (fileId) => {
        const url = await getPicPreview(fileId);
        setImagePreview(url);
      };

    useEffect (() => {
        getCurrUser();
    },[])
    //why empty to stop the re information 

  return (
    <div className='bg-[#1B1B1B] flex flex-col min-h-screen text-white px-10 space-y-10 '>
        {
            loading ? ( <div>
                <span> Loading...</span> {" "}
                </div> 
            ) : (
                <>
                <div className='flex space-x-6 mx-auto my-20 items-center ' >
            <div className=' w-32 h-32 rounded-full bg-white flex flex-col justify-center items-center text-gray-800  ' >
                {/* profile pic */}
                {!imagePreview && (
                <span>{userDetails && userDetails?.Name?.[0]}</span>
              )}
                {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              )}
                
                {/* update the profile */}

            </div>
            <div className='flex flex-col space-y-5' >
                <h2>{userDetails?.Name}</h2>
                <span className='text-gray-400'>{userDetails?.Email}</span>
                <p className=' text-gray-400 ' >{userDetails?.Bio}</p>
                <span 
                onClick={() => setProfileModalState(true)}
                className='text-sm text-cyan-500 cursor-pointer ' > Edit Profile </span>
            </div>
        </div>

        <div className='flex flex-col space-y-3 mx-32 ' >
            <h2 className='text-md font-semibold'>work</h2>
            <div className='flex' >
                <span className='text-sm' >
                    Do Designs uploaded
                </span>
            </div>
        </div>
        </>

        )}
        {/* pass them */}
        <ProfileDialog
        profilemodalState = {profilemodalState}
        setProfileModalState = {setProfileModalState}
        userDetails = {userDetails}
        userId = {userId}
        getCurrUser = {getCurrUser}
        >
        </ProfileDialog>
        
    </div>
  );
}

export default UserPage