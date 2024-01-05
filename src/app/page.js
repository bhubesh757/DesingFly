import NavigationBar from '@/components/NavigationBar'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-6 px-20 bg-[#1B1B1B] text-white ">
        {/* navigation bar */}
        <div className="h-44" >
        <NavigationBar></NavigationBar>
        </div>
        

        <div className="flex flex-col w-full items-center mx-auto space-y-8">
        <div
          className="px-12 py-3 rounded-full max-w-4xl"
          style={{
            background:
              "linear-gradient(91deg, rgba(206, 206, 206, 0.07) 9.41%, rgba(255, 255, 255, 0.07) 146.46%, rgba(2, 255, 255, 0.00) 204.33%, rgba(255, 19, 2, 0.07) 204.33%)",
          }}
        >
          Over 1K people have become part of our community 🎉
        </div>

        <h1 className="max-w-3xl mx-auto text-6xl font-semibold text-center "
        style={{ lineHeight: "80px" }}
        >
        Your Destination for Inspiring Visual Creativity
        </h1>
        <p className="text-xl" >
        Discover, Share, Collaborate, and Elevate Your Creative Journey
        </p>

        {/* create a button */}
        <Link href = "/signup" >
        {/* button */}
        <button className="text-white rounded-full py-4 px-20 cursor-pointer "
        style={{
          background:
            "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
        }}
        >
          Get Started
        </button>
        </Link>
        </div>

        {/* Footer */}
        <div className="border rounded mt-20 p-1" >
          <img
          src = "https://i.ibb.co/wzKRh90/Hero-Image.png"
          className="w-full h-full objext-cover"
          alt = "Hero image for designfly"
          >
          </img>
        </div>

        <footer className="flex justify-between mt-12 py-20"  >
          <span> Created with NextJs and Appwrite </span>
          <div>
            <div className="flex space-x-4 w-2/5" >
            <img
            src = "https://cdn.dribbble.com/userupload/6022597/file/original-fc57867d58966a972c13d404a6ba7d84.png?resize=1504x1504"
            className="h-6 w-6"
            alt = "Designfly Logo"
            >
            </img>
            <span>
              DesignFly
            </span>
            </div>
          </div>
        </footer>

      
    </main>
  )
}
