import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Pencil } from 'lucide-react'
import { useAppContext } from '@/contexts/Provider';
  
function ProfileDialog({profilemodalState , 
    setProfileModalState,
    userDetails , 
    userId , 
    getCurrUser}) {

    const [imagePreview , setImagePreview] = useState("");
    const [loading ,setloading] = useState(false);
    const [name , setName]  = useState(userDetails?.Name);
    const [email , setEmail] = useState(userDetails?.Email);
    const[bio , setBio] = useState(userDetails?.Bio);

    const {storePic , updateUser , getPicPreview} =  useAppContext();


    useEffect(() => {
        if (profilemodalState) {
          setName(userDetails?.Name);
          setEmail(userDetails?.Email);
          setBio(userDetails?.Bio);
          if (userDetails?.ProfilePic) {
            handleImagePreview(userDetails?.ProfilePic);
          }
        } else {
          setName("");
          setEmail("");
          setBio("");
        }
      }, [profilemodalState]);
    

      const handleImagePreview = async (fileId) => {
        const url = await getPicPreview(fileId);
        setImagePreview(url);
      };

    //handle previews
    //image preview

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        console.log(file);

        if(file) {
            const fileReader = new FileReader();
             fileReader.onloadend = () => {
            console.log('loadEnd event fired');
            setImagePreview(fileReader.result)
        }

        fileReader.readAsDataURL(file);
        }
        else {
            setImagePreview('');
        }
    }

    // save profile imahe

    const handleSaveProfile = async () => {
        if(!name) {
            alert('Name is mandatory');
            return;
        }
        setloading(true);
        let profilePicFile = document.getElementById("profilepicId").files[0];
        let profileId = userDetails?.ProfilePic ?? "";
        if(profilePicFile) {
            profileId = await storePic(profilePicFile)
        }
        await updateUser(userId ,
            name ,
            email,
            bio,
            profileId  )
        setloading(false);
        await getCurrUser();
        console.log("User updated");
        setProfileModalState(false);
    }

  return (
     <Dialog open = {profilemodalState} onOpenChange = {setProfileModalState} >
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
                Modify Below Fields to Update the Profile
                <div className="flex flex-col space-y-4 justify-center w-full mt-4">
                    <div className="hover:bg-gray-500 w-32 h-32 rounded-full bg-gray-400 mt-5 mx-auto flex justify-center items-center flex-col relative">
                    
                        <input
                        type = "file"
                        className=' opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer'
                        onChange={handleProfilePicChange}
                        id = "profilepicId"
                        />
                        
                         {/* pencil */}
                         {/* To edit the profile */}
                         <Pencil></Pencil>
                         {imagePreview && (
                            <img 
                            src = {imagePreview} 
                            className = "w-full h-full object-cover object-center rounded-full"
                             ></img>
                         )}
                            
                    </div>

                    {/* for input fields for the text  */}
                    {/* name */}
                    <div className="flex flex-col space-y-3 grow mt-5" >
                        <div className='flex flex-col space-y-2' >
                            <label> Name </label>
                            <input
                            type= "text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border p-2 rounded'
                            />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col space-y-2" >
                            <label> Email </label>
                            <input
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            className="border p-2 rounded"
                            type="text"
                            />
                        </div>

                        {/* Bio */}
                        <div className='flex flex-col space-y-2' >
                            <label>
                                Bio
                            </label>
                            <textarea
                            value={bio}
                            onChange = {(e) => setBio(e.target.value)}
                            className="border p-2 rounded"
                            />
                            
                        </div>
                    </div>

                    <button
                     className="bg-gray-900 p-2 text-white"
                     onClick={handleSaveProfile}
                    >
                        {loading ? "Saving" : "Save" }
                        
                    </button>

                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
       

  )
}

export default ProfileDialog