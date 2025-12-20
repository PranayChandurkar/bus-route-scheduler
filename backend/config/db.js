const mongoose = require("mongoose");

const connectToDB = () => {

mongoose.connect(process.env.MONGO_URL,)
.then(() => console.log("Mongodb connected"))
.catch((err) => console.error ("Mongodb connection error : " , err));
}

module.exports = connectToDB