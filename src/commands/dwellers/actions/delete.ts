import { ChatInputCommandInteraction } from 'discord.js';
import { DwellerServices } from '../../../services/dweller.service';

export const DeleteDweller = async (
  interaction: ChatInputCommandInteraction,
) => {
  await interaction.deferReply({ ephemeral: false });
  try {
    const id = interaction.options.getString('dweller');

    await DwellerServices.Delete(id!);

    return await interaction.editReply({
      content: 'Dweller succesfully banned!',
    });
  } catch (err) {
    console.error(err);
    await interaction.editReply({
      content: "Whoa, seems to be a powerfull dweller. Couldn't be banned",
    });
  }
};
