//this function connects backend with mongoDB

const mongoose = require("mongoose");

async function connectToDatabase(URL){

	try{
		console.log("connecting to Database...");
		await mongoose.connect(URL);
		console.log("Connnected to database successfully ...");
	}
	catch(error){
		console.error(error);
	}

}

module.exports = connectToDatabase;
