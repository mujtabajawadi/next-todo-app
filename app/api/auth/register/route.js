import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";


export async function POST (NextRequest){

    try{
        const {fullName, userName, email, password, fileURL, fileId} = await NextRequest.json()
        
        console.log("Received payload:", { fullName, userName, email, fileURL, fileId });
        if(!fullName || !userName || !email ||!password){
            return NextResponse.json(
                {error: "All fields are required."},
                {status: 400}
            )
        }

        await connectDatabase()
    
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {error: "User already registered."},
                {status: 400}
            )
        }

        await User.create({
            fullName,
            userName,
            email,
            password,
            fileURL,
            fileId
        })

        return NextResponse.json(
            {message: "User registered successfully."},
            {status: 201}
        )

    } catch(error){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}