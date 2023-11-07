import { ChatInputCommandInteraction } from 'discord.js';
import { ListBuilds } from './list';
import { CreateBuild } from './create';
import { UpdateBuild } from './update';
import { ViewBuild } from './view';

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
    default:
      console.log(interaction);
      interaction.editReply('Whops... Lost myself. Do you mind trying again?');
  }
};
