import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "mealix",
        })
        console.log("Successfully Connected to Mongo DB")
    } catch (error) {
        console.log(error)
    }
}

export default connectdb