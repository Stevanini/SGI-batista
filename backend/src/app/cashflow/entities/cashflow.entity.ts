import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CashFlowCategory } from './cashflow-category.entity';
import { Member } from '../../member/entities/member.entity';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class CashFlow extends SGIBaseEntity {
    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    date: Date;

    @Column({ nullable: true })
    description: string;

    // @Column({
    //     type: 'enum',
    //     enum: Priority,
    //     default: Priority.LOW,
    //   })
    @Column()
    type: number; //cashflow-type.constants

    @ManyToOne(() => CashFlowCategory, (c) => c.cashFlows)
    category: CashFlowCategory;

    @OneToOne(() => Member, (member) => member.cashFlow)
    @JoinColumn()
    member: Member;

    constructor(partial: Partial<CashFlow>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
    }
}
