export enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
}

export const STATUS_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
	[TaskStatus.TODO]: [TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],
	[TaskStatus.IN_PROGRESS]: [
		TaskStatus.TODO,
		TaskStatus.COMPLETED,
		TaskStatus.CANCELLED,
	],
	[TaskStatus.COMPLETED]: [],
	[TaskStatus.CANCELLED]: [],
};

export const canTransition = (from: TaskStatus, to: TaskStatus): boolean =>
	STATUS_TRANSITIONS[from].includes(to);
