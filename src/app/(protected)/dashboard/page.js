'use client'
import DesignComponents from '@/components/DesignComponents';
import { useAppContext } from '@/contexts/Provider';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Dashboard() {

    const [activeNav , setactiveNav] = useState("New Designs");
    const [loading , setLoading] = useState("false");
    const [finalRecords , setFinalRecords] = useState([]);
    const [userRecords , setUserRecords] = useState({});

    const [ userId , setuserId] = useState("");

    const {fetchDesignsFromAppwrite , getLoggeInUser , fetchUsers} = useAppContext();

    useEffect(() => {
        //fetching the designs
        fetchDesigns();
    },[])

    const fetchDesigns = async () => {
        setLoading(true);
        const records = await fetchDesignsFromAppwrite();

        const finalRecords1 = records?.documents ?? [];
        setFinalRecords(finalRecords1);

        let userIds = new Set();

        finalRecords1.forEach((item) => {
            let userId =  item?.UserId;
            userIds.add(userId)
        })

        userIds = [...userIds];
        console.log(userIds);

        if(userIds.length > 0) {
            createUserRecordsObject(userIds);
        }

        console.log(records);
        setLoading(false);
    }

    const getUserDesigns = async () => {
        setLoading(true);

        let user = await getLoggeInUser();
        let userId = user.$id;

        const records = await fetchDesignsFromAppwrite(userId);
        const finalRecords1 = records?.documents ?? [];

        // console.log(finalRecords1);
        //lets create a unique id
        let userIds = new Set();

        finalRecords1.forEach((item) => {
            let userId =  item?.UserId;
            userIds.add(userId)
        })

        userIds = [...userIds];
        console.log(userIds);

        if(userIds.length > 0) {
            createUserRecordsObject(userIds);
        }


        
        setFinalRecords(finalRecords);
        console.log(records);
        setLoading(false);
    }


    const createUserRecordsObject = async (userIds) => {
        const records = await fetchUsers(userIds); 
        console.log(records);

        let obj = {}

        records?.documents.forEach((item) => (obj[item.$id] = item));
        console.log(obj);
        setUserRecords(obj);

    }
  return (
    <div className="flex flex-col w-full px-10 bg-[#1B1B1B] text-white min-h-screen  ">
        {/* logo */}
         
        {/* profile button */}
        

        <div className="flex  justify-between " >
            {/* nav */}
            <div className='flex space-x-8' >
            {/* new links */}
            <span 
            className= 
            {'cursor-pointer ' + 
            (activeNav === "All Designs" ? "border-b border-blue-400 pb-3" : "")}
            onClick = {() => {
                setactiveNav("All Designs");
            }}
            >
            All Designs</span>
            <span 
            className= 
            {'cursor-pointer ' + 
            (activeNav === "Your Designs" ? "border-b border-blue-400 pb-3" : "")}
            onClick = {() => {
                setactiveNav("Your Designs"); getUserDesigns();
            }}
            >
            Your Designs</span>
            </div>
            <div>
                {/* Button */}
                <Link href = "/new-design" >
                <button className='text-white rounded-full py-2 px-10 cursor-pointer'
                style={{
                    background:
                      "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
                  }}
                  
                >
                    Add Design
                </button>
                </Link>
                
            </div>
        </div>

        {/* designs components */}
        <div className=' flex flex-col mt-10' >
            {
                loading ? <span>
                    loading..
                </span> 
                :
                <DesignComponents
                finalRecords = {finalRecords}
                userRecords = {userRecords}
                ></DesignComponents>
            }
            
        </div>
        
        
    </div>
  )
} 

export default Dashboard