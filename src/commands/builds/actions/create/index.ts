import { ChatInputCommandInteraction } from 'discord.js';
import { BuildsService } from '../../../../services/build.service';
import { BuildEmbeded } from '../../utils/list.embed';

export const CreateBuild = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.options.data[0].options?.map((option) => [
      option.name,
      option.value,
    ]) || [],
  );

  const build = await BuildsService.store({
    ...fields,
    max_workers: +(fields.combined || 1) * 2,
    owner: interaction.user.id,
  });

  const embed = BuildEmbeded(build);

  return await interaction.editReply({
    embeds: [embed],
  });
};
