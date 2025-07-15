import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Module } from './module.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'uuid' })
  moduleId: string;

  @ManyToOne(() => Module, (module) => module.categories)
  module: Module;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
