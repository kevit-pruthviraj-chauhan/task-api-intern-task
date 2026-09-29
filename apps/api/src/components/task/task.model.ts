import { Schema, model, Types, InferSchemaType } from 'mongoose';
import { TaskPriority, TaskStatus } from './task.types';

const taskSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, default: '', trim: true },
		status: {
			type: String,
			enum: Object.values(TaskStatus),
			default: TaskStatus.TODO,
		},
		priority: {
			type: String,
			enum: Object.values(TaskPriority),
			default: TaskPriority.MEDIUM,
		},
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null },
		dueDate: { type: Date, default: null },
	},
	{ timestamps: true, versionKey: false },
);

taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ createdAt: -1 });

export type Task = InferSchemaType<typeof taskSchema> & { _id: Types.ObjectId };

export const TaskModel = model('Task', taskSchema);
