import { connectToCollection, createClient } from '@/utils/db-util';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client, collection;

    if (req.method !== 'GET') {
        res.status(404).send('Bad request method!');
        return;
    }

    try {
        client = await createClient();
        collection = await connectToCollection(client, 'blogger', 'blogs');
    } catch (error) {
        client?.close();
        res.status(500).send('Connection to the database failed!');
        return;
    }

    try {
        const data = await collection.find({}).toArray();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).send('Fetching data failed');
    }

    client.close();
};

export default handler;
