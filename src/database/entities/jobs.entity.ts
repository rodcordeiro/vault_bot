import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { BuildEntity } from './builds.entity';

@Entity('tb_jobs')
export class JobsEntity extends BaseEntity {
  /** COLUMNS */
  @Column({ type: 'varchar', length: 40, nullable: false })
  name!: string;

  /** JOINS */
  @OneToOne(() => BuildEntity, (build) => build.id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  place!: string;

  /** METHODS */
}
