import { NextRequest, NextResponse } from "next/server.js";
import { connectDatabase } from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";


export async function POST (NextRequest){

    try{
        const {fullName, userName, email, password} = await NextRequest.json()

        if(!fullName || !userName || !email ||!password){
            return NextResponse.json(
                {error: "All fields are required."},
                {status: 400}
            )
        }

        await connectDatabase()
        console.info("Working here")

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
            password
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