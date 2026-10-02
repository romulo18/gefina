import type { InvoiceStatus } from './invoiceType';

export default function statusLabel(status: InvoiceStatus) {
    return status === 'paid' ? 'Pago' : 'Pendente';
}
