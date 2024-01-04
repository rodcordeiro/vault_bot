import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { DwellerTypes } from '../../common/interfaces/dweller.interface';

@Entity('tb_dwellers_logs')
export class DwellersLogEntity extends BaseEntity {
  /** COLUMNS */
  @Column({ type: 'uuid' })
  dweller!: string;

  @Column({ type: 'varchar', length: '100' })
  name!: string;

  @Column({ type: 'enum', enum: DwellerTypes.Gender })
  gender!: DwellerTypes.Gender;

  @Column({ type: 'int' })
  lvl!: number;

  @Column({ type: 'uuid', nullable: true })
  father?: string;

  @Column({ type: 'uuid', nullable: true })
  mother?: string;

  @Column({ type: 'int' })
  strength!: number;

  @Column({ type: 'int' })
  perception!: number;

  @Column({ type: 'int' })
  endurance!: number;

  @Column({ type: 'int' })
  charism!: number;

  @Column({ type: 'int' })
  intelligence!: number;

  @Column({ type: 'int' })
  agility!: number;

  @Column({ type: 'int' })
  luck!: number;

  @Column({ type: 'varchar', length: '100' })
  action!: string;

  /** JOINS */
  /** METHODS */
}
