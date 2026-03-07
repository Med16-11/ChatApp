import mongoose from "mongoose";
const connectDB = async () => {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error("MONGO_URI is not defined in env variables");
    }
    try {
        await mongoose.connect(url, {
            dbName: "Chatappmicroserviceapp"
        });
        console.log("connected to mongoDB");
    }
    catch (error) {
        console.error("Failed to connect to Mongodb", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map