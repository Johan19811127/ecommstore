import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI; // Add this in your .env.local file
const options = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Ensure the MongoClient is initialized only once
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Replace with your DB name
  return { client, db };
}
