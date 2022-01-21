import getUserRepository from '../infrastructure/Prisma/getUserRepository';

const getUser = async (email: string, password: string) => {
	
	return getUserRepository(email, password);
};

export default getUser;
