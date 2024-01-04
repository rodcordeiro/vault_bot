import { ChatInputCommandInteraction } from 'discord.js';
import { JobsService } from '../../../../services/jobs.service';

export const DeleteJob = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('build');

  try {
    await JobsService.Delete(id!);

    return await interaction.editReply({
      content: 'Job extinguished!',
    });
  } catch (err) {
    console.error(err);
    await interaction.editReply({
      content: "Whoa, seems to be a usefull job. Couldn't forget it.",
    });
  }
};
