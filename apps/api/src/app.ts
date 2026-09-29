import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { taskRoutes } from './components/task/task.routes';
import { swaggerSpec } from './config/swagger';
import {
	errorHandler,
	notFoundHandler,
} from './shared/middlewares/errorHandler';

export const createApp = (): Application => {
	const app = express();
	app.disable('x-powered-by');

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/health', (_req, res) => res.json({ status: 'ok' }));
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.use('/tasks', taskRoutes);

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
};
