import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { ApiError } from '../utils/ApiError';

type Source = 'body' | 'query' | 'params';

export const validate =
	(schema: ObjectSchema, source: Source = 'body') =>
	(req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(req[source], {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			const details = error.details.map((d) => d.message);
			return next(ApiError.badRequest('Validation failed', details));
		}

		if (source === 'query') res.locals.query = value;
		else req[source] = value;

		next();
	};
