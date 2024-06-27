import { SGIBaseEntity } from '@app/core/entities/sgi-base-entity';
import { Member } from '@app/member/entities/member.entity';
import { Permission } from '@app/permission/entities/permission.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Role extends SGIBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Member, (member) => member.roles)
  members: Member[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
