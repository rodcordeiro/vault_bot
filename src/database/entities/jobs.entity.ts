import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { BuildEntity } from './builds.entity';
import { AssignmentEntity } from './assignment.entity';

@Entity('vb_tb_jobs')
export class JobsEntity extends BaseEntity {
  /** COLUMNS */
  @Column({ type: 'varchar', length: 40, nullable: false })
  name!: string;

  /** JOINS */
  @OneToOne(() => BuildEntity, (build) => build.job, {
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'place', referencedColumnName: 'id' })
  place!: BuildEntity;

  @OneToMany(() => AssignmentEntity, (assign) => assign.job)
  assignments?: AssignmentEntity[];
  /** METHODS */
}
