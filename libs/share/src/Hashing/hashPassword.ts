const bcrypt = require('bcrypt');

export const generatePass = async function (password: string): Promise<string>{
    let saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};