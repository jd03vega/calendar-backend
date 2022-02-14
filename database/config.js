const mongoose = require("mongoose");

const dbConection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB online")
    } catch (error) {
        console.log('error', error);
        throw new Error("Problema de conección con la BD")
    }

}

module.exports = {
    dbConection
}