import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI){
    throw new Error("No Connection string found")
}

let cachedconnection = global.mongoose

if(!cachedconnection){
    cachedconnection = global.mongoose = {
        connection: null,
        promise: null
    }
}

export async function connectDatabase(){
    if(cachedconnection.connection){
        return cachedconnection.connection
    }

    if(!cachedconnection.promise){
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        cachedconnection.promise = mongoose.connect(MONGODB_URI, options).then(()=> mongoose.connection)
    }

    try{
        cachedconnection.connection = await cachedconnection.promise
    } catch(error){
        cachedconnection.promise = null
        throw error
    }

    return cachedconnection.connection

}
