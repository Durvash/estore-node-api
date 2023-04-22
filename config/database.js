const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log(`MongoDB database connected`);

    } catch (error) {
        console.error(`MongoDB database connection failed : ${error.message}`);
    }
}

module.exports = connectDatabase;