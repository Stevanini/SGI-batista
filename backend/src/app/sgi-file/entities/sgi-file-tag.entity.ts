import { Entity, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { SgiFile } from './sgi-file.entity';

@Entity()
export class SgiFileTag extends SGIBaseEntity {
    @Column({ unique: true })
    name: string;

    @OneToMany(() => SgiFile, (s) => s.sgiFileTag)
    sgiFiles: SgiFile[];
}
