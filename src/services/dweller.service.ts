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
  static async view(options: FindOneOptions<DwellersEntity>['where']) {
    const dweller = await DwellersRepository.findOneOrFail({
      where: options,
      relationLoadStrategy: 'join',
    });
    // console.log(dweller);

    if (dweller.father)
      dweller.father = (await this.findOne({ id: dweller.father })).name;

    if (dweller.mother)
      dweller.mother = (await this.findOne({ id: dweller.mother })).name;

    return dweller;
  }

  static async store(payload: Model<DwellersEntity>) {
    if (payload.father) {
      this.logParents(payload.father, payload.mother!);
    }
    const dweller = DwellersRepository.create(payload);
    await DwellersRepository.save(dweller);
    await DwellerServices.logDweller(dweller, DwellerLogTypes.DWELLER_BORN);
    return dweller;
  }

  static async update(id: string, payload: Model<DwellersEntity>) {
    const dweller = await DwellersRepository.findOneByOrFail({
      id,
    });
    DwellerServices.logDweller(
      {
        ...payload,
        id,
      },
      DwellerLogTypes.DWELLER_UPDATE,
    );
    DwellersRepository.merge(dweller, payload);
    return await DwellersRepository.save(dweller);
  }
  static async Delete(id: string) {
    const dweller = await DwellersRepository.findOneByOrFail({ id });
    await DwellersRepository.delete({ id });
    this.logDweller(dweller, DwellerLogTypes.DWELLER_REMOVAL);
  }

  static async logDweller(
    dweller: Model<DwellersEntity, true>,

    action: DwellerLogTypes,
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
      action,
    });
    DwellersLogRepository.save(log);
  }
  static async logParents(father: string, mother: string) {
    const dad = await this.findOne({ id: father });
    const mom = await this.findOne({ id: mother });
    this.logDweller(dad, DwellerLogTypes.DWELLER_CHILDREN);
    this.logDweller(mom, DwellerLogTypes.DWELLER_CHILDREN);
  }
}
