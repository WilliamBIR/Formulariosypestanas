import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

const secret: NextApiHandler = async (req, response) => {
	const session = await getSession({ req });
	if (session) {
		response.send({ content: 'Hello' });
	} else {
		response.send({ error: 'Fail session' });
	}
};

export default secret;
