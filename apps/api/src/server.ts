import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/db';
import { envConfig } from './config/env-config';
import { logger } from './shared/utils/logger';

const start = async (): Promise<void> => {
	await connectDatabase();

	const server = createApp().listen(envConfig.port, () =>
		logger.info(
			`Server running on port ${envConfig.port} (${envConfig.nodeEnv})`,
		),
	);

	const shutdown = async (signal: string): Promise<void> => {
		logger.info(`${signal} received, shutting down`);
		server.close();
		await disconnectDatabase();
		process.exit(0);
	};

	process.on('SIGINT', () => void shutdown('SIGINT'));
	process.on('SIGTERM', () => void shutdown('SIGTERM'));
};

start().catch((err) => {
	logger.error(`Failed to start server: ${(err as Error).message}`);
	process.exit(1);
});
