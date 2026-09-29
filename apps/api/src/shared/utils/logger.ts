import { createLogger, transports, format } from 'winston';
import { envConfig } from '../../config/env-config';

export const logger = createLogger({
	level: envConfig.logLevel,
	transports: [
		new transports.Console({ silent: envConfig.nodeEnv === 'test' }),
	],
	format: format.combine(
		format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
		format.colorize(),
		format.printf(
			({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
		),
	),
});
