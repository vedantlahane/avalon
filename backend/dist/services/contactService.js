import prisma from '../client.js';
export const contactService = {
    getContacts: async () => {
        return await prisma.contact.findMany({
            where: { isDeleted: false },
            include: {
                company: true
            }
        });
    },
    getContactById: async (id) => {
        return await prisma.contact.findFirst({
            where: { id, isDeleted: false },
            include: {
                company: true,
                activities: { where: { isDeleted: false } },
                tasks: { where: { isDeleted: false } },
                deals: { where: { isDeleted: false } }
            }
        });
    },
    createContact: async (data) => {
        return await prisma.contact.create({
            data
        });
    },
    updateContact: async (id, data) => {
        return await prisma.contact.update({
            where: { id },
            data
        });
    },
    deleteContact: async (id) => {
        return await prisma.contact.update({
            where: { id },
            data: { isDeleted: true }
        });
    },
    enrichContact: async (email) => {
        // Simulate AI Enrichment with 2-second delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        const domain = email.split('@')[1] || 'example.com';
        const companyName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1) + ' Technologies';
        // Check if company exists
        let company = await prisma.company.findFirst({
            where: {
                domain: {
                    contains: domain
                }
            }
        });
        if (!company) {
            // Simulate company discovery
            company = {
                name: companyName,
                domain: domain,
                industry: 'Technology',
                size: '201-500',
                description: `${companyName} is a leading provider of innovative solutions in the ${domain} space.`
            };
        }
        return {
            firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            lastName: 'Smith',
            jobTitle: 'VP of Engineering',
            phone: '+1 (555) 234-5678',
            linkedinUrl: `https://linkedin.com/in/${email.split('@')[0]}`,
            location: 'San Francisco, CA',
            companyName: company?.name,
            companyDomain: company?.domain,
            companyIndustry: company?.industry,
            companySize: company?.size,
            companyDescription: company?.description,
            suggestedLeadScore: 72,
            suggestedTags: ['Decision Maker', 'Technical', 'Enterprise'],
            recentNews: 'Recently raised $50M in Series C funding led by Sequoia.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Salesforce']
        };
    },
    bulkEnrichContacts: async (contactIds) => {
        // Bulk enrichment simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        for (const id of contactIds) {
            const contact = await prisma.contact.findUnique({ where: { id } });
            if (contact && contact.email) {
                const enriched = await contactService.enrichContact(contact.email);
                await prisma.contact.update({
                    where: { id },
                    data: {
                        jobTitle: enriched.jobTitle,
                        phone: enriched.phone,
                        linkedinUrl: enriched.linkedinUrl,
                        leadScore: enriched.suggestedLeadScore,
                        tags: {
                            set: [...new Set([...(contact.tags || []), ...enriched.suggestedTags])]
                        }
                    }
                });
            }
        }
    }
};
