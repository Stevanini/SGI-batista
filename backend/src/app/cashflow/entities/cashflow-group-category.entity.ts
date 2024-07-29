import { Entity, Column, OneToMany } from 'typeorm';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { v4 as uuidv4 } from 'uuid';
import { CashFlowCategory } from './cashflow-category.entity';

@Entity()
export class CashFlowGroupCategory extends SGIBaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(
        () => CashFlowCategory,
        (category) => category.cashFlowGroupCategory,
    )
    cashFlowCategories: CashFlowCategory[];

    constructor(partial: Partial<CashFlowGroupCategory>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
    }
}
