import { connectToCollection, createClient } from '@/utils/db-util';
import { NextApiRequest, NextApiResponse } from 'next';

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

        try {
            await collection.updateOne({ email: req.body.email }, { $set: { about: req.body.about } });
            res.status(200).send('Name successfully updated!');
        } catch (error) {
            res.status(500).send('Updating failed!');
        }

        client.close();
    }
};

export default handler;
