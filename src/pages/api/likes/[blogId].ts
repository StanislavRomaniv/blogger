import { connectToCollection, createClient } from '@/utils/db-util';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client, blogsCollection;
    const blogId = req.query.blogId;

    try {
        client = await createClient();
        blogsCollection = await connectToCollection(client, 'blogger', 'blogs');
    } catch (error) {
        res.status(500).send('Connection to the database failed');
        client?.close();
        return;
    }

    if (req.method === 'PATCH') {
        try {
            if (req.body.isLiked) {
                await blogsCollection.updateOne({ id: blogId }, { $set: { totalLikes: req.body.totalLikes }, $addToSet: { usersLikes: { email: req.body.email } } });
            } else {
                await blogsCollection.updateOne({ id: blogId }, { $set: { totalLikes: req.body.totalLikes }, $pull: { usersLikes: { email: req.body.email } } });
            }
            res.status(200).send('Comment was successfully added!');
        } catch (error) {
            res.status(500).send('Inserting failed');
        }
    }

    client.close();
};

export default handler;
