import { Deal } from '../dashboard/types';

export const stages = [
    'resuelto',
    'por resolver',
];

export const stageNames = {
    resuelto: 'Resuelto',
    por_resolver: 'Por resolver',
};

export const stageChoices = stages.map(type => ({
    id: type,
    /* @ts-ignore */
    name: stageNames[type],
}));

export type DealsByStage = Record<Deal['stage'], Deal[]>;

export const getDealsByStage = (unorderedDeals: Deal[]) => {
    const dealsByStage: Record<Deal['stage'], Deal[]> = unorderedDeals.reduce(
        (acc, deal) => {
            acc[deal.stage].push(deal);
            return acc;
        },
        stages.reduce(
            (obj, stage) => ({ ...obj, [stage]: [] }),
            {} as Record<Deal['stage'], Deal[]>
        )
    );
    // order each column by index
    stages.forEach(stage => {
        dealsByStage[stage] = dealsByStage[stage].sort(
            (recordA: Deal, recordB: Deal) => recordA.index - recordB.index
        );
    });
    return dealsByStage;
};