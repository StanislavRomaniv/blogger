import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectToCollection, createClient } from '@/utils/db-util';
import { verifyPassword } from '@/utils/auth-util';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                let client, collection;

                try {
                    client = await createClient();
                    collection = await connectToCollection(client, 'blogger', 'users');
                } catch (error) {
                    client?.close();
                    throw new Error('Connection to the database failed!');
                }

                const user = await collection.findOne({ email: email });

                if (!user) {
                    client.close();
                    throw new Error('User doesn`t exists!');
                }

                const passwordMatches = await verifyPassword(password, user.password);

                if (!passwordMatches) {
                    client.close();
                    throw new Error('Wrong password! Please try again');
                }

                client.close();

                return { name: user.name, email: user.email, about: user.about || '', image: user.image || '', password: user.password, id: user.id };
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session }) => {
            let client, collection;

            try {
                client = await createClient();
                collection = await connectToCollection(client, 'blogger', 'users');
            } catch (error) {
                client?.close();
                return session;
            }

            try {
                const user = await collection.findOne({ email: session.user.email });

                if (user) {
                    const newUser = { name: user.name, email: user.email, about: user.about || '', image: user.image || '', password: user.password };
                    session.user = newUser;
                }
            } catch (error) {
                client.close();
                return session;
            }

            client.close();
            return session;
        },
    },
    secret: process.env.CREDENTIALS_CLIENT_SECRET,
});
