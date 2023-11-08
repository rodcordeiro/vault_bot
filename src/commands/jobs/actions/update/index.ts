import { ChatInputCommandInteraction } from 'discord.js';
import { JobsService } from '../../../../services/jobs.service';
import { JobEmbeded } from '../../utils/list.embed';

export const UpdateJobs = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.options.data[0].options?.map((option) => [
      option.name,
      option.value,
    ]) || [],
  );

  const Job = await JobsService.update(fields.Job as string, {
    ...fields,
    owner: interaction.user.id,
  });

  const embed = JobEmbeded(Job);

  return await interaction.editReply({
    embeds: [embed],
    content: 'Job updated!',
  });
};
