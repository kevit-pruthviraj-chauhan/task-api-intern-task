import { Schema, model, Types, InferSchemaType } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: (value: string) => isEmail(value),
				message: 'Email is invalid',
			},
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

export type User = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };

export const UserModel = model('User', userSchema);
