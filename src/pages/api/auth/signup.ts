import { NextApiRequest, NextApiResponse } from 'next';

import { createClient, connectToCollection } from '@/utils/db-util';
import { hashPassword } from '@/utils/auth-util';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return;
    }

    let client, collection;

    try {
        client = await createClient();
        collection = await connectToCollection(client, 'blogger', 'users');
    } catch (error) {
        res.status(500).send('Connection to the database failed!');
        client?.close();
        return;
    }

    const newUser = { ...req.body };

    if (!newUser.email.includes('@') || newUser.email.length < 7 || newUser.password.trim().length < 7 || newUser.name.trim().length < 5) {
        res.status(422).send('Incorrect values');
        client.close();
        return;
    }

    const isSignedUp = await collection.findOne({ email: newUser.email });

    if (isSignedUp) {
        res.status(200).send('User already exists!');
        client.close();
        return;
    }

    newUser.password = await hashPassword(newUser.password);

    try {
        await collection.insertOne({ ...newUser });
        res.status(200).send('You`re successfully signed up!');
    } catch (error) {
        res.status(500).send('Inserting the document failed!');
    }

    client.close();
};

export default handler;