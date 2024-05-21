import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'vb_tb_guild' })
export class GuildEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  guildId!: string;

  @Column({ type: 'varchar' })
  azureToken?: string;

  @Column({ type: 'varchar' })
  azureQueryId?: string;

  @Column({ type: 'varchar' })
  azureOrganization?: string;
}
