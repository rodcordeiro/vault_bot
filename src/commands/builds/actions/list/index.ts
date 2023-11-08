import { ChatInputCommandInteraction } from 'discord.js';
import { Pagination } from 'pagination.djs';
import { createBatch } from '../../../../common/helpers/batch.helper';
import { PaginatedBuildEmbeded } from '../../utils/list.embed';
import { BuildsService } from '../../../../services/build.service';

export const ListBuilds = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const builds = await BuildsService.list(interaction.user.id);

  const Embeds = createBatch(builds, 6).map((data, index, arr) =>
    PaginatedBuildEmbeded(data, index + 1, arr.length),
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
