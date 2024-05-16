import { ChatInputCommandInteraction } from 'discord.js';
import { DwellerServices } from '../../../services/dweller.service';
import { DwellerProfileEmbed } from '../utils/list.embed';

export const ViewDweller = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('dweller');

  const dweller = await DwellerServices.view({
    id: String(id),
    owner: interaction.user.id,
  });
  if (!dweller) throw new Error('fudeu');
  console.log(dweller);
  const embed = DwellerProfileEmbed(dweller);

  return await interaction.editReply({
    embeds: [embed],
  });
};
