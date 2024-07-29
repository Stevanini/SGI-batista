import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { CashFlow } from './cashflow.entity';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { v4 as uuidv4 } from 'uuid';
import { CashFlowGroupCategory } from './cashflow-group-category.entity';

@Entity()
export class CashFlowCategory extends SGIBaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => CashFlow, (c) => c.category, { nullable: true })
    cashFlows: CashFlow[];

    @ManyToOne(
        () => CashFlowGroupCategory,
        (group) => group.cashFlowCategories,
        { nullable: true },
    )
    cashFlowGroupCategory: CashFlowGroupCategory;

    constructor(partial: Partial<CashFlowCategory>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
    }
}
