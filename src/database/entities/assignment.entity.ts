import { Entity, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { JobsEntity } from './jobs.entity';
import { DwellersEntity } from './dwellers.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('vb_tb_assignments')
export class AssignmentEntity extends BaseEntity {
  /** COLUMNS */

  /** JOINS */
  @OneToOne(() => DwellersEntity, (dweller) => dweller.assignment, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dweller', referencedColumnName: 'id' })
  dweller!: DwellersEntity;

  @ManyToOne(() => JobsEntity, (job) => job.assignments, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'job', referencedColumnName: 'id' })
  job!: JobsEntity;

  /** METHODS */
}
