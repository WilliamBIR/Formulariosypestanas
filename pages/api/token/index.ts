import { NextApiHandler } from 'next';
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET as string;

const token: NextApiHandler = async (req, response) => {
	const tokenTemp = await jwt.getToken({ req, secret });
	response.send(JSON.stringify(tokenTemp, undefined, 2));
};

export default token;
