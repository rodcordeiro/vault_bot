import { Entity, OneToOne, ManyToOne } from 'typeorm';
import { JobsEntity } from './jobs.entity';
import { DwellersEntity } from './dwellers.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('tb_assignments')
export class AssignmentEntity extends BaseEntity {
  /** COLUMNS */

  /** JOINS */
  @OneToOne(() => DwellersEntity, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  dweller!: string;

  @ManyToOne(() => JobsEntity, (job) => job.id, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  job!: string;

  /** METHODS */
}
