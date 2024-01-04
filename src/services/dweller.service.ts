import { FindOneOptions } from 'typeorm';

import {
  DwellersLogRepository,
  DwellersRepository,
} from '../database/repositories';
import { DwellersEntity } from '../database/entities/dwellers.entity';
import {
  DwellerLogTypes,
  Model,
} from '../common/interfaces/database.interface';

export class DwellerServices {
  static async list(owner: string) {
    return await DwellersRepository.find({
      relationLoadStrategy: 'join',
      where: { owner },
      order: {
        name: 'ASC',
      },
      relations: ['assignment'],
    });
  }

  static async findOne(options: FindOneOptions<DwellersEntity>['where']) {
    return await DwellersRepository.findOneOrFail({
      where: options,
      relationLoadStrategy: 'join',
    });
  }
  static async teste(options: FindOneOptions<DwellersEntity>['where']) {
    return await DwellersRepository.findOneOrFail({
      where: options,
      select: [
        'agility',
        'assignment',
        'charism',
        'endurance',
        'father',
        'mother',
        'gender',
        'id',
        'intelligence',
        'luck',
        'lvl',
        'name',
        'owner',
        'perception',
        'strength',
      ],
      relationLoadStrategy: 'join',
    });
  }

  static async store(payload: Model<DwellersEntity>) {
    if (payload.father) {
      this.logParents(payload.father, payload.mother!);
    }
    const dweller = DwellersRepository.create(payload);
    await DwellersRepository.save(dweller);
    await DwellerServices.logDweller(dweller);
    return dweller;
  }

  static async update(id: string, payload: Model<DwellersEntity>) {
    const dweller = await DwellersRepository.findOneByOrFail({
      id,
    });
    DwellerServices.logDweller({
      ...payload,
      id,
    });
    DwellersRepository.merge(dweller, payload);
    return await DwellersRepository.save(dweller);
  }
  static async Delete(id: string) {
    await DwellersRepository.findOneByOrFail({ id });
    await DwellersRepository.delete({ id });
  }

  static async logDweller(
    dweller: Model<DwellersEntity, true>,
    parent?: boolean,
  ) {
    const log = DwellersLogRepository.create({
      dweller: dweller.id,
      name: dweller.name,
      gender: dweller.gender,
      lvl: dweller.lvl,
      father: dweller.father,
      mother: dweller.mother,
      strength: dweller.strength,
      perception: dweller.perception,
      endurance: dweller.endurance,
      charism: dweller.charism,
      intelligence: dweller.intelligence,
      agility: dweller.agility,
      luck: dweller.luck,
      owner: dweller.owner,
      action: parent
        ? DwellerLogTypes.DWELLER_CHILDREN
        : DwellerLogTypes.DWELLER_BORN,
    });
    DwellersLogRepository.save(log);
  }
  static async logParents(father: string, mother: string) {
    const dad = await this.findOne({ id: father });
    const mom = await this.findOne({ id: mother });
    this.logDweller(dad, true);
    this.logDweller(mom, true);
  }
}
