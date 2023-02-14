import { connectToCollection, createClient } from '@/utils/db-util';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client, collection;
    const blogId = req.query.blogId;

    try {
        client = await createClient();
        collection = await connectToCollection(client, 'blogger', 'blogs');
    } catch (error) {
        res.status(500).send('Connection to the database failed');
        return;
    }

    if (req.method === 'POST') {
        try {
            await collection.updateOne({ id: blogId }, { $push: { comments: { ...req.body, id: new ObjectId() } } });
            res.status(200).send('Comment was successfully added!');
        } catch (error) {
            res.status(500).send('Inserting failed');
        }
    }

    if (req.method === 'GET') {
        try {
            const data = await collection.find({ id: blogId }).toArray();
            res.status(201).json({ data: data[0].comments });
        } catch (error) {
            res.status(500).send({ message: 'Fetching data failed' });
        }
    }

    client.close();
};

export default handler;
