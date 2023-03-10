import { connectToCollection, createClient, insertDocument } from '@/utils/db-util';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client, collection;

    if (req.method === 'POST') {
        res.status(404).send('Bad request method!');
        return;
    }

    try {
        client = await createClient();
        collection = await connectToCollection(client, 'blogger', 'contacts');
    } catch (error) {
        client?.close();
        res.status(500).send({ message: 'Connection to the database failed' });
        return;
    }

    const isSubscribed = await collection.find({ $or: [{ phone: req.body.phone }, { email: req.body.email }] }).toArray();

    if (isSubscribed.length === 0) {
        try {
            await insertDocument(collection, { ...req.body });
            res.status(201).json({ message: 'Subscribed successfully!' });
        } catch (error) {
            res.status(500).send({ message: 'Subscribing failed' });
            client.close();
            return;
        }
    } else {
        res.status(422).send({ message: 'User`s already subscribed!' });
    }

    client.close();
};

export default handler;
