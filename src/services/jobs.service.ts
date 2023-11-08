import { FindOneOptions } from 'typeorm';

import { JobsRepository, AssignmentRepository } from '../database/repositories';
import { BuildsService } from './build.service';
import { DwellerServices } from './dweller.service';
import { JobsEntity } from '../database/entities/jobs.entity';

export class JobsService {
  static async list(owner: string) {
    return await JobsRepository.find({
      relationLoadStrategy: 'join',
      where: { owner },
      relations: ['place'],
      order: {
        name: 'ASC',
      },
    });
  }

  static async findOne(options: FindOneOptions<JobsEntity>['where']) {
    return await JobsRepository.findOneOrFail({
      where: options,
    });
  }

  static async store(payload: { name: string; place: string; owner: string }) {
    const place = await BuildsService.findOne({ id: payload.place! });
    const job = JobsRepository.create({
      ...payload,
      place,
    });
    return await JobsRepository.save(job);
  }

  static async update(
    id: string,
    payload: { owner: string; name?: string; place?: string },
  ) {
    const job = await JobsRepository.findOneByOrFail({
      id,
    });
    const place = payload.place
      ? await BuildsService.findOne({ id: payload.place! })
      : job.place;

    JobsRepository.merge(job, { ...payload, place });
    return await JobsRepository.save(job);
  }

  static async Delete(id: string) {
    await JobsRepository.findOneByOrFail({ id });
    await JobsRepository.delete({ id });
  }

  static async assign(id: string, dwellerId: string, owner: string) {
    const dweller = await DwellerServices.findOne({ id: dwellerId });
    const job = await this.findOne({ id });
    const payload = {
      dweller,
      job,
      owner,
    };
    const assignment = AssignmentRepository.create(payload);
    return await AssignmentRepository.save(assignment);
  }
}
