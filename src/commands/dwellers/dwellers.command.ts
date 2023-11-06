import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from 'discord.js';

import { actionsMapper } from './actions';
import { CreateDweller } from './actions/create';

export default class DwellersListCommand {
  data = new SlashCommandBuilder()
    .setName('dwellers')
    .setDescription('List all dwellers!')
    .addSubcommand((subcommand) =>
      subcommand.setName('list').setDescription('List all dwellers'),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a new dweller')
        .addBooleanOption((option) =>
          option.setName('kid').setDescription('Is a vault kid?'),
        ),
    );

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await actionsMapper(interaction);
    } catch (err) {
      console.error(err);
      await interaction.editReply(
        "Whops... Couldn't process. Try again later, please.",
      );
    }
  }

  async modalHandler(interaction: ModalSubmitInteraction) {
    await CreateDweller(interaction);
  }
}
