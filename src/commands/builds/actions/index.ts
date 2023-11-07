import { ChatInputCommandInteraction } from 'discord.js';
import { ListBuilds } from './list';
import { CreateBuild } from './create';
import { UpdateBuild } from './update';
import { ViewBuild } from './view';
import { DeleteBuild } from './delete';

export const actionsMapper = async (
  interaction: ChatInputCommandInteraction,
) => {
  switch (interaction.options.getSubcommand()) {
    case 'list':
      ListBuilds(interaction);
      break;
    case 'create':
      CreateBuild(interaction);
      break;
    case 'update':
      UpdateBuild(interaction);
      break;
    case 'view':
      ViewBuild(interaction);
      break;
    case 'delete':
      DeleteBuild(interaction);
      break;
    default:
      console.log(interaction);
      interaction.replied
        ? interaction.editReply(
            'Whops... Lost myself. Do you mind trying again?',
          )
        : interaction.reply('Whops... Lost myself. Do you mind trying again?');
  }
};
