import NextAuth, { Session, User } from 'next-auth';
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
            // @ts-ignore
            async authorize(credentials: User) {
                let client, collection;

                try {
                    client = await createClient();
                    collection = await connectToCollection(client, 'blogger', 'users');
                } catch (error) {
                    throw new Error('Connection to the database failed!');
                }

                const user = await collection.findOne({ email: credentials!.email });

                if (!user) {
                    client.close();
                    throw new Error('User doesn`t exists!');
                }

                const passwordMatches = await verifyPassword(credentials!.password, user.password);

                if (!passwordMatches) {
                    client.close();
                    throw new Error('Wrong password! Please try again');
                }

                client.close();

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            let client, collection;

            try {
                client = await createClient();
                collection = await connectToCollection(client, 'blogger', 'users');
            } catch (error) {
                client?.close();
                return token;
            }

            const foundedUser: any = await collection.findOne({ email: token.email });

            if (foundedUser) {
                token.name = foundedUser.name;
                token.user = foundedUser;
            }

            client.close();

            return token;
        },
        async session({ session, token }) {
            session.user.name = token.name!;

            console.log(session);
            console.log(token);
            return session;
        },
    },
    secret: process.env.CREDENTIALS_CLIENT_SECRET,
});
