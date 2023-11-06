import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { DwellerTypes } from 'src/common/interfaces/dweller.interface';

@Entity('tb_dwellers')
@Index(
  'idx_attrb',
  [
    'id',
    'Strength',
    'Perception',
    'Endurance',
    'Charisma',
    'Intelligence',
    'Agility',
    'Luck',
  ],
  { unique: true, background: true },
)
export class DwellersEntity extends BaseEntity {
  /** COLUMNS */
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
  Strength!: number;

  @Column({ type: 'int' })
  Perception!: number;

  @Column({ type: 'int' })
  Endurance!: number;

  @Column({ type: 'int' })
  Charisma!: number;

  @Column({ type: 'int' })
  Intelligence!: number;

  @Column({ type: 'int' })
  Agility!: number;

  @Column({ type: 'int' })
  Luck!: number;

  /** JOINS */

  /** METHODS */
}
