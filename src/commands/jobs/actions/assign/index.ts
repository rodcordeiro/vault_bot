import { ChatInputCommandInteraction } from 'discord.js';
import { JobsService } from '../../../../services/jobs.service';
import { AssignmentEmbed } from '../../utils/list.embed';

export const AssignJob = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const job = interaction.options.getString('job');
  const dwellerId = interaction.options.getString('dweller');


  const assignment = await JobsService.assign(
    job!,
    dwellerId!,
    interaction.user.id,
  );

  const embed = AssignmentEmbed(assignment);

  return await interaction.editReply({
    embeds: [embed],
  });
};
