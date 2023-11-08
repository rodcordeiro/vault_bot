import { ChatInputCommandInteraction } from 'discord.js';
import { ListJobs } from './list';
import { CreateJob } from './create';
import { UpdateJobs } from './update';
import { ViewJob } from './view';
import { DeleteJob } from './delete';
import { AssignJob } from './assign';

export const actionsMapper = async (
  interaction: ChatInputCommandInteraction,
) => {
  switch (interaction.options.getSubcommand()) {
    case 'list':
      ListJobs(interaction);
      break;
    case 'create':
      CreateJob(interaction);
      break;
    case 'update':
      UpdateJobs(interaction);
      break;
    case 'view':
      ViewJob(interaction);
      break;
    case 'delete':
      DeleteJob(interaction);
      break;
    case 'assign':
      AssignJob(interaction);
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
