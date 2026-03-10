import { Context } from 'hono';
import * as notificationService from '../services/notificationService.js';
import catchAsync from '../utils/catchAsync.js';

export const getNotifications = catchAsync(async (c: Context) => {
  const notifications = await notificationService.getNotifications();
  return c.json(notifications);
});

export const markAsRead = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  await notificationService.markAsRead(id);
  return c.json({ message: 'Notification marked as read' });
});

export const markAllAsRead = catchAsync(async (c: Context) => {
  await notificationService.markAllAsRead();
  return c.json({ message: 'All notifications marked as read' });
});

export const deleteNotification = catchAsync(async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  await notificationService.deleteNotification(id);
  return c.json({ message: 'Notification deleted' });
});
