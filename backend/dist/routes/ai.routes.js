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
aiRoutes.post('/summarize-activity', catchAsync(async (c) => {
    const { notes, type } = await c.req.json();
    const llm = new Llm({ provider: process.env.LLM_PROVIDER });
    const prompt = `
    Summarize the following ${type} notes into a concise summary, a list of key discussion points, and detect the overall sentiment (Positive, Neutral, Negative, or Cautious).
    
    Notes: "${notes}"
    
    Respond ONLY with a JSON object in this exact format:
    {
      "summary": "concise summary string",
      "keyPoints": ["point 1", "point 2", ...],
      "sentiment": "SentimentValue"
    }
  `;
    const result = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
    });
    try {
        const jsonStr = result.text.replace(/```json\n?|```/g, '').trim();
        return c.json(JSON.parse(jsonStr));
    }
    catch (error) {
        return c.json({
            summary: "Could not generate summary",
            keyPoints: [],
            sentiment: "Neutral"
        });
    }
}));
aiRoutes.post('/extract-tasks', catchAsync(async (c) => {
    const { notes } = await c.req.json();
    const llm = new Llm({ provider: process.env.LLM_PROVIDER });
    const prompt = `
    Extract potential follow-up tasks from the following meeting/call notes.
    For each task, provide a title, a suggested due date (relative to today), and priority (Low, Medium, High).
    
    Notes: "${notes}"
    
    Respond ONLY with a JSON object in this exact format:
    {
      "tasks": [
        { "title": "Task title", "dueDate": "YYYY-MM-DD", "priority": "PriorityValue" },
        ...
      ]
    }
  `;
    const result = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
    });
    try {
        const jsonStr = result.text.replace(/```json\n?|```/g, '').trim();
        return c.json(JSON.parse(jsonStr));
    }
    catch (error) {
        return c.json({ tasks: [] });
    }
}));
aiRoutes.post('/suggest-next-steps', catchAsync(async (c) => {
    const { notes, type, currentStage } = await c.req.json();
    const llm = new Llm({ provider: process.env.LLM_PROVIDER });
    const prompt = `
    Based on the following ${type} notes and the current deal stage "${currentStage}", suggest 2-3 strategic next steps to move the deal forward.
    Also suggest if the deal stage should be updated or win probability changed.
    
    Notes: "${notes}"
    
    Respond ONLY with a JSON object in this exact format:
    {
      "suggestions": ["suggestion 1", "suggestion 2"],
      "recommendedStage": "NewStageName or null",
      "recommendedProbability": number or null
    }
  `;
    const result = await llm.generateText({
        messages: [{ role: 'user', content: prompt }],
        model: process.env.LLM_MODEL
    });
    try {
        const jsonStr = result.text.replace(/```json\n?|```/g, '').trim();
        return c.json(JSON.parse(jsonStr));
    }
    catch (error) {
        return c.json({ suggestions: [], recommendedStage: null, recommendedProbability: null });
    }
}));
export default aiRoutes;
