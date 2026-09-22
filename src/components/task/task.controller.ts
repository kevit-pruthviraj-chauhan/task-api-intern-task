import { Request, Response } from 'express';
import * as taskService from './task.service';
import { sendSuccess } from '../../shared/utils/response';
import { logger } from '../../shared/utils/logger';
import { TaskStatus } from './task.types';

export const create = async (req: Request, res: Response) => {
	const task = await taskService.createTask(req.body);
	logger.info(`Task created: ${task._id}`);
	sendSuccess(res, 201, task);
};

export const list = async (_req: Request, res: Response) => {
	const { tasks, pagination } = await taskService.listTasks(res.locals.query);
	sendSuccess(res, 200, tasks, pagination);
};

export const updateStatus = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const task = await taskService.updateTaskStatus(
		String(req.params.id),
		req.body.status as TaskStatus,
	);
	logger.info(`Task ${task._id} status changed to ${task.status}`);
	sendSuccess(res, 200, task);
};
