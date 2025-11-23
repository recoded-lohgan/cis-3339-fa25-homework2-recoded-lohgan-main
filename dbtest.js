// Connect your database using a proper connection string


// Your scripts for homework questions.
// MongoDB connection example
const { MongoClient } = require('mongodb');

// CRUD operations script starts here
const uri = 'mongodb://localhost:27017'; // Example for local MongoDB
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		console.log('Connected to MongoDB!');

		// Use the 'students' database and 'enrollments' collection
		const db = client.db('students');
		const enrollments = db.collection('enrollments');

		// CREATE: Insert 5 new enrollment documents
		await enrollments.insertMany([
			{ studentId: 'S1001', name: 'Alice', major: 'Computer Science', course: 'CS101', grade: 88 },
			{ studentId: 'S1002', name: 'Bob', major: 'Mathematics', course: 'MATH201', grade: 75 },
			{ studentId: 'S1003', name: 'Charlie', major: 'Computer Science', course: 'CS102', grade: 91 },
			{ studentId: 'S1004', name: 'Diana', major: 'Physics', course: 'PHYS101', grade: 84 },
			{ studentId: 'S1005', name: 'Eve', major: 'Computer Science', course: 'CS101', grade: 95 }
		]);
		console.log('Inserted 5 enrollment documents.');

		// READ: Retrieve all enrollments for students majoring in "Computer Science"
		const csEnrollments = await enrollments.find({ major: 'Computer Science' }).toArray();
		console.log('Computer Science enrollments:', csEnrollments);

		// UPDATE: Update the grade of student S1001 in course CS101 to 92
		await enrollments.updateOne(
			{ studentId: 'S1001', course: 'CS101' },
			{ $set: { grade: 92 } }
		);
		console.log('Updated grade for S1001 in CS101 to 92.');

		// DELETE: Remove all enrollments for the course MATH201
		const deleteResult = await enrollments.deleteMany({ course: 'MATH201' });
		console.log(`Deleted ${deleteResult.deletedCount} enrollments for course MATH201.`);

	} catch (err) {
		console.error('MongoDB operation error:', err);
	} finally {
		await client.close();
	}
}

run();


/*
To run the script: execute the following line from the MongoDB Shell
load('dbtest.js');
*/
