'use client'
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
//createcontext
import React , {createContext, useContext} from "react"
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";
import { Description, Title } from "@radix-ui/react-dialog";

//initailly it will be null
const AppContext = createContext(null);


function Provider({children}) {
  const router = useRouter();
    //initialize the appwrite
    const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

      const account = new Account(client);
      const databases = new Databases(client);
      const storage = new Storage(client);


    //Login 
    const login = async (email , password) => {
      try {
        const response = account.createEmailSession(
          email,
          password
        );
        alert("You are Logged in Successfully")
        //Toast is requires
        router.push('/dashboard')
      }
      catch(err) {
        alert(err)
      }
    }

    //Signup

    const signup = async (name, email, password) => {
      try {
        const response = await account.create(ID.unique(), email, password, name);
  
        console.log(response);
  
        let id = response.$id;
        console.log(id);
        await createUser(id, name, email);
        alert("Your account was created successfully");
        // redirect user to login page
        router.push("/login");
      } catch (err) {
        alert(err);
      }
    };

    //Create user doc

    const createUser = async (
      id,
      fullName , 
      emailAddress , 
      bio = "" , 
      profilePic = "") => {
      try{
        const response = databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          id,
          {
            Name :  fullName,
            Bio : bio,
            ProfilePic : profilePic,
            Email : emailAddress
          }

        )
      }
      catch(err) {
        alert(err)
      }
    }
    //after creating the user, need to take the user information and display the user information in the user page

    //create a function , if the user logged in get the information and display on the profile

    const getLoggeInUser = async () => {
      try{
        const user = await account.get();
        return user;
      }
      catch(err){
        return null
      }
    }

    const getUserDetails = async (id) => {
      try{
        //fetch the user informaiton
        const user = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          id
        );
        return user;
      }
      catch (err) {
        alert(err)
      }
    }

    // Store images in the storage services

    const storePic = async (file) => {
      try{
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_BUCKET_ID ,
          ID.unique(),
          file
      );
      return response.$id;
      }
      catch (err) {
        alert(err)
      }
    }

    //push the details of the name and updates data of the users
    const updateUser = async (id ,name , email , bio , profilePic) => {
      try {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          id,
          {
            Name :  name,
            Bio : bio,
            ProfilePic : profilePic,
            Email : email
          }
        )
      }
      catch (err) {
        alert(err);
      }
    }


    //profile pic preview
    const getPicPreview = async (fileId) => {
      try{
       const response =  await storage.getFilePreview(
          process.env.NEXT_PUBLIC_BUCKET_ID 
          , fileId);
        
        return response.href; // which gives the url of the image and can be previewed in the profile page
      }
      catch(err) {
        alert(err)
      }
    }
    

    //create desing parts

    const createDesign = async (pictureId , title , description , userId) => {
      try {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
          ID.unique(),
          {
            DesignPic : pictureId,
            Title : title,
            Description : description,
            UserId : userId
          }

        )
      }
      catch (err){
        alert(err)
      }
    }

    const logout = async () => {
      await account.deleteSession("current");
    }

    //Fetxh the designs from the appwrite database

    const fetchDesignsFromAppwrite = async (userId = "" , designId = "") => {
      try {
        if(userId) {
            const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
            [Query.equal("UserId", [userId])]
          );
          return response;
        }
        else {
          if(designId) {
              const response = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
              [Query.equal("$id", [designId])]
            );
            return response;
          }
          else {
            const response = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
              );
              return response;
          }
          
        }
        
      }
      catch(err) {
        alert(err);
      }
    }

    //fetching the users

    const fetchUsers  = async (userIds = []) => {
        try {
          if(userIds) {
            const records = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
              [Query.equal("$id", [userIds])]
            );  
            return records;
          }
          else {
            const records = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            );  
            return records;
          }
        }
      catch (err) {
        alert(err);
      }
    }



    const exposedValues = {
      signup,
      login,
      createUser,
      getLoggeInUser,
      getUserDetails,
      storePic,
      updateUser,
      getPicPreview,
      createDesign,
      fetchDesignsFromAppwrite,
      fetchUsers,
      logout
    }

  return (
    <AppContext.Provider value={exposedValues}> 
        {children} 
    </AppContext.Provider>
  )
}

export default Provider


export const useAppContext = () => 
    useContext(AppContext);
