const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const workout = require("./routes/workout");
const user = require("./routes/user");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: [
        'http://localhost:3000', // Development frontend
        'https://fitness-client-app.vercel.app' // Production frontend
    ],
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING);
//prompts a message once the connection is 'open' and we are connected successfully to the db
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

app.use("/workouts", workout);
app.use("/users", user);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};