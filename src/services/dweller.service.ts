import { FindOneOptions } from 'typeorm';

import {
  DwellersLogRepository,
  DwellersRepository,
} from 'src/database/repositories';
import { DwellersEntity } from 'src/database/entities/dwellers.entity';
import { Model } from 'src/common/interfaces/database.interface';

export class DwellerServices {
  static async list() {
    return await DwellersRepository.find({
      relationLoadStrategy: 'join',
    });
  }

  static async findOne(options: FindOneOptions<DwellersEntity>['where']) {
    return await DwellersRepository.findOneOrFail({
      where: options,
      // relations: ['assignment'],
    });
  }

  static async store(payload: Model<DwellersEntity>) {
    const dweller = DwellersRepository.create(payload);
    return await DwellersRepository.save(dweller);
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
  static async logDweller(dweller: Model<DwellersEntity, true>) {
    const log = DwellersLogRepository.create({
      dweller: dweller.id,
      name: dweller.name,
      gender: dweller.gender,
      lvl: dweller.lvl,
      father: dweller.father,
      mother: dweller.mother,
      Strength: dweller.Strength,
      Perception: dweller.Perception,
      Endurance: dweller.Endurance,
      Charisma: dweller.Charisma,
      Intelligence: dweller.Intelligence,
      Agility: dweller.Agility,
      Luck: dweller.Luck,
    });
    DwellersLogRepository.save(log);
  }
}
