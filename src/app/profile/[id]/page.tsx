"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function UserProfile({params} : any){
    const router = useRouter()
    const [data , setData] = useState("nothing")
    const logout = async () => {
        try{
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        }catch(error){

        }
    }
    const getUserDetail = async ()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <br />
            <h2>{data === 'nothing' ? 'NOTHING' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <br />
            <p className="text-4xl">welcome to profile page : {params.id}</p>
            <br />
            <button onClick={getUserDetail} className="bg-green-500 mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Get Info</button>
            <button onClick={logout} className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
        </div>
    )
}