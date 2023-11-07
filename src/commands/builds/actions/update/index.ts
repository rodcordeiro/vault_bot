/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatInputCommandInteraction } from 'discord.js';
import { BuildsService } from 'src/services/build.service';
import { BuildEmbeded } from '../../utils/list.embed';

export const UpdateBuild = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.options.data[0].options?.map((option) => [
      option.name,
      option.value,
    ]) || [],
  );

  if (fields.combined) {
    fields.max_workers = +(fields.combined || 1) * 2;
  }

  const build = await BuildsService.update(fields.build as string, {
    ...fields,
    owner: interaction.user.id,
  });

  const embed = BuildEmbeded(build);

  return await interaction.editReply({
    embeds: [embed],
    content: 'Build updated!',
  });
};
