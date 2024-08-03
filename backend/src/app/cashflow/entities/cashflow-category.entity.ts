import { Entity, Column, OneToMany } from 'typeorm';
import { CashFlow } from './cashflow.entity';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class CashFlowCategory extends SGIBaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => CashFlow, (c) => c.category, { nullable: true })
    cashFlows: CashFlow[];

    constructor(partial: Partial<CashFlowCategory>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
    }
}
