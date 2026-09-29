import { connectDatabase, disconnectDatabase } from './config/db';
import { UserModel } from './components/user/user.model';
import { logger } from './shared/utils/logger';

const users = [
	{ name: 'demo', email: 'demo@example.com' },
	{ name: 'omed', email: 'omed@example.com' },
	{ name: 'lobo', email: 'lobo@example.com' },
];

const seed = async (): Promise<void> => {
	await connectDatabase();
	await UserModel.deleteMany({});
	const created = await UserModel.insertMany(users);
	created.forEach((u) => logger.info(`Seeded user ${u.name}: ${u._id}`));
	await disconnectDatabase();
};

seed().catch((err) => {
	logger.error(`Seed failed: ${(err as Error).message}`);
	process.exit(1);
});
