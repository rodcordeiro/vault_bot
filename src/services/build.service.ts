import { FindOneOptions } from 'typeorm';

import { BuildRepository } from 'src/database/repositories';
import { BuildEntity } from 'src/database/entities/builds.entity';
import { Model } from 'src/common/interfaces/database.interface';

export class BuildsService {
  static async list(owner: string) {
    return await BuildRepository.find({
      relationLoadStrategy: 'join',
      where: { owner },
      order: {
        name: 'ASC',
      },
    });
  }

  static async findOne(options: FindOneOptions<BuildEntity>['where']) {
    return await BuildRepository.findOneOrFail({
      where: options,
    });
  }

  static async store(payload: Model<BuildEntity>) {
    const build = BuildRepository.create(payload);
    return await BuildRepository.save(build);
  }

  static async update(id: string, payload: Model<BuildEntity>) {
    const build = await BuildRepository.findOneByOrFail({
      id,
    });
    BuildRepository.merge(build, payload);
    return await BuildRepository.save(build);
  }
  static async Delete(id: string) {
    await BuildRepository.findOneByOrFail({ id });
    await BuildRepository.delete({ id });
  }
}
