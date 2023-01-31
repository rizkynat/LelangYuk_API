const mongoose = require("mongoose")

const { MONGO_URI } = process.env

exports.connect = () => {
    // Connecting to database
    mongoose
    .connect(MONGO_URI, {
        usNewUrlParser: true,
        usUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModified: false,
    })
    .then(() => {
        console.log("Successfully connected to databasew")
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...")
        console.log(error)
        process.exit(1)
    })
}