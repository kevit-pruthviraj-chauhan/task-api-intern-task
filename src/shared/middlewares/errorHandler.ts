import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const notFoundHandler = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): Response => {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: false,
			error: { message: err.message, details: err.details },
		});
	}

	if (err instanceof MongooseError.ValidationError) {
		const details = Object.values(err.errors).map((e) => e.message);
		return res.status(400).json({
			success: false,
			error: { message: 'Validation failed', details },
		});
	}

	if (err instanceof MongooseError.CastError) {
		return res.status(400).json({
			success: false,
			error: { message: `Invalid ${err.path}: ${err.value}` },
		});
	}

	const message = err instanceof Error ? err.message : 'Internal server error';
	logger.error(`Unhandled error: ${message}`);
	return res
		.status(500)
		.json({ success: false, error: { message: 'Internal server error' } });
};
