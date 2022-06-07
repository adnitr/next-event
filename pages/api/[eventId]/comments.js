import validator from 'validator';
import {
  connectToDB,
  insertDocument,
  findDocuments,
} from '../../../helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  //connecting to the database
  let client, collection;
  try {
    const connectionObj = await connectToDB('comments');
    client = connectionObj.client;
    collection = connectionObj.collection;
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      validator.isEmail(email) &&
      name.trim().length > 0 &&
      text.trim().length > 0
    ) {
      try {
        await insertDocument(collection, { eventId, email, name, text });
        res.status(201).json();
      } catch (error) {
        res.status(500).json({ message: 'Inserting the data failed!' });
      }
    } else {
      res
        .status(400)
        .json({ error: 'Invalid inputs. Please enter valid inputs.' });
    }
  } else if (req.method === 'GET') {
    try {
      const comments = await findDocuments(
        collection,
        { eventId },
        { _id: -1 }
      );
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Loading the comments failed!' });
    }
  } else {
    client.close();
    res.status(404).json();
  }
  //closing the connection
  client.close();
}

export default handler;
