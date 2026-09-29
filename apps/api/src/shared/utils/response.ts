import { Response } from 'express';

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export const sendSuccess = <T>(
	res: Response,
	statusCode: number,
	data: T,
	meta?: Pagination,
): Response => {
	return res
		.status(statusCode)
		.json({ success: true, data, ...(meta && { meta }) });
};
