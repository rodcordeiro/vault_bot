import { ChatInputCommandInteraction } from 'discord.js';
import { ListDwellers } from './list';
import { CreateDwellersModal } from './createModal';

export const actionsMapper = async (
  interaction: ChatInputCommandInteraction,
) => {
  switch (interaction.options.getSubcommand()) {
    case 'list':
      ListDwellers(interaction);
      break;
    case 'create':
      CreateDwellersModal(interaction);
      break;
    default:
      console.log(interaction);
      interaction.editReply('Whops... Lost myself. Do you mind trying again?');
  }
};
