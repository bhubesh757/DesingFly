'use client'
import { useAppContext } from '@/contexts/Provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddDesign() {

    const [imagePreview , setImagePreview] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [loading , setLoading] = useState(false);
    const [ userId , setuserId] = useState("");

    const {createDesign , storePic , getLoggeInUser } = useAppContext();

    const router = useRouter();

    //why these stats , need to be captured and sent to the database to store and retrieve the data from the database

    // add the onclick events
    //Reading the image and displaying the images in the portal
    const handleFileChange = (e) => {
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

    //cancel preview
    // publish the pic
    const publish = async () => {
      

      //validation
      if(!title && !description && !imagePreview) {
        alert("All Fields are mandatory For Publishing the Design")
        return; 
      }
      setLoading(true);
      // Store the design pic and gets its id
      //giving id and storeing in the file const
      const file = document.getElementById('designPic').files[0];
      const id = await storePic(file);
        // it creates a id for the file and stores in the id
      
      // store the design document in the appwrite colection
      let user = await getLoggeInUser();
      let userId = user.$id;
      await createDesign(id, title , description , userId);

      setLoading(false);
      router.push('/dashboard')
    }

    // 


  return (
    <div className='bg-[#1B1B1B] flex flex-col min-h-screen text-white px-10 space-y-10 ' >
        <div className=' flex justify-between w-full '>  
        <Link href = '/dashboard'>
        <button className= "bg-[#4F4F4F] rounded-full px-8 py-2" >Cancel</button>
        </Link>
        
        <button className='bg-[#4F4F4F] rounded-full px-8 py-2'
        style={{
            background:
              "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
          }}
          onClick = {publish}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
        </div>

        <div className= ' w-full flex flex-col  ' >
            {/* image */}
            {/* border */}

            {/* need a condition check if the image id displayed it should be invisible */}
               
                     
            <div className=" relative w-full border border-dashed border-gray-300 h-96 rounded-lg flex flex-col justify-center items-center ">
            {imagePreview && <img src= {imagePreview} className = 'w-full h-full object-cover'  ></img> }
            {
                !imagePreview && (
                    <>
                    <img 
                className=' h-32 w-32'
                src = "https://i.ibb.co/f02sMXd/Image-Logo.png" >
                </img>
                <span className="mt-6 text-sm text-gray-300">
                Upload photo of your design here
              </span>
                    </>
                )
            } 
              <input
              type = "file"
              className='opacity-0 w-full h-full absolute'
              onChange={handleFileChange}
              id = "designPic"
              >
              </input>

              
            </div>

            {imagePreview && 
            <span
            className="text-right cursor-pointer rounded-full px-8 py-2 "
            onClick={() => setImagePreview("")}
            > Clear Image</span>
            }

            {/* Title */}

            <div className="flex flex-col space-y-4">
          <label>Title</label>
          <input
            type="text"
            className="border border-gray-500 rounded p-2 bg-transparent"
            placeholder="Enter title for your design"
           value={title}
           onChange = {(e) => setTitle(e.target.value)} 
            
          />
        </div>

        {/* descriptiomn */}

        <div className="flex flex-col space-y-4">
          <label>Description</label>
          <textarea
            className="border border-gray-500 rounded p-2 bg-transparent"
            placeholder="Enter description for your design"
            rows={10}
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
          />
        </div>




        </div>
    </div>
  )
}

export default AddDesign