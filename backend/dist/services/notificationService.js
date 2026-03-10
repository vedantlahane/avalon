import prisma from '../client.js';
export const getNotifications = async () => {
    return await prisma.notification.findMany({
        where: { isDeleted: false },
        orderBy: { timestamp: 'desc' },
    });
};
export const markAsRead = async (id) => {
    return await prisma.notification.update({
        where: { id },
        data: { isRead: true },
    });
};
export const markAllAsRead = async () => {
    return await prisma.notification.updateMany({
        where: { isRead: false, isDeleted: false },
        data: { isRead: true },
    });
};
export const deleteNotification = async (id) => {
    return await prisma.notification.update({
        where: { id },
        data: { isDeleted: true },
    });
};
export const createNotification = async (data) => {
    return await prisma.notification.create({
        data,
    });
};
