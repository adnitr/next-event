import validator from 'validator';
import { connectToDB, insertDocument } from '../../helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email address' });
      return;
    }
    let client, collection;
    try {
      const connectionObj = await connectToDB('emails');
      client = connectionObj.client;
      collection = connectionObj.collection;
    } catch (err) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(collection, { email });
      res.status(201).json({ message: 'Signed up for the newsletter.' });
    } catch (err) {
      res.status(500).json({ message: 'Inserting the data failed!' });
    }

    client.close();
  }
}

export default handler;
