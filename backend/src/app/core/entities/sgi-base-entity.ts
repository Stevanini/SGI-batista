import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class SGIBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ default: true })
    enable: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column()
    createdBy: string;
  
    @Column()
    updatedBy: string;
  }