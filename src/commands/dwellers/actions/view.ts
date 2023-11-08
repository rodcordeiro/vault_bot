import { ChatInputCommandInteraction } from 'discord.js';
import { DwellerServices } from '../../../services/dweller.service';
import { DwellerProfileEmbed } from '../utils/list.embed';

export const ViewDweller = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('dweller');

  const dweller = await DwellerServices.findOne({
    id: String(id),
    owner: interaction.user.id,
  });

  const embed = DwellerProfileEmbed(dweller);

  return await interaction.editReply({
    embeds: [embed],
  });
};
