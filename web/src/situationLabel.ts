import type { InvoiceSituation } from './invoiceType';

export default function situationLabel(situation: InvoiceSituation) {
    switch (situation) {
        case 'paid': return 'pago';
        case 'pending': return 'pendente';
        case 'overdue': return 'atrasada';
    }
}
