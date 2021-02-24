import mongoose from 'mongoose'
import colors from 'colors'

//connecting to mongodb
const connectDB=async ()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`mongoDB connected: ${conn.connection.host}`.cyan.bold)


}
export default connectDB
