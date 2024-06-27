import { SGIBaseEntity } from '@app/core/entities/sgi-base-entity';
import { Member } from '@app/member/entities/member.entity';
import { Role } from '@app/role/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Permission extends SGIBaseEntity {
  @Column()
  tag: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Member, (member) => member.permissions)
  members: Member[];

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable()
  roles: Role[];
}
