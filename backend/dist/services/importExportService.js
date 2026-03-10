import prisma from "../client.js";
export const importExportService = {
    analyzeCSV: async (csvData) => {
        // Basic analysis: get headers and some sample rows
        const lines = csvData.split('\n');
        if (lines.length === 0)
            throw new Error('Empty CSV');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const rowCount = lines.length - 1;
        // Suggested mapping based on common names
        const suggestedMapping = {};
        const fieldMap = {
            firstName: ['first name', 'fname', 'first_name', 'given name'],
            lastName: ['last name', 'lname', 'last_name', 'surname'],
            email: ['email', 'email address', 'email_address', 'mail'],
            phone: ['phone', 'phone number', 'phone_num', 'mobile', 'tel'],
            jobTitle: ['job title', 'title', 'job_title', 'position'],
            company: ['company', 'company name', 'company_name', 'organization'],
            leadSource: ['lead source', 'source', 'lead_src'],
            city: ['city', 'location', 'address'],
        };
        headers.forEach(header => {
            const lowerHeader = header.toLowerCase();
            for (const [field, variations] of Object.entries(fieldMap)) {
                if (variations.some(v => lowerHeader.includes(v))) {
                    suggestedMapping[header] = field;
                    break;
                }
            }
        });
        return {
            rowCount,
            columns: headers,
            suggestedMapping
        };
    },
    executeImport: async (importData) => {
        const { data, mapping, duplicateHandling } = importData;
        let created = 0;
        let updated = 0;
        let skipped = 0;
        let failed = 0;
        for (const row of data) {
            try {
                const mappedRow = {};
                for (const [csvCol, crmField] of Object.entries(mapping)) {
                    if (crmField !== '-- Skip --' && row[csvCol] !== undefined) {
                        mappedRow[crmField] = row[csvCol];
                    }
                }
                if (!mappedRow.email) {
                    failed++;
                    continue;
                }
                const existingContact = await prisma.contact.findUnique({
                    where: { email: mappedRow.email, isDeleted: false }
                });
                if (existingContact) {
                    if (duplicateHandling === 'skip') {
                        skipped++;
                        continue;
                    }
                    else if (duplicateHandling === 'update') {
                        await prisma.contact.update({
                            where: { id: existingContact.id },
                            data: {
                                ...mappedRow,
                                updatedAt: new Date()
                            }
                        });
                        updated++;
                    }
                    else {
                        // Create duplicate - email must be unique in schema, so we might need to handle this
                        // If schema says unique, we can't create duplicate with same email
                        // For now, let's treat it as update if unique constraint exists
                        await prisma.contact.update({
                            where: { id: existingContact.id },
                            data: {
                                ...mappedRow,
                                updatedAt: new Date()
                            }
                        });
                        updated++;
                    }
                }
                else {
                    // Find company if exists
                    let companyId = undefined;
                    if (mappedRow.company) {
                        const company = await prisma.company.findFirst({
                            where: { name: mappedRow.company, isDeleted: false }
                        });
                        if (company) {
                            companyId = company.id;
                        }
                        else {
                            const newCompany = await prisma.company.create({
                                data: { name: mappedRow.company }
                            });
                            companyId = newCompany.id;
                        }
                    }
                    const { company, ...contactData } = mappedRow;
                    await prisma.contact.create({
                        data: {
                            ...contactData,
                            companyId
                        }
                    });
                    created++;
                }
            }
            catch (error) {
                console.error('Row import failed:', error);
                failed++;
            }
        }
        return { created, updated, skipped, failed };
    },
    getExportData: async (resource, ids) => {
        let data = [];
        if (resource === 'contacts') {
            const where = { isDeleted: false };
            if (ids !== 'all') {
                where.id = { in: ids.split(',').map(Number) };
            }
            data = await prisma.contact.findMany({
                where,
                include: { company: true }
            });
        }
        else if (resource === 'deals') {
            const where = { isDeleted: false };
            if (ids !== 'all') {
                where.id = { in: ids.split(',').map(Number) };
            }
            data = await prisma.deal.findMany({
                where,
                include: { contact: true, company: true }
            });
        }
        else if (resource === 'companies') {
            const where = { isDeleted: false };
            if (ids !== 'all') {
                where.id = { in: ids.split(',').map(Number) };
            }
            data = await prisma.company.findMany({
                where
            });
        }
        return data;
    }
};
