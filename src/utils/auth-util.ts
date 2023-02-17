import bcrypt from 'bcrypt';

const hashPassword = async (password: 'string') => {
    bcrypt.hash(password, 12);
};

export { hashPassword };
