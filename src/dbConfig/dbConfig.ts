import mongoose from "mongoose";

export async function connect() {
    const mongoUrl = 'mongodb+srv://archishmanadhikari09:6zVlkDUnOo7plmHV@cluster0.bxf2d8w.mongodb.net/myapp?retryWrites=true&w=majority'
    console.log(mongoUrl)

    if (!mongoUrl) {
        console.error("MONGO_URL not found");
        throw new Error("MONGO_URL is not defined");
    }

    try {
        await mongoose.connect(mongoUrl);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}
