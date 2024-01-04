import { ChatInputCommandInteraction } from 'discord.js';
import { JobsService } from '../../../../services/jobs.service';
import { JobEmbeded } from '../../utils/list.embed';

export const ViewJob = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('build');

  const job = await JobsService.findOne({
    id: String(id),
    owner: interaction.user.id,
  });

  const embed = JobEmbeded(job);

  return await interaction.editReply({
    embeds: [embed],
  });
};
