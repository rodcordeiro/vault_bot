import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { DwellerTypes } from 'src/common/interfaces/dweller.interface';
import { JobsEntity } from './jobs.entity';

@Entity('tb_build')
export class BuildEntity extends BaseEntity {
  /** COLUMNS */
  @Column({ type: 'varchar', length: 40 })
  name!: string;

  @Column({ type: 'int', default: 1 })
  lvl!: number;

  @Column({ type: 'enum', enum: DwellerTypes.SpecialAttribute })
  attribute!: DwellerTypes.SpecialAttribute;

  @Column({ type: 'int', default: 2 })
  max_workers!: number;

  /** JOINS */
  @OneToOne(() => JobsEntity, (job) => job.place)
  job?: string;

  /** METHODS */
}
