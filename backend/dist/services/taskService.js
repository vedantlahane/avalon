import prisma from '../client.js';
export const taskService = {
    getTasks: async () => {
        return await prisma.task.findMany({
            where: { isDeleted: false },
            include: {
                contact: true,
                deal: true
            },
            orderBy: { dueDate: 'asc' }
        });
    },
    createTask: async (data) => {
        return await prisma.task.create({
            data: {
                ...data,
                isDeleted: false
            }
        });
    },
    updateTask: async (id, data) => {
        return await prisma.task.update({
            where: { id },
            data
        });
    },
    deleteTask: async (id) => {
        return await prisma.task.update({
            where: { id },
            data: { isDeleted: true }
        });
    },
    getSuggestions: async () => {
        // Simulate AI analysis of CRM data
        // In a real app, this would involve complex queries or LLM analysis
        return [
            {
                id: 's1',
                title: 'Call Sarah Chen (Quantum Finance)',
                reason: 'Negative email received, deal at risk. Immediate action needed.',
                priority: 'Urgent',
                type: 'call'
            },
            {
                id: 's2',
                title: 'Follow up Acme deal (7 days idle)',
                reason: 'No activity since last demo. Close date approaching.',
                priority: 'High',
                type: 'email'
            },
            {
                id: 's3',
                title: 'Schedule QBR with BrightPath',
                reason: 'Won deal 30 days ago. Time for quarterly business review.',
                priority: 'Medium',
                type: 'meeting'
            },
            {
                id: 's4',
                title: 'Update contact info for 5 leads',
                reason: '5 contacts missing phone or LinkedIn. Enrichment recommended.',
                priority: 'Low',
                type: 'task'
            }
        ];
    }
};
