import { ChatInputCommandInteraction } from 'discord.js';
import { BuildsService } from '../../../../services/build.service';

export const DeleteBuild = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const id = interaction.options.getString('build');

  try {
    await BuildsService.Delete(id!);

    return await interaction.editReply({
      content: 'Building successfully demolished!',
    });
  } catch (err) {
    console.error(err);
    await interaction.editReply({
      content: "Whoa, seems to be a powerfull build. Couldn't break it down",
    });
  }
};
