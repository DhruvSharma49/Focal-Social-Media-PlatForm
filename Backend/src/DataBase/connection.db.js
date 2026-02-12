const mongoose = require('mongoose')

async function connection(){
        console.log("Connecting to MongoDB Please wait......")   

try {
    const result = await mongoose.connect(process.env.DB_CONNECT) 
    console.log("DATABASE is Connected Successfully !!!!!!!")   
} catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
}
}

module.exports = connection