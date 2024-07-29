import { USER_STATUS } from '@/src/shared/constants/user.constants';
import { SGIBaseEntity } from '@app/core/entities/sgi-base-entity';
import { Permission } from '@app/permission/entities/permission.entity';
import { Role } from '@app/role/entities/role.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';

@Entity()
export class Member extends SGIBaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    status: number;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @ManyToMany(() => Permission, (permission) => permission.members)
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(() => Role, (role) => role.members)
    @JoinTable()
    roles: Role[];

    @OneToOne(() => CashFlow, (cashFlow) => cashFlow.member)
    cashFlow: CashFlow;

    constructor(partial: Partial<Member>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
        this.status = this.status || USER_STATUS.WAITING_ID;
    }
}
