import { SGIBaseEntity } from '@/app/core/entities/sgi-base-entity';
import { Permission } from '@/app/permission/entities/permission.entity';
import { Role } from '@/app/role/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Member extends SGIBaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @ManyToMany(() => Permission, permission => permission.members)
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(() => Role, role => role.members)
    @JoinTable()
    roles: Role[];
}
