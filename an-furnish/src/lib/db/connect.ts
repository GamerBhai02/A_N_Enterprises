import { MongoClient } from 'mongodb';

// Define a type for our database
export type Db = {
  client: MongoClient;
};

// Create a singleton instance of the database client
let dbClient: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (dbClient) {
    return dbClient;
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  try {
    const client = await MongoClient.connect(uri);
    dbClient = { client };
    console.log('Connected to MongoDB');
    return dbClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}