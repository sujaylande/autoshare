import mongoose from "mongoose";

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: 'autosharingapp'})
        .then((con) => console.log(`MongoDB connected: ${con.connection.host}`))
        .catch((err) => console.log(err));
};

export default connectDB;