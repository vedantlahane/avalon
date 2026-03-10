// No prisma import needed for now as we use simulated data for the prototype
export const reportService = {
    getSalesPerformance: async () => {
        // In a real app, this would involve complex aggregations.
        // We'll simulate data based on existing DB content where possible, or use reasonable defaults.
        // Revenue Over Time (Last 12 months)
        const revenueOverTime = [
            { month: 'Apr 25', actual: 320000, lastYear: 280000, predicted: null },
            { month: 'May 25', actual: 350000, lastYear: 310000, predicted: null },
            { month: 'Jun 25', actual: 380000, lastYear: 330000, predicted: null },
            { month: 'Jul 25', actual: 420000, lastYear: 360000, predicted: null },
            { month: 'Aug 25', actual: 450000, lastYear: 390000, predicted: null },
            { month: 'Sep 25', actual: 480000, lastYear: 410000, predicted: null },
            { month: 'Oct 25', actual: 510000, lastYear: 440000, predicted: null },
            { month: 'Nov 25', actual: 550000, lastYear: 470000, predicted: null },
            { month: 'Dec 25', actual: 610000, lastYear: 520000, predicted: null },
            { month: 'Jan 26', actual: 580000, lastYear: 510000, predicted: null },
            { month: 'Feb 26', actual: 640000, lastYear: 550000, predicted: null },
            { month: 'Mar 26', actual: 680000, lastYear: 590000, predicted: 680000 },
            { month: 'Apr 26', actual: null, lastYear: 620000, predicted: 720000 },
            { month: 'May 26', actual: null, lastYear: 650000, predicted: 760000 },
            { month: 'Jun 26', actual: null, lastYear: 690000, predicted: 810000 },
        ];
        const lossReasons = [
            { name: 'Budget', value: 30 },
            { name: 'Competitor', value: 25 },
            { name: 'Timing', value: 20 },
            { name: 'No decision', value: 15 },
            { name: 'Other', value: 10 },
        ];
        return {
            revenueOverTime,
            winLossAnalysis: {
                won: { count: 8, totalValue: 645000, avgSize: 80625, avgCycle: 42 },
                lost: { count: 10, totalValue: 820000, topReason: 'Budget' },
                lossReasons
            },
            salesVelocity: {
                current: 2450,
                previous: 2180,
                components: {
                    activeDeals: 25,
                    avgValue: 85000,
                    winRate: 0.45,
                    salesCycle: 38
                },
                aiRecommendation: "To increase velocity by 20%, focus on reducing sales cycle. Your Discovery → Proposal transition takes 12 days vs 7-day benchmark."
            }
        };
    },
    getPipelineAnalysis: async () => {
        const funnel = [
            { value: 100, name: 'Lead', label: '100%', count: 100, stageValue: 1200000 },
            { value: 65, name: 'Qualified', label: '65%', count: 65, stageValue: 845000 },
            { value: 40, name: 'Discovery', label: '62%', count: 40, stageValue: 620000 },
            { value: 25, name: 'Proposal', label: '63%', count: 25, stageValue: 480000 },
            { value: 15, name: 'Negotiation', label: '60%', count: 15, stageValue: 320000 },
            { value: 8, name: 'Won', label: '53%', count: 8, stageValue: 210000 },
        ];
        const stageDuration = [
            { stage: 'Lead', days: 4, benchmark: 3 },
            { stage: 'Qualified', days: 12, benchmark: 8 },
            { stage: 'Discovery', days: 15, benchmark: 10 },
            { stage: 'Proposal', days: 10, benchmark: 7 },
            { stage: 'Negotiation', days: 7, benchmark: 5 },
        ];
        return {
            funnel,
            stageDuration,
            pipelineCoverage: {
                ratio: 2.4,
                historical: [
                    { m: 'Oct', v: 2.1 },
                    { m: 'Nov', v: 2.3 },
                    { m: 'Dec', v: 2.8 },
                    { m: 'Jan', v: 2.5 },
                    { m: 'Feb', v: 2.2 },
                    { m: 'Mar', v: 2.4 },
                ]
            }
        };
    },
    getActivityReports: async () => {
        return {
            activityVolume: [
                { week: 'W1', Emails: 45, Calls: 20, Meetings: 8, Demos: 4, Notes: 15 },
                { week: 'W2', Emails: 52, Calls: 25, Meetings: 12, Demos: 6, Notes: 18 },
                { week: 'W3', Emails: 38, Calls: 18, Meetings: 10, Demos: 5, Notes: 12 },
                { week: 'W4', Emails: 65, Calls: 32, Meetings: 15, Demos: 8, Notes: 25 },
            ],
            responseTime: {
                average: 15.5,
                bySource: [
                    { source: 'Website', time: 5, winRate: 65 },
                    { source: 'LinkedIn', time: 15, winRate: 42 },
                    { source: 'Referral', time: 30, winRate: 38 },
                    { source: 'Cold Outreach', time: 120, winRate: 22 },
                    { source: 'Events', time: 240, winRate: 15 },
                ],
                aiInsight: "Leads contacted within 5 minutes have 3x higher conversion rate than those contacted after 30 minutes."
            },
            communicationEffectiveness: {
                metrics: { openRate: 0.68, clickRate: 0.24, replyRate: 0.18 },
                bestTemplates: [
                    { name: 'Post-Demo Follow Up', rate: '72%' },
                    { name: 'Enterprise Proposal', rate: '68%' },
                    { name: 'Quick Intro', rate: '45%' },
                ],
                bestTime: 'Tuesday 10:15 AM',
                aiImprovements: "Personalize the first sentence based on the contact's recent LinkedIn activity to increase open rates by 15%."
            }
        };
    },
    getContactAnalytics: async () => {
        return {
            leadSourcePerformance: [
                { name: 'LinkedIn', value: 45, revenue: 180000, rate: 12 },
                { name: 'Website', value: 35, revenue: 240000, rate: 18 },
                { name: 'Referral', value: 25, revenue: 320000, rate: 25 },
                { name: 'Event', value: 20, revenue: 150000, rate: 10 },
                { name: 'Cold Outreach', value: 15, revenue: 90000, rate: 8 },
            ],
            leadScoreDistribution: [
                { name: 'Week 1', hot: 20, warm: 30, cool: 35, cold: 15 },
                { name: 'Week 2', hot: 25, warm: 35, cool: 25, cold: 15 },
                { name: 'Week 3', hot: 30, warm: 40, cool: 20, cold: 10 },
                { name: 'Week 4', hot: 35, warm: 45, cool: 15, cold: 5 },
            ]
        };
    },
    getAiInsights: async () => {
        return {
            lastAnalyzed: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
            executiveSummary: {
                title: "Weekly Executive Summary (Mar 1-6, 2026)",
                content: "Your CRM is in good health overall. Pipeline grew 12% this week to $1.24M. However, 3 deals need immediate attention due to stalling activity. Your email engagement rates are strong at 68% open rate. Lead quality improved with 4 new hot leads entering the funnel from the website channel.\n\nKey recommendation: Focus this week on advancing the Quantum Finance deal - it's your largest at-risk deal worth $80K. A personal call to Sarah Chen could prevent potential loss.",
                confidence: 85,
                dataPointsCount: 47
            },
            actionItems: [
                {
                    id: 1,
                    priority: "High",
                    priorityLabel: "🔴 #1",
                    action: "Call Sarah Chen at Quantum Finance",
                    description: "Call Sarah Chen at Quantum Finance to address pricing concerns and prevent deal loss ($80K at risk)",
                    impact: "High",
                    effort: "Low",
                    status: "Pending",
                    type: "Call",
                    contactId: 101,
                    dealId: 201
                },
                {
                    id: 2,
                    priority: "High",
                    priorityLabel: "🟠 #2",
                    action: "Send proposal follow-up to John Smith at Acme",
                    description: "Send proposal follow-up to John Smith at Acme (7 days since last contact, $120K deal approaching close date)",
                    impact: "High",
                    effort: "Med",
                    status: "Pending",
                    type: "Email",
                    contactId: 102,
                    dealId: 202
                },
                {
                    id: 3,
                    priority: "Medium",
                    priorityLabel: "🟡 #3",
                    action: "Prepare for CloudNine demo",
                    description: "Prepare for CloudNine demo tomorrow at 3PM. Based on their profile, focus on integration capabilities",
                    impact: "Med",
                    effort: "Med",
                    status: "Pending",
                    type: "Meeting",
                    dealId: 203
                },
                {
                    id: 4,
                    priority: "Medium",
                    priorityLabel: "🟢 #4",
                    action: "Enrich 5 new website leads",
                    description: "Enrich 5 new website leads that came in this week. AI can auto-enrich all 5.",
                    impact: "Med",
                    effort: "Low",
                    status: "Pending",
                    type: "Enrichment"
                },
                {
                    id: 5,
                    priority: "Low",
                    priorityLabel: "🟢 #5",
                    action: "Update CRM notes from last week",
                    description: "Update CRM notes from last week's 3 calls (notes are missing/incomplete)",
                    impact: "Low",
                    effort: "Low",
                    status: "Pending",
                    type: "Log"
                }
            ],
            dealsAtRisk: [
                {
                    id: 201,
                    name: "Quantum Finance - Premium Package",
                    value: 80000,
                    riskScore: 82,
                    riskLevel: "HIGH",
                    riskFactors: [
                        "Negative email sentiment detected",
                        "Competitor mentioned (\"CompetitorX\")",
                        "Decision-maker not engaged yet",
                        "5 days since last meaningful contact"
                    ],
                    daysToClose: 12,
                    probabilityChange: { from: 68, to: 45 },
                    suggested: "Immediate personal call + discount offer + executive sponsor introduction"
                },
                {
                    id: 202,
                    name: "Beta Inc - Growth Plan",
                    value: 55000,
                    riskScore: 58,
                    riskLevel: "MODERATE",
                    riskFactors: [
                        "Proposal sent 14 days ago, no response",
                        "Contact went silent after initial interest"
                    ],
                    probabilityChange: { from: 55, to: 38 },
                    suggested: "Re-engagement email with new case study from their industry"
                },
                {
                    id: 203,
                    name: "EduVerse - Starter Plan",
                    value: 25000,
                    riskScore: 42,
                    riskLevel: "LOW-MODERATE",
                    riskFactors: [
                        "Small deal showing low engagement",
                        "Budget decision pushed to next quarter"
                    ],
                    suggested: "Move to nurture sequence"
                }
            ],
            opportunities: [
                {
                    type: "Upsell",
                    title: "Upsell Opportunity: BrightPath Health",
                    description: "BrightPath has been using the Basic plan for 6 months with 95% utilization. Based on their growth (hired 20 people last quarter), they likely need the Enterprise plan (+$40K ARR)",
                    actions: ["Create Upsell Deal", "Draft Outreach"]
                },
                {
                    type: "Expansion",
                    title: "Expansion: Acme Technologies",
                    description: "3 departments at Acme are using the product. Contact in Marketing dept (Lisa Park) recently visited pricing page 4 times (simulated). Cross-sell opportunity: Marketing module",
                    actions: ["View Contact", "Create Deal"]
                },
                {
                    type: "Referral",
                    title: "Referral Potential: GreenLeaf Energy",
                    description: "GreenLeaf had highest satisfaction score (NPS 9/10). Similar companies: SolarTech, WindPower Inc. Ask for referral introduction.",
                    actions: ["Draft Referral Request Email"]
                },
                {
                    type: "Timing",
                    title: "Timing Alert: RetailMax Inc",
                    description: "RetailMax's fiscal year ends March 31. Companies in retail typically have budget to spend before year-end. Reach out now.",
                    actions: ["Create Deal", "Draft Outreach"]
                }
            ],
            performanceCoaching: {
                strengths: [
                    "Email open rate (68%) is 15% above average",
                    "Demo-to-Proposal conversion (75%) is strong",
                    "Average response time (4hrs) is improving"
                ],
                improvements: [
                    "Proposal-to-Close rate (40%) is below industry average (55%). Consider: Adding ROI calculations to proposals, Following up within 48hrs of sending, Including customer testimonials",
                    "Only 3 calls logged this week vs your target of 10. Call activity is the #1 predictor of deal closure in your data."
                ],
                tip: "Your best-performing deals all had one thing in common: multi-threading (engaging 3+ contacts at the target company). Currently, 60% of your active deals only have 1 contact. Add more stakeholders to increase win probability by 35%."
            },
            competitorIntelligence: {
                mentions: [
                    { name: "CompetitorX", count: 3, details: [
                            { contact: "Sarah Chen", quote: "We're also evaluating CompetitorX's pricing" },
                            { contact: "John Smith", quote: "CompetitorX offered 20% less" },
                            { note: "Internal note: \"Acme comparing features\"" }
                        ] },
                    { name: "CompetitorY", count: 1, details: [
                            { contact: "Mike Ross", quote: "Previously used CompetitorY" }
                        ] }
                ],
                analysis: "CompetitorX is your primary threat this month. They're competing on price. Counter-strategy: Emphasize superior integration capabilities and customer support SLA. Send battlecard to affected deal owners.",
                strategy: "Focus on superior integration and customer support."
            }
        };
    }
};
