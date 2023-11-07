import { ChatInputCommandInteraction } from 'discord.js';
import { ListDwellers } from './list';
import { CreateDweller } from './create';
import { UpdateDweller } from './update';
import { ViewDweller } from './view';

export const actionsMapper = async (
  interaction: ChatInputCommandInteraction,
) => {
  switch (interaction.options.getSubcommand()) {
    case 'list':
      ListDwellers(interaction);
      break;
    case 'create':
      CreateDweller(interaction);
      break;
    case 'update':
      UpdateDweller(interaction);
      break;
    case 'view':
      ViewDweller(interaction);
      break;
    default:
      console.log(interaction);
      interaction.editReply('Whops... Lost myself. Do you mind trying again?');
  }
};
