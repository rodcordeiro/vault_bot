import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { BuildEntity } from './builds.entity';
import { AssignmentEntity } from './assignment.entity';

@Entity('tb_jobs')
export class JobsEntity extends BaseEntity {
  /** COLUMNS */
  @Column({ type: 'varchar', length: 40, nullable: false })
  name!: string;

  /** JOINS */
  @OneToOne(() => BuildEntity, (build) => build.job, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'place' })
  place!: BuildEntity;

  @OneToMany(() => AssignmentEntity, (assign) => assign.job)
  @JoinColumn()
  assignments?: AssignmentEntity[];
  /** METHODS */
}
