import { hashPassword, verifyPassword } from '@/utils/auth-util';
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

        if (!req.body.newPassword || req.body.newPassword.length < 7) {
            res.status(422).send('Incorrect values!');
            client.close;
            return;
        }

        const verifiedPassword = await verifyPassword(req.body.oldPassword, user.password);

        if (!verifiedPassword) {
            res.status(422).send('Old password is wrong!');
            client.close;
            return;
        }

        const hashedPassword = await hashPassword(req.body.newPassword);

        try {
            await collection.updateOne({ email: req.body.email }, { $set: { password: hashedPassword } });
            res.status(200).send('Password successfully changed!');
        } catch (error) {
            res.status(500).send('Updating failed!');
        }

        client.close();
    }
};

export default handler;
