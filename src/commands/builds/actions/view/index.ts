import { ChatInputCommandInteraction } from 'discord.js';
import { BuildsService } from '../../../../services/build.service';
import { BuildEmbeded } from '../../utils/list.embed';

export const ViewBuild = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('build');

  const build = await BuildsService.findOne({
    id: String(id),
    owner: interaction.user.id,
  });

  const embed = BuildEmbeded(build);

  return await interaction.editReply({
    embeds: [embed],
  });
};
