export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  relatedArticles?: { id: string; title: string }[];
}

export const HELP_CATEGORIES = [
  {
    id: 'getting-started',
    title: '📖 GETTING STARTED',
    articles: [
      { id: 'quick-start', title: 'Quick start guide' },
      { id: 'adding-contact', title: 'Adding your first contact' },
      { id: 'creating-deal', title: 'Creating a deal' },
      { id: 'pipeline-setup', title: 'Setting up your pipeline' },
      { id: 'ai-features-intro', title: 'Understanding AI features' },
    ]
  },
  {
    id: 'contacts',
    title: '👤 CONTACTS',
    articles: [
      { id: 'managing-contacts', title: 'Managing contacts' },
      { id: 'ai-enrichment', title: 'AI enrichment' },
      { id: 'import-csv', title: 'Import contacts from CSV' },
      { id: 'lead-scoring-explained', title: 'Lead scoring explained' },
      { id: 'tags-segmentation', title: 'Tags and segmentation' },
    ]
  },
  {
    id: 'deals-pipeline',
    title: '💰 DEALS & PIPELINE',
    articles: [
      { id: 'pipeline-management', title: 'Pipeline management' },
      { id: 'deal-stages', title: 'Deal stages and probability' },
      { id: 'forecasting', title: 'Forecasting' },
      { id: 'kanban-vs-list', title: 'Kanban vs List view' },
      { id: 'ai-deal-insights', title: 'AI deal insights' },
    ]
  },
  {
    id: 'ai-features',
    title: '🤖 AI FEATURES',
    articles: [
      { id: 'ai-assistant-guide', title: 'AI Assistant guide' },
      { id: 'ai-email-writing', title: 'AI email writing' },
      { id: 'ai-lead-scoring', title: 'AI lead scoring' },
      { id: 'ai-deal-predictions', title: 'AI deal predictions' },
      { id: 'ai-task-suggestions', title: 'AI task suggestions' },
      { id: 'ai-sentiment-analysis', title: 'AI sentiment analysis' },
    ]
  },
  {
    id: 'communication',
    title: '📧 COMMUNICATION',
    articles: [
      { id: 'email-integration', title: 'Email integration' },
      { id: 'email-templates', title: 'Email templates' },
      { id: 'tracking-opens', title: 'Tracking opens & clicks' },
      { id: 'sentiment-tracking', title: 'Sentiment tracking' },
    ]
  },
  {
    id: 'automations',
    title: '⚡ AUTOMATIONS',
    articles: [
      { id: 'creating-automations', title: 'Creating automations' },
      { id: 'triggers-conditions', title: 'Triggers and conditions' },
      { id: 'action-types', title: 'Action types' },
      { id: 'automation-best-practices', title: 'Best practices' },
    ]
  },
  {
    id: 'shortcuts',
    title: '⌨️ KEYBOARD SHORTCUTS',
    articles: [
      { id: 'shortcut-reference', title: 'Full shortcut reference' },
      { id: 'customizing-shortcuts', title: 'Customizing shortcuts' },
    ]
  }
];

export const HELP_ARTICLES: Record<string, HelpArticle> = {
  'lead-scoring-explained': {
    id: 'lead-scoring-explained',
    title: 'AI Lead Scoring Explained',
    category: 'CONTACTS',
    content: `
      Lead scoring helps you prioritize which contacts to focus on. Our AI automatically scores leads based on two categories:

      ### 1. Demographic Fit (40%)
      How well the contact matches your ideal customer profile based on their job title, company size, industry, and location.

      ### 2. Behavioral Signals (60%)
      How engaged the contact is based on email opens, meeting attendance, response times, and recency.

      [Diagram showing score breakdown]

      ### Score Categories:
      🔥 **90-100: Hot Lead** - Immediate action needed
      🌡️ **70-89: Warm Lead** - High priority follow-up
      😐 **50-69: Cool Lead** - Nurture required
      ❄️ **25-49: Cold Lead** - Low priority
      ⛔ **0-24: Unqualified** - Consider archiving

      💡 **Pro Tip:** You can customize scoring weights in Settings → AI Configuration.
    `,
    relatedArticles: [
      { id: 'managing-contacts', title: 'Managing contacts' },
      { id: 'ai-enrichment', title: 'AI enrichment' },
      { id: 'tags-segmentation', title: 'Contact segmentation' }
    ]
  }
};
