import { Hono } from 'hono';
import * as notificationController from '../controllers/notificationController.js';

const notificationRoutes = new Hono();

notificationRoutes.get('/', notificationController.getNotifications);
notificationRoutes.patch('/:id/read', notificationController.markAsRead);
notificationRoutes.post('/mark-all-read', notificationController.markAllAsRead);
notificationRoutes.delete('/:id', notificationController.deleteNotification);

export default notificationRoutes;
