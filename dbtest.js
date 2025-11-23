// Connect your database using a proper connection string


// Your scripts for homework questions.
// MongoDB connection example
const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost/myDatabase'; // Example for local MongoDB
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		console.log('Connected to MongoDB!');
		// Example: list databases
		const adminDb = client.db().admin();
		const databases = await adminDb.listDatabases();
		console.log('Databases:', databases);
	} catch (err) {
		console.error('MongoDB connection error:', err);
	} finally {
		await client.close();
	}
}

run();


/*
To run the script: execute the following line from the MongoDB Shell
load('dbtest.js');
*/
