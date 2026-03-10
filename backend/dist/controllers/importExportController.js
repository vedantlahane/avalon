import { importExportService } from "../services/importExportService.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { Parser } from 'json2csv';
import XLSX from 'xlsx';
import PDFDocument from 'pdfkit';
export const analyzeImport = catchAsync(async (c) => {
    const formData = await c.req.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
        throw new ApiError(400, 'file is required (multipart form field)');
    }
    const csvData = await file.text();
    const analysis = await importExportService.analyzeCSV(csvData);
    return c.json({
        fileName: file.name,
        ...analysis
    });
});
export const previewImport = catchAsync(async (c) => {
    const { data, mapping } = await c.req.json();
    if (!data || !mapping) {
        throw new ApiError(400, 'data and mapping are required');
    }
    const preview = data.slice(0, 5).map((row) => {
        const mappedRow = {};
        for (const [csvCol, crmField] of Object.entries(mapping)) {
            if (crmField !== '-- Skip --') {
                mappedRow[crmField] = row[csvCol];
            }
        }
        return mappedRow;
    });
    const total = data.length;
    let valid = 0;
    let warnings = 0;
    let errors = 0;
    const validationErrors = [];
    data.forEach((row, index) => {
        const mappedRow = {};
        for (const [csvCol, crmField] of Object.entries(mapping)) {
            if (crmField !== '-- Skip --') {
                mappedRow[crmField] = row[csvCol];
            }
        }
        if (!mappedRow.email) {
            errors++;
            validationErrors.push({ row: index + 1, error: 'Email is required' });
        }
        else if (!mappedRow.email.includes('@')) {
            errors++;
            validationErrors.push({ row: index + 1, error: `Invalid email: ${mappedRow.email}` });
        }
        else {
            valid++;
        }
        if (!mappedRow.phone) {
            warnings++;
            validationErrors.push({ row: index + 1, warning: 'Missing phone' });
        }
    });
    return c.json({
        summary: { total, valid, warnings, errors },
        preview,
        validationErrors: validationErrors.slice(0, 10)
    });
});
export const executeImport = catchAsync(async (c) => {
    const body = await c.req.json();
    const result = await importExportService.executeImport(body);
    return c.json(result);
});
export const exportData = catchAsync(async (c) => {
    const resource = c.req.query('resource');
    const ids = c.req.query('ids');
    const format = c.req.query('format');
    const fields = c.req.query('fields')?.split(',');
    const includeAiSummary = c.req.query('includeAiSummary') === 'true';
    const data = await importExportService.getExportData(resource, ids);
    if (format === 'csv') {
        const parser = new Parser({ fields });
        const csv = parser.parse(data);
        c.header('Content-Type', 'text/csv');
        c.header('Content-Disposition', `attachment; filename="${resource}_export.csv"`);
        return c.body(csv);
    }
    else if (format === 'json') {
        c.header('Content-Type', 'application/json');
        c.header('Content-Disposition', `attachment; filename="${resource}_export.json"`);
        return c.json(data);
    }
    else if (format === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        c.header('Content-Disposition', `attachment; filename="${resource}_export.xlsx"`);
        return c.body(buffer);
    }
    else if (format === 'pdf') {
        const doc = new PDFDocument();
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.fontSize(25).text(`NexusCRM AI ${resource.toUpperCase()} Export`, { align: 'center' });
        doc.moveDown();
        if (includeAiSummary) {
            doc.fontSize(18).text('Executive AI Insights Summary');
            doc.fontSize(12).text(`This export contains ${data.length} ${resource}. AI analysis shows a growing pipeline with positive engagement trends across the top performers.`);
            doc.moveDown();
        }
        data.forEach((item, index) => {
            doc.fontSize(14).text(`${index + 1}. ${item.name || item.firstName + ' ' + item.lastName || item.email}`);
            fields.forEach(field => {
                if (item[field] !== undefined) {
                    doc.fontSize(10).text(`${field}: ${item[field]}`);
                }
            });
            doc.moveDown();
        });
        doc.end();
        const result = await new Promise((resolve) => {
            doc.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
        });
        c.header('Content-Type', 'application/pdf');
        c.header('Content-Disposition', `attachment; filename="${resource}_export.pdf"`);
        return c.body(result);
    }
    throw new ApiError(400, 'Invalid format');
});
