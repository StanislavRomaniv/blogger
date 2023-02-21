import { ObjectId } from 'mongodb';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: User;
    }

    interface User {
        name: string;
        email: string;
        password: string;
        about: string;
        image: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
    }
}
