/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatInputCommandInteraction } from 'discord.js';
import { DwellerServices } from '../../../services/dweller.service';
import { DwellerProfileEmbed } from '../utils/list.embed';

export const UpdateDweller = async (
  interaction: ChatInputCommandInteraction,
) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.options.data[0].options?.map((option) => [
      option.name,
      option.value,
    ]) || [],
  );

  const dweller = await DwellerServices.update(fields.dweller as string, {
    ...fields,
    owner: interaction.user.id,
  });

  const embed = DwellerProfileEmbed(dweller);

  return await interaction.editReply({
    embeds: [embed],
    content: 'Dweller updated!',
  });
};
