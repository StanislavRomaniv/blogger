import { ObjectId } from 'mongodb';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            name: string;
            email: string;
            password: string;
            image: string;
            _id: ObjectId;
        };
    }

    interface User {
        name: string;
        email: string;
        password: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: number;
    }
}
