import mongoose from "mongoose";

const dbConnect = async ()=>{
    try{

        const mongoDBConnection  = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`DATABASE CONNECTED ${mongoDBConnection.connection.host} ` )

    }catch(error){
        console.log(error);


    }
}

export default dbConnect;