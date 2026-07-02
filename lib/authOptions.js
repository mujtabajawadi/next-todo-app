import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "./dbConnection.js";
import User from "@/models/User.model.js";
import bcrypt from 'bcryptjs'


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: 'email'},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing email or password")
                }

                try{
                    await connectDatabase()
                    const user = await User.findOne({email: credentials.email})

                    if(!user){
                        throw new Error("Invalid Email")
                    }
                    const isPasswordMatched = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordMatched){
                        throw new Error("Incorrect Password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch(error){
                    throw error
                }

            }
        })
    ],
    callbacks:{
        async jwt ({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session ({session, token}){
            if(session.user){
                session.user.id = token.id
            }
            return session
        }
    },
    pages:{
        signIn: "/login",
        error: "/login"

    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60
    },
    secret: process.env.NEXTAUTH_SECRET
}