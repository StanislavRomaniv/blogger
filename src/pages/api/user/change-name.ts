import { connectToCollection, createClient } from '@/utils/db-util';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'PATCH') {
        let client, collection;

        try {
            client = await createClient();
            collection = await connectToCollection(client, 'blogger', 'users');
        } catch (error) {
            res.status(500).send('Connecting to the database failed!');
            client?.close();
            return;
        }

        const user = await collection.findOne({ email: req.body.email });

        if (!user) {
            res.status(500).send('Error occured. No such user available!');
            client.close;
            return;
        }

        if (!req.body.name || req.body.name.length < 5) {
            res.status(422).send('Incorrect values!');
            client.close;
            return;
        }

        try {
            await collection.updateOne({ email: req.body.email }, { $set: { name: req.body.name } });
            res.status(200).send('Name successfully updated!');
        } catch (error) {
            res.status(500).send('Updating failed!');
        }

        client.close();
    } else if (req.method == 'GET') {
        let client, collection;

        try {
            client = await createClient();
            collection = await connectToCollection(client, 'blogger', 'users');
        } catch (error) {
            res.status(500).send('Connecting to the database failed!');
            client?.close();
            return;
        }

        const user = await collection.findOne({ email: req.body.email });

        res.status(200).json({ name: user!.name });
        client.close();
    }
};

export default handler;
