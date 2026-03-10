import prisma from '../client.js';
import ApiError from '../utils/ApiError.js';

export const automationService = {
  getAutomations: async () => {
    return await prisma.automation.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  },

  getAutomationById: async (id: number) => {
    const automation = await prisma.automation.findUnique({
      where: { id, isDeleted: false },
    });
    if (!automation) {
      throw new ApiError(404, 'Automation not found');
    }
    return automation;
  },

  createAutomation: async (data: any) => {
    return await prisma.automation.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status || 'Active',
        trigger: data.trigger,
        conditions: data.conditions || [],
        actions: data.actions || [],
      },
    });
  },

  updateAutomation: async (id: number, data: any) => {
    return await prisma.automation.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
        trigger: data.trigger,
        conditions: data.conditions,
        actions: data.actions,
      },
    });
  },

  deleteAutomation: async (id: number) => {
    return await prisma.automation.update({
      where: { id },
      data: { isDeleted: true },
    });
  },

  getAutomationLogs: async (automationId: number) => {
    return await prisma.automationLog.findMany({
      where: { automationId, isDeleted: false },
      orderBy: { timestamp: 'desc' },
    });
  },

  toggleAutomation: async (id: number) => {
    const automation = await prisma.automation.findUnique({
      where: { id },
    });
    if (!automation) {
      throw new ApiError(404, 'Automation not found');
    }
    return await prisma.automation.update({
      where: { id },
      data: {
        status: automation.status === 'Active' ? 'Paused' : 'Active',
      },
    });
  },

  testAutomation: async (id: number, sampleData: any) => {
    // In a real app, this would trigger the automation logic with sample data
    // For now, we just log a successful test run
    return await prisma.automationLog.create({
      data: {
        automationId: id,
        status: 'Success',
        message: 'Manual test triggered successfully',
        details: { sampleData, testRun: true },
      },
    });
  },
};
