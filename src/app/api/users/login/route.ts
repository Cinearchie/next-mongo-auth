import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {email , password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "User doesnt exist"},{status:400})
        }
        const valid = await bcrypt.compare(password , user.password)
        if(!valid){
            return NextResponse.json({error : "Invalid"});
        }
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData , 'pohihihjjbjhbhvgcffcff' , {expiresIn : "1d"})
        const response = NextResponse.json({
            message : "login Success",
            success : true
        })
        response.cookies.set("token" , token , {
            httpOnly : true
        })
        return response
    }catch(error){
        return error
    }

}