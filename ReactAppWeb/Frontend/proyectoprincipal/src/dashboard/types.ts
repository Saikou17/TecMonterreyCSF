import { Identifier, RaRecord } from 'react-admin';

export interface Deal extends RaRecord {
    name: string;
    company_id: Identifier;
    contact_ids: Identifier[];
    type: string;
    stage: string;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
    start_at: string;
    sales_id: Identifier;
    index: number;
    nb_notes: number;
}
