import { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "42113c8f-b26e-4cce-b179-94074aa9c13a",
    "name": "NexusCRM AI Assistant",
    "description": "An expert sales strategist and data analyst to help manage customer relationships effectively through intelligent automation and insights.",
    "triggerEvents": [
      {
        "name": "new_lead_captured",
        "description": "When a new contact or lead is added to the CRM, the agent should analyze their profile and provide a suggested personalized outreach script.",
        "type": "sync",
        "outputSchema": z.object({
          suggestedScript: z.string(),
          recommendedNextSteps: z.array(z.string())
        })
      },
      {
        "name": "deal_stagnation_alert",
        "description": "When a deal remains in the same pipeline stage for more than 5 days, the agent should notify the user with a risk assessment and a recommended action plan.",
        "type": "async"
      },
      {
        "name": "incoming_email_analysis",
        "description": "When a new email is received in the Inbox, the agent should automatically summarize the content and update the contact's sentiment score.",
        "type": "sync",
        "outputSchema": z.object({
          summary: z.string(),
          sentimentScore: z.number(),
          suggestedReply: z.string().optional()
        })
      }
    ],
    "config": {
      "appId": "ef04fa57-cee3-405b-a276-3e72ac58856d",
      "accountId": "5752152f-1152-4b8e-a896-2f158abc1bb2",
      "widgetKey": "MTBSjTXKrB2c3NBxHFGR5YpDN1HhH8OEuky9mxmt"
    }
  }
];