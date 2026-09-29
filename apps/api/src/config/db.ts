import mongoose from 'mongoose';
import { envConfig } from './env-config';
import { logger } from '../shared/utils/logger';

export const connectDatabase = async (): Promise<void> => {
	mongoose.connection.on('connected', () => logger.info('MongoDB connected'));
	mongoose.connection.on('error', (err) =>
		logger.error(`MongoDB error: ${err.message}`),
	);
	mongoose.connection.on('disconnected', () =>
		logger.warn('MongoDB disconnected'),
	);

	await mongoose.connect(envConfig.mongoUri);
};

export const disconnectDatabase = async (): Promise<void> => {
	await mongoose.disconnect();
};
