import { ChatInputCommandInteraction } from 'discord.js';
import { JobsService } from '../../../../services/jobs.service';
import { JobEmbeded } from '../../utils/list.embed';

export const CreateJob = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.options.data[0].options?.map((option) => [
      option.name,
      option.value,
    ]) || [],
  );

  const job = await JobsService.store({
    name: String(fields.name),
    place: String(fields.place),
    owner: String(interaction.user.id),
  });

  const embed = JobEmbeded(job);

  return await interaction.editReply({
    embeds: [embed],
  });
};
