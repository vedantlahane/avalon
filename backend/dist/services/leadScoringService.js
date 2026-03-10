import prisma from '../client.js';
export const leadScoringService = {
    calculateScore: async (contactId) => {
        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
            include: {
                company: true,
                emails: { where: { isDeleted: false } },
                activities: { where: { isDeleted: false } },
                tasks: { where: { isDeleted: false } }
            }
        });
        if (!contact)
            return null;
        let demographicPoints = 0;
        let behavioralPoints = 0;
        let negativePoints = 0;
        const breakdown = {
            demographic: {
                jobTitle: 0,
                companySize: 0,
                industry: 0,
                location: 0
            },
            behavioral: {
                emailEngagement: 0,
                meetingAttendance: 0,
                responseTime: 0,
                recency: 0
            },
            negative: 0
        };
        // --- DEMOGRAPHIC SCORING (40% weight, Max 50 raw points scaled to 40) ---
        // Job Title (Max 20)
        const title = contact.jobTitle?.toLowerCase() || '';
        if (title.includes('ceo') || title.includes('cto') || title.includes('founder'))
            breakdown.demographic.jobTitle = 20;
        else if (title.includes('vp'))
            breakdown.demographic.jobTitle = 18;
        else if (title.includes('director'))
            breakdown.demographic.jobTitle = 15;
        else if (title.includes('manager'))
            breakdown.demographic.jobTitle = 10;
        else
            breakdown.demographic.jobTitle = 5;
        demographicPoints += breakdown.demographic.jobTitle;
        // Company Size (Max 15)
        const size = contact.company?.size || '';
        if (size === '1000+')
            breakdown.demographic.companySize = 15;
        else if (size === '501-1000')
            breakdown.demographic.companySize = 13;
        else if (size === '201-500')
            breakdown.demographic.companySize = 10;
        else if (size === '51-200')
            breakdown.demographic.companySize = 8;
        else if (size === '11-50')
            breakdown.demographic.companySize = 5;
        else if (size === '1-10')
            breakdown.demographic.companySize = 3;
        else
            breakdown.demographic.companySize = 0;
        demographicPoints += breakdown.demographic.companySize;
        // Industry Match (Max 10)
        const industry = contact.company?.industry || '';
        if (industry === 'Technology')
            breakdown.demographic.industry = 10;
        else if (industry === 'Finance')
            breakdown.demographic.industry = 9;
        else if (industry === 'Healthcare')
            breakdown.demographic.industry = 8;
        else
            breakdown.demographic.industry = 5;
        demographicPoints += breakdown.demographic.industry;
        // Location (Max 5)
        const location = (contact.address || '').toLowerCase();
        if (location.includes('target market') || location.includes('usa') || location.includes('san francisco'))
            breakdown.demographic.location = 5;
        else if (location.includes('secondary market') || location.includes('london') || location.includes('europe'))
            breakdown.demographic.location = 3;
        else
            breakdown.demographic.location = 1;
        demographicPoints += breakdown.demographic.location;
        const demographicScore = Math.round((demographicPoints / 50) * 40);
        // --- BEHAVIORAL SCORING (60% weight, Max 80 raw points scaled to 60) ---
        // Email Engagement (Max 25)
        const emailsOpened = contact.emails.filter(e => e.isRead).length;
        if (emailsOpened >= 3)
            breakdown.behavioral.emailEngagement = 25;
        else if (emailsOpened >= 1)
            breakdown.behavioral.emailEngagement = 15;
        else
            breakdown.behavioral.emailEngagement = 0;
        // Replied to email? (+10)
        const replies = contact.emails.filter(e => e.sender === contact.email).length;
        if (replies > 0)
            breakdown.behavioral.emailEngagement += 10;
        if (breakdown.behavioral.emailEngagement > 25)
            breakdown.behavioral.emailEngagement = 25;
        behavioralPoints += breakdown.behavioral.emailEngagement;
        // Meeting Attendance (Max 25)
        const demos = contact.activities.filter(a => a.type === 'Demo' && a.outcome === 'Completed').length;
        const meetings = contact.activities.filter(a => a.type === 'Meeting' && a.outcome === 'Completed').length;
        const scheduled = contact.activities.filter(a => (a.type === 'Meeting' || a.type === 'Demo') && a.outcome === 'Pending').length;
        if (demos > 0)
            breakdown.behavioral.meetingAttendance = 25;
        else if (meetings > 0)
            breakdown.behavioral.meetingAttendance = 20;
        else if (scheduled > 0)
            breakdown.behavioral.meetingAttendance = 15;
        else
            breakdown.behavioral.meetingAttendance = 0;
        behavioralPoints += breakdown.behavioral.meetingAttendance;
        // Response Time (Max 15)
        // Simulated response time logic
        breakdown.behavioral.responseTime = 10;
        behavioralPoints += breakdown.behavioral.responseTime;
        // Recency (Max 15)
        const lastActivityDate = contact.activities.length > 0
            ? new Date(Math.max(...contact.activities.map(a => new Date(a.date).getTime())))
            : new Date(contact.createdAt);
        const daysSinceLastActivity = Math.floor((new Date().getTime() - lastActivityDate.getTime()) / (1000 * 3600 * 24));
        if (daysSinceLastActivity === 0)
            breakdown.behavioral.recency = 15;
        else if (daysSinceLastActivity <= 7)
            breakdown.behavioral.recency = 12;
        else if (daysSinceLastActivity <= 30)
            breakdown.behavioral.recency = 8;
        else
            breakdown.behavioral.recency = 0;
        // Decay: -2 per week of inactivity
        const weeksInactive = Math.floor(daysSinceLastActivity / 7);
        if (weeksInactive > 0) {
            breakdown.behavioral.recency -= (weeksInactive * 2);
            if (breakdown.behavioral.recency < 0)
                breakdown.behavioral.recency = 0;
        }
        behavioralPoints += breakdown.behavioral.recency;
        const behavioralScore = Math.round((behavioralPoints / 80) * 60);
        // --- NEGATIVE SCORING ---
        if (contact.tags.includes('Competitor'))
            negativePoints += 50;
        if (contact.leadStatus === 'Unqualified' || contact.tags.includes('Not Interested'))
            negativePoints += 25;
        if (contact.tags.includes('Bounced'))
            negativePoints += 10;
        if (contact.tags.includes('Unsubscribed'))
            negativePoints += 15;
        breakdown.negative = negativePoints;
        const totalScore = Math.max(0, Math.min(100, demographicScore + behavioralScore - negativePoints));
        let category = 'Cold Lead';
        if (totalScore >= 90)
            category = 'Hot Lead';
        else if (totalScore >= 70)
            category = 'Warm Lead';
        else if (totalScore >= 50)
            category = 'Cool Lead';
        else if (totalScore >= 25)
            category = 'Cold Lead';
        else
            category = 'Unqualified';
        const oldScore = contact.leadScore;
        const scoreTrend = totalScore - oldScore;
        const aiNote = leadScoringService.generateAiNote(totalScore, breakdown, contact);
        // Update contact
        await prisma.contact.update({
            where: { id: contactId },
            data: {
                leadScore: totalScore,
                leadCategory: category,
                demographicScore,
                behavioralScore,
                scoreBreakdown: breakdown,
                scoreTrend,
                aiNote
            }
        });
        // Create history record if score changed significantly
        if (scoreTrend !== 0) {
            await prisma.leadScoreHistory.create({
                data: {
                    contactId,
                    score: totalScore,
                    change: scoreTrend,
                    reason: leadScoringService.getReasonFromBreakdown(breakdown, contact, scoreTrend)
                }
            });
        }
        return {
            id: contactId,
            leadScore: totalScore,
            leadCategory: category,
            demographicScore,
            behavioralScore,
            scoreBreakdown: breakdown,
            scoreTrend,
            aiNote
        };
    },
    generateAiNote: (score, breakdown, contact) => {
        if (score >= 90)
            return `Highly engaged decision maker from a top-tier industry. Immediate follow-up recommended.`;
        if (score >= 70) {
            if (breakdown.behavioral.meetingAttendance >= 20) {
                return `Score increased after attending demo. Recommend sending proposal within 48 hours to maintain momentum.`;
            }
            return `Warm lead with good engagement. High priority follow-up.`;
        }
        if (score >= 50)
            return `Showing steady interest. Continue nurturing with relevant content.`;
        if (score < 25)
            return `Lead is currently unqualified or has low engagement. Consider archiving.`;
        return `Lead is currently cooling off. Consider a re-engagement campaign.`;
    },
    getReasonFromBreakdown: (breakdown, contact, trend) => {
        if (trend > 0) {
            if (breakdown.behavioral.meetingAttendance >= 15)
                return "Attended demo/meeting";
            if (breakdown.behavioral.emailEngagement >= 15)
                return "Increased email engagement";
            return "Demographic match update";
        }
        else {
            return "Inactivity decay";
        }
    },
    getScoreHistory: async (contactId) => {
        return await prisma.leadScoreHistory.findMany({
            where: { contactId, isDeleted: false },
            orderBy: { timestamp: 'desc' },
            take: 20
        });
    }
};
