import { TaskPriority, TaskStatus } from '../components/task/task.types';

const task = {
	type: 'object',
	properties: {
		_id: { type: 'string', example: '665f1c2e8a1b2c3d4e5f6a7b' },
		title: { type: 'string' },
		description: { type: 'string' },
		status: { type: 'string', enum: Object.values(TaskStatus) },
		priority: { type: 'string', enum: Object.values(TaskPriority) },
		createdBy: { type: 'string' },
		assignedTo: { type: 'string', nullable: true },
		dueDate: { type: 'string', format: 'date-time', nullable: true },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
	},
};

export const swaggerSpec = {
	openapi: '3.0.3',
	info: { title: 'Task Management API', version: '1.0.0' },
	tags: [{ name: 'Tasks' }],
	paths: {
		'/tasks': {
			post: {
				tags: ['Tasks'],
				summary: 'Create a task',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								required: ['title', 'createdBy'],
								properties: {
									title: { type: 'string' },
									description: { type: 'string' },
									priority: {
										type: 'string',
										enum: Object.values(TaskPriority),
									},
									createdBy: { type: 'string' },
									assignedTo: { type: 'string' },
									dueDate: { type: 'string', format: 'date-time' },
								},
							},
						},
					},
				},
				responses: {
					'201': { description: 'Task created' },
					'400': { description: 'Validation error or unknown user' },
				},
			},
			get: {
				tags: ['Tasks'],
				summary: 'List tasks with filtering and pagination',
				parameters: [
					{
						name: 'status',
						in: 'query',
						schema: { type: 'string', enum: Object.values(TaskStatus) },
					},
					{
						name: 'priority',
						in: 'query',
						schema: { type: 'string', enum: Object.values(TaskPriority) },
					},
					{ name: 'assignedTo', in: 'query', schema: { type: 'string' } },
					{
						name: 'page',
						in: 'query',
						schema: { type: 'integer', default: 1 },
					},
					{
						name: 'limit',
						in: 'query',
						schema: { type: 'integer', default: 10 },
					},
				],
				responses: { '200': { description: 'Paginated list of tasks' } },
			},
		},
		'/tasks/{id}/status': {
			patch: {
				tags: ['Tasks'],
				summary: 'Update task status',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						schema: { type: 'string' },
					},
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								required: ['status'],
								properties: {
									status: { enum: Object.values(TaskStatus) },
								},
							},
						},
					},
				},
				responses: {
					'200': { description: 'Status updated' },
					'404': { description: 'Task not found' },
					'409': { description: 'Invalid status transition' },
				},
			},
		},
	},
	components: { schemas: { Task: task } },
};
