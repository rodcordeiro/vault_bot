import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from 'discord.js';

import { BaseCommand } from '../../common/commands/base.command';

import { actionsMapper } from './actions';
import { DwellerServices } from '../../services/dweller.service';
import { DwellerTypes } from '../../common/interfaces/dweller.interface';

type AutocompleteOption = {
  name: string;
  value: string;
};
export default class DwellersListCommand extends BaseCommand {
  constructor() {
    const data = new SlashCommandBuilder()
      .setName('dwellers')
      .setDescription('List all dwellers!')
      .addSubcommand((subcommand) =>
        subcommand.setName('list').setDescription('List all dwellers'),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('create')
          .setDescription('Create a new dweller')
          .addStringOption((option) =>
            option
              .setName('name')
              .setDescription('Dweller Name')
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('gender')
              .setDescription('Dweller description')
              .addChoices(
                { name: 'Male', value: 'M' },
                { name: 'Female', value: 'F' },
              )
              .setRequired(true),
          )
          .addNumberOption((option) =>
            option
              .setName('lvl')
              .setDescription('Dweller level')
              .setRequired(true)
              .setMinValue(1)
              .setMaxValue(50),
          )
          .addNumberOption((option) =>
            option
              .setName('strength')
              .setDescription('Dweller Strength')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('perception')
              .setDescription('Dweller Perception')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('endurance')
              .setDescription('Dweller endurance')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('charism')
              .setDescription('Dweller Charism')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('intelligence')
              .setDescription('Dweller Intelligence')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('agility')
              .setDescription('Dweller Agility')
              .setRequired(true)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('luck')
              .setDescription('Dweller Luck')
              .setRequired(true)
              .setMinValue(1),
          )
          .addStringOption((option) =>
            option
              .setName('father')
              .setDescription('Dwellers father')
              .setAutocomplete(true)
              .setRequired(false),
          )
          .addStringOption((option) =>
            option
              .setName('mother')
              .setDescription('Dwellers mother')
              .setAutocomplete(true)
              .setRequired(false),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('update')
          .setDescription('Update a dweller')
          .addStringOption((option) =>
            option
              .setName('dweller')
              .setDescription('Select the dweller to update')
              .setAutocomplete(true)
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('name')
              .setDescription('Dweller Name')
              .setRequired(false),
          )
          .addStringOption((option) =>
            option
              .setName('gender')
              .setDescription('Dweller description')
              .addChoices(
                { name: 'Male', value: 'M' },
                { name: 'Female', value: 'F' },
              )
              .setRequired(false),
          )
          .addNumberOption((option) =>
            option
              .setName('lvl')
              .setDescription('Dweller level')
              .setRequired(false)
              .setMinValue(1)
              .setMaxValue(50),
          )
          .addNumberOption((option) =>
            option
              .setName('strength')
              .setDescription('Dweller Strength')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('perception')
              .setDescription('Dweller Perception')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('endurance')
              .setDescription('Dweller endurance')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('charism')
              .setDescription('Dweller Charism')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('intelligence')
              .setDescription('Dweller Intelligence')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('agility')
              .setDescription('Dweller Agility')
              .setRequired(false)
              .setMinValue(1),
          )
          .addNumberOption((option) =>
            option
              .setName('luck')
              .setDescription('Dweller Luck')
              .setRequired(false)
              .setMinValue(1),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('view')
          .setDescription('View a dweller')
          .addStringOption((option) =>
            option
              .setName('dweller')
              .setDescription('Select the dweller to view')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('delete')
          .setDescription('Delete a dweller')
          .addStringOption((option) =>
            option
              .setName('dweller')
              .setDescription('Select the dweller to delete')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      );

    super(data);
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);
    const dwellers = await DwellerServices.list(interaction.user.id);
    let filtered: Array<AutocompleteOption> = [];

    if (focusedValue.name === 'dweller') {
      filtered = dwellers
        .filter(
          (dweller) => dweller.name?.toLowerCase().includes(focusedValue.value),
        )
        .map(({ name, id }) => ({ name, value: id }));
    }

    if (focusedValue.name === 'father') {
      filtered = dwellers
        .filter(
          (dweller) =>
            dweller.gender === DwellerTypes.Gender.Male &&
            dweller.name?.toLowerCase().includes(focusedValue.value),
        )
        .map(({ name, id }) => ({ name, value: id }));
    }

    if (focusedValue.name === 'mother') {
      filtered = dwellers
        .filter(
          (dweller) =>
            dweller.gender === DwellerTypes.Gender.Female &&
            dweller.name?.toLowerCase().includes(focusedValue.value),
        )
        .map(({ name, id }) => ({ name, value: id }));
    }

    await interaction.respond(filtered);
  }
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await actionsMapper(interaction);
    } catch (err) {
      console.error(err);
      const action = interaction.replied
        ? interaction.editReply
        : interaction.reply;
      await action("Whops... Couldn't process. Try again later, please.");
    }
  }
}
