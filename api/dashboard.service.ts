import prisma from "./prisma.ts";
import {
    type Invoice,
    findRecentInvoice,
    findOverdueInvoices
} from "./invoice.service.ts";

import type { InvoiceStatus } from "./invoice.schema.ts";

interface Dashboard {
    totals: {
        paid: number;
        pending: number;
        invoiceCount: number;
        customerCount: number;
    };
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
}

async function sumAmountByStatus(status: InvoiceStatus): Promise<number> {
    const sum = await prisma.invoice.aggregate({
        where: { status },
        _sum: { amount: true }
    });

    return !sum._sum.amount ? 0 : sum._sum.amount;
}

interface DashboardTotals {
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;
}



export async function findDashboard() {
    const paid = await sumAmountByStatus('paid');
    const pending = await sumAmountByStatus('pending');
    const invoiceCount = await prisma.invoice.count;
    const customerCount = await prisma.customer.count;
    const recentInvoices = await findRecentInvoice();
    const overdueInvoices = await findOverdueInvoices();

    return {
        totals: {
            paid,
            pending,
            invoiceCount,
            customerCount
        },
        recentInvoices,
        overdueInvoices
    }
}