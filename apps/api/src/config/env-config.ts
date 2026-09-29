import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(__dirname, '../../../../.env') });

const required = (key: string): string => {
	const value = process.env[key];
	if (!value) throw new Error(`Missing required env variable: ${key}`);
	return value;
};

export const envConfig = {
	nodeEnv: process.env.NODE_ENV ?? 'development',
	port: Number(process.env.PORT ?? 3000),
	mongoUri: required('MONGODB_URI'),
	logLevel: process.env.LOG_LEVEL ?? 'info',
};

export const isTest = envConfig.nodeEnv === 'test';
