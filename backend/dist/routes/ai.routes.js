import { Hono } from 'hono';
import { Llm } from '@uptiqai/integrations-sdk';
import catchAsync from '../utils/catchAsync.js';
import prisma from '../client.js';
const aiRoutes = new Hono();
aiRoutes.post('/chat', catchAsync(async (c) => {
    const { messages } = await c.req.json();
    // Fetch some context to help the AI
    const [dealCount, totalValue, contactCount, latestDeals, latestTasks] = await Promise.all([
        prisma.deal.count({ where: { isDeleted: false } }),
        prisma.deal.aggregate({
            _sum: { value: true },
            where: { stage: 'Closed Won', isDeleted: false }
        }),
        prisma.contact.count({ where: { isDeleted: false } }),
        prisma.deal.findMany({
            where: { isDeleted: false },
            take: 5,
            orderBy: { updatedAt: 'desc' },
            include: { company: true }
        }),
        prisma.task.findMany({
            where: { isDeleted: false, status: 'Pending' },
            take: 5,
            orderBy: { dueDate: 'asc' }
        })
    ]);
    const context = `
Current CRM State:
- Total Deals: ${dealCount}
- Total Revenue (Won): $${totalValue._sum.value || 0}
- Total Contacts: ${contactCount}

Recent Deals:
${latestDeals.map(d => `- ${d.name} (${d.company?.name || 'No Company'}): $${d.value} [${d.stage}]`).join('\n')}

Upcoming Tasks:
${latestTasks.map(t => `- ${t.title} (Due: ${t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No date'})`).join('\n')}

Instructions:
You are NexusCRM AI Assistant. You help users manage their CRM.
When asked about data, use the context above.
When asked to draft an email, provide a professional draft.
When asked to create a task, confirm you can do it (simulated for now).
If the user asks for something specific not in context, answer generally or ask for more details.
Keep responses concise and helpful. Use emojis.
`;
    const llm = new Llm({ provider: process.env.LLM_PROVIDER });
    const systemMessage = {
        role: 'system',
        content: context
    };
    const result = await llm.createStream({
        messages: [systemMessage, ...messages],
        model: process.env.LLM_MODEL,
        options: { temperature: 0.7 }
    });
    c.header('Content-Type', 'text/event-stream');
    c.header('Cache-Control', 'no-cache');
    c.header('Connection', 'keep-alive');
    return c.body(result.data);
}));
export default aiRoutes;
