import Joi from 'joi';
import { TaskPriority, TaskStatus } from './task.types';

const objectId = Joi.string().hex().length(24);

export const createTaskSchema = Joi.object({
	title: Joi.string().trim().min(1).max(200).required(),
	description: Joi.string().trim().max(2000).allow('').default(''),
	priority: Joi.string()
		.valid(...Object.values(TaskPriority))
		.default(TaskPriority.MEDIUM),
	createdBy: objectId.required(),
	assignedTo: objectId.optional(),
	dueDate: Joi.date().iso().optional(),
});

export const updateStatusSchema = Joi.object({
	status: Joi.string()
		.valid(...Object.values(TaskStatus))
		.required(),
});

export const taskIdSchema = Joi.object({
	id: objectId.required(),
});

export const listTasksSchema = Joi.object({
	status: Joi.string().valid(...Object.values(TaskStatus)),
	priority: Joi.string().valid(...Object.values(TaskPriority)),
	assignedTo: objectId,
	page: Joi.number().integer().min(1).default(1),
	limit: Joi.number().integer().min(1).max(100).default(10),
});
