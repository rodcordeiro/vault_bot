import { ChatInputCommandInteraction } from 'discord.js';
import { Pagination } from 'pagination.djs';
import { createBatch } from '../../../../common/helpers/batch.helper';
import { PaginatedJobsEmbeded } from '../../utils/list.embed';
import { JobsService } from '../../../../services/jobs.service';

export const ListJobs = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const jobs = await JobsService.list(interaction.user.id);

  const Embeds = createBatch(jobs, 6).map((data, index, arr) =>
    PaginatedJobsEmbeded(data, index + 1, arr.length),
  );

  if (Embeds.length === 1) {
    return await interaction.editReply({
      embeds: Embeds,
    });
  }

  const pagination = new Pagination(interaction, {
    idle: 30000,
    loop: true,
  });

  pagination.setEmbeds(Embeds);

  const payload = pagination.ready();
  const message = await interaction.editReply(payload);
  pagination.paginate(message);
};
