"use client";
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { set } from "mongoose";
import { toast } from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        email : "",
        password: "",
        username: ""
    })
    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const onSignup = async () => {
        try{
            console.log("starting")
            const response = await axios.post('/api/users/signup' , user)
            console.log("Signup Success" , response.data)
            router.push("/login")
        }catch(error : any){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    } , [user])
    return (
        <>
        <h1>Signup</h1>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>SignUp</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input type="text" id="username" value={user.username} onChange={(e) => setUser({...user , username : e.target.value})} placeholder="Username"/>

            <label htmlFor="email">email</label>
            <input type="email" id="email" value={user.email} onChange={(e) => setUser({...user , email : e.target.value})} placeholder="Email"/>

            <label htmlFor="password">password</label>
            <input type="password" id="password" value={user.password} onChange={(e) => setUser({...user , password : e.target.value})} placeholder="password"/>

            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Please Signup"}</button>
            <Link href="/login"> Visit Login Page</Link>
        </div>
        </>
    )
}