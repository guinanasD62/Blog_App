import mongoose from "mongoose";

const connectToDB = async () => {

    try {
        await mongoose.connect(
            "mongodb+srv://dianaroseguinanas:dianaroseguinanas@cluster0.hhqfg3z.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
            // , {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true
            // }
        )

        console.log("Connected to database!");
    } catch (error) {
        console.error("Connection failed!");
    }

}

module.exports = connectToDB;