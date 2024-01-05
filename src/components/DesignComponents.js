import { useAppContext } from '@/contexts/Provider'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function DesignComponents({finalRecords , userRecords }) {

  const {getPicPreview } = useAppContext();

  return ( 
    <div className=' flex flex-col justify-center items-center grow'>
      {finalRecords.length == 0 ? <span>
        No design yet
      </span> : 

      <div className='w-full grid grid-cols-3 gap-10'>
        {
          finalRecords.map((item) => 
          (
            <Link href={"/design/" + item?.$id} >
          <div className='flex flex-col space-y-3 w-full h-auto rounded ' >
            {/* image */}
            <DesignImageComponent
            imageId = {item["DesignPic"]}
            >
            </DesignImageComponent>
            <div className='flex justify-between' >
              <div className="flex space-x-2 items-center" >
                {/* Profile pic of the user */}
                <UserImageComponent
                  imageId={userRecords[item?.UserId]?.["ProfilePic"]}
                  userName={userRecords[item?.UserId]?.["Name"]}
                >
                </UserImageComponent>
                {/* user name  */}
                <span>
                  {userRecords[item?.UserId]?.["Name"]}
                </span>
              </div>
              <div className='flex space-x-1' >
                <HeartIcon
                className='w-4'
                ></HeartIcon>
                <span>0</span>
              </div>
            </div>
          </div>
          </Link>
          )
          )
        }
      </div>  
    }
      </div>
  )
}


const DesignImageComponent = ({imageId} ) => {

  const [pic , setPic] = useState("");
  const {getPicPreview} = useAppContext();

  useEffect(() => {
    if(imageId) {
      findPicUrl();
    }
  } , [])

  const findPicUrl = async () => {
    const url = await getPicPreview(imageId);
    setPic(url);
  };

  return (
    <img
      src={pic}
      className="w-full h-[300px] rounded object-cover object-center"
    />
  );

}

const UserImageComponent = ({imageId , userName}) => {

  const [pic , setPic] = useState("");
  const {getPicPreview} = useAppContext();

  useEffect(() => {
    if(imageId) {
      findPicUrl();
    }
  } , [imageId])


  const findPicUrl = async () => {
    console.log(imageId);
    const url = await getPicPreview(imageId);
    setPic(url);
  };

  return pic ? (
    <img
    className="w-6 h-6 rounded-full "
    src = {pic}
    >
    </img> 
  ) : (
    <div
    className="w-6 h-6 bg-white text-gray-600 rounded-full flex flex-col justify-center items-center"
    >
      {userName?.[0]}
    </div>
  )

}

export default DesignComponents