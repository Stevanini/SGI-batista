import {
    Entity,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { SgiFileTag } from './sgi-file-tag.entity';
import { SGIBaseEntity } from '../../core/entities/sgi-base-entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class SgiFile extends SGIBaseEntity {
    @Column()
    name: string;

    @Column('text')
    base64File: string;

    @Column()
    mimeType: string;

    @ManyToOne(() => SgiFileTag, (tag) => tag.sgiFiles, { nullable: true })
    sgiFileTag: SgiFileTag;

    constructor(partial: Partial<SgiFile>) {
        super();
        Object.assign(this, partial);
        this.id = this.id || uuidv4();
    }
}
