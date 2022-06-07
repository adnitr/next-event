import { MongoClient } from 'mongodb';

export async function connectToDB(collectionName) {
  const client = new MongoClient(
    `mongodb+srv://adnitr:S0rbuqOIYXIf3Er7@cluster0.pwga1.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();
  const db = client.db('myProject');
  const collection = db.collection(collectionName);
  return { collection, client };
}

export async function insertDocument(collection, document) {
  await collection.insertOne(document);
}

export async function findDocuments(collection, filter = {}, sort = {}) {
  const data = await collection.find(filter).sort(sort).toArray();
  return data;
}
