import { Router } from 'express';
import * as controller from './task.controller';
import { validate } from '../../shared/middlewares/validate';
import {
	createTaskSchema,
	listTasksSchema,
	taskIdSchema,
	updateStatusSchema,
} from './task.validation';

const router = Router();

router.post('/', validate(createTaskSchema), controller.create);
router.get('/', validate(listTasksSchema, 'query'), controller.list);
router.patch(
	'/:id/status',
	validate(taskIdSchema, 'params'),
	validate(updateStatusSchema),
	controller.updateStatus,
);

export const taskRoutes = router;
