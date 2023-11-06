import { ChatInputCommandInteraction } from 'discord.js';
import { DwellerServices } from 'src/services/dweller.service';

export const ListDwellers = async (
  interaction: ChatInputCommandInteraction,
) => {
  await interaction.deferReply({ ephemeral: false });
  const dwellers = await DwellerServices.list();
  return await interaction.editReply({
    content: JSON.stringify(dwellers),
  });
};
