import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { request } from "http";

export const getDataFromToken = (request : NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || ''
        const decodedToken:any = jwt.verify(token , 'pohihihjjbjhbhvgcffcff')
        return decodedToken.id;
    }catch(error){

    }
}