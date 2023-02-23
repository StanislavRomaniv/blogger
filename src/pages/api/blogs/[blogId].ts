import { connectToCollection, createClient } from '@/utils/db-util';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client, blogsCollection, usersCollection;
    const blogId = req.query.blogId;

    try {
        client = await createClient();
        blogsCollection = await connectToCollection(client, 'blogger', 'blogs');
        usersCollection = await connectToCollection(client, 'blogger', 'users');
    } catch (error) {
        client?.close();
        res.status(500).send('Connection to the database failed');
        return;
    }

    if (req.method === 'POST') {
        const user = await usersCollection.findOne({ email: req.body.email });

        if (!user) {
            res.status(500).send('User not found!');
            client.close();
            return;
        }

        try {
            await blogsCollection.updateOne({ id: blogId }, { $push: { comments: { ...req.body, name: user.name, id: new ObjectId() } } });
            res.status(200).send('Comment was successfully added!');
        } catch (error) {
            res.status(500).send('Inserting failed');
        }
    }

    if (req.method === 'GET') {
        try {
            const data = await blogsCollection.findOne({ id: blogId });
            res.status(201).json({ data: data });
        } catch (error) {
            res.status(500).send({ message: 'Fetching data failed' });
        }
    }

    client.close();
};

export default handler;
