import bcrypt from 'bcrypt';

const hashPassword = async (password: 'string') => {
    return await bcrypt.hash(password, 12);
};

const verifyPassword = async (enteredPassword: string, dbPassword: string) => {
    return await bcrypt.compare(enteredPassword, dbPassword);
};

export { hashPassword, verifyPassword };
