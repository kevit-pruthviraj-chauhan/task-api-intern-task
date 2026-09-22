import { TaskModel, Task } from './task.model';
import { UserModel } from '../user/user.model';
import { canTransition, TaskPriority, TaskStatus } from './task.types';
import { ApiError } from '../../shared/utils/ApiError';
import { Pagination } from '../../shared/utils/response';

interface CreateTaskInput {
	title: string;
	description?: string;
	priority?: TaskPriority;
	createdBy: string;
	assignedTo?: string;
	dueDate?: Date;
}

interface ListTaskFilters {
	status?: TaskStatus;
	priority?: TaskPriority;
	assignedTo?: string;
	page: number;
	limit: number;
}

const ensureUserExists = async (id: string, label: string): Promise<void> => {
	const exists = await UserModel.exists({ _id: id });
	if (!exists) throw ApiError.badRequest(`${label} user does not exist`);
};

export const createTask = async (input: CreateTaskInput): Promise<Task> => {
	await ensureUserExists(input.createdBy, 'createdBy');
	if (input.assignedTo) await ensureUserExists(input.assignedTo, 'assignedTo');
	return TaskModel.create(input);
};

export const listTasks = async (
	filters: ListTaskFilters,
): Promise<{ tasks: Task[]; pagination: Pagination }> => {
	const query: Record<string, unknown> = {};
	if (filters.status) query.status = filters.status;
	if (filters.priority) query.priority = filters.priority;
	if (filters.assignedTo) query.assignedTo = filters.assignedTo;

	const skip = (filters.page - 1) * filters.limit;

	const [tasks, total] = await Promise.all([
		TaskModel.find(query)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(filters.limit)
			.lean(),
		TaskModel.countDocuments(query),
	]);

	return {
		tasks,
		pagination: {
			page: filters.page,
			limit: filters.limit,
			total,
			totalPages: Math.ceil(total / filters.limit),
		},
	};
};

export const updateTaskStatus = async (
	id: string,
	status: TaskStatus,
): Promise<Task> => {
	const task = await TaskModel.findById(id);
	if (!task) throw ApiError.notFound('Task not found');

	if (!canTransition(task.status, status)) {
		throw ApiError.conflict(
			`Cannot change status from ${task.status} to ${status}`,
		);
	}

	task.status = status;
	return task.save();
};
