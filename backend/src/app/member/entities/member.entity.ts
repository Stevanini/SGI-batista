import { SGIBaseEntity } from '@app/core/entities/sgi-base-entity';
import { Permission } from '@app/permission/entities/permission.entity';
import { Role } from '@app/role/entities/role.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Só faz hash da senha se ela foi modificada
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
