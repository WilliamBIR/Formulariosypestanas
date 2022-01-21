import { PrismaClient } from '@prisma/client';

const getUserRepository = async (email: string, password: string) => {

	const prisma = new PrismaClient();
	const user= await prisma.user.findFirst({
		where: {
			AND: [
				{
					email: {
						equals: email,
					},
				},
				{
					password: {
						equals: password,
					},
				},
			],
		},
	});
	return user 
};

export default getUserRepository;
