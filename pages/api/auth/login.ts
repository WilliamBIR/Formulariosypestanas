import { NextApiHandler } from 'next';
import getUser from '../../../src/auth/application/getUser';

const login: NextApiHandler = async (request, response) => {
	if (request.method !== 'POST') {
		response.status(405).end();
		return;
	}
	if (!request.body.email || !request.body.password) {
		response.status(400).end();
		return;
	}
	const user = await getUser(request.body.email, request.body.password);
	if (!user) {
		response.status(401).end();
		return;
	}

	return response.status(200).json(user);
};

export default login;
