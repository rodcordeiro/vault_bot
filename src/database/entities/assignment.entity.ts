import { Entity, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { JobsEntity } from './jobs.entity';
import { DwellersEntity } from './dwellers.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('tb_assignments')
export class AssignmentEntity extends BaseEntity {
  /** COLUMNS */

  /** JOINS */
  @OneToOne(() => DwellersEntity, (dweller) => dweller.assignment, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dweller' })
  dweller!: DwellersEntity;

  @ManyToOne(() => JobsEntity, (job) => job.assignments, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'job' })
  job!: JobsEntity;

  /** METHODS */
}
