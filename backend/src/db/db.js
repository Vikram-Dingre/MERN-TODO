import mongoose from "mongoose";

async function connectDB(){
   
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`Connected to DB ✅`)
    } catch (error) {
        console.log(`Not Connected to DB ❌ \n`,error)
    }
}

export default connectDB;