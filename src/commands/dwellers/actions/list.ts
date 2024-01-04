import { ChatInputCommandInteraction } from 'discord.js';
import { Pagination } from 'pagination.djs';
import { createBatch } from '../../../common/helpers/batch.helper';
import { DwellerServices } from '../../../services/dweller.service';
import { DwellersEmbed } from '../utils/list.embed';

export const ListDwellers = async (
  interaction: ChatInputCommandInteraction,
) => {
  await interaction.deferReply({ ephemeral: false });
  const dwellers = await DwellerServices.list(interaction.user.id);
  console.log(dwellers[0]);
  const Embeds = createBatch(dwellers, 6).map((data, index, arr) =>
    DwellersEmbed(data, {
      dwellersPerPage: data.length,
      totalDwellers: dwellers.length,
      page: index + 1,
      totalPages: arr.length,
    }),
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
