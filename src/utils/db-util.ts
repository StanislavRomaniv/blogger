import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';

dotenv.config();

export const createClient = async () => {
    const urL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uvxcuwa.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(urL);

    console.log('client');

    return await client.connect();
};

export const connectToCollection = async (client: MongoClient, dbName: string, collectionName: string) => await client.db(dbName).collection(collectionName);
export const insertDocument = async (collection: Collection, document: Document) => await collection.insertOne(document);

export const createCollection = async (client: MongoClient, dbName: string, collectionName: string) => {
    const db = await client.db(dbName);
    const collection = await db.collection(collectionName);

    return collection;
};
