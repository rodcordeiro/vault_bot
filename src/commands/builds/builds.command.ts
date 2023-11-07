import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from 'discord.js';

import { BaseCommand } from 'src/common/commands/base.command';
import { BuildsService } from 'src/services/build.service';
import { actionsMapper } from './actions';

type AutocompleteOption = {
  name: string;
  value: string;
};
export default class BuildsCommand extends BaseCommand {
  constructor() {
    const data = new SlashCommandBuilder()
      .setName('builds')
      .setDescription('Manage your vault builds!')
      .addSubcommand((subcommand) =>
        subcommand.setName('list').setDescription('List all builds'),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('create')
          .setDescription('Create a new build')
          .addStringOption((option) =>
            option
              .setName('name')
              .setDescription('Build name')
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('attribute')
              .setDescription('Build main attribute')
              .addChoices(
                { name: 'Strength', value: 'S' },
                { name: 'Perception', value: 'P' },
                { name: 'Endurance', value: 'E' },
                { name: 'Charism', value: 'C' },
                { name: 'Intelligence', value: 'I' },
                { name: 'Agility', value: 'A' },
                { name: 'Luck', value: 'L' },
              )
              .setRequired(true),
          )
          .addNumberOption((option) =>
            option
              .setName('lvl')
              .setDescription('Build level')
              .setRequired(true)
              .setMinValue(1)
              .setMaxValue(3),
          )
          .addNumberOption((option) =>
            option
              .setName('combined')
              .setDescription('How many builds are combined')
              .setRequired(true)
              .setMinValue(1)
              .setMaxValue(3)
              .addChoices(
                {
                  name: 'small',
                  value: 1,
                },
                {
                  name: 'medium',
                  value: 2,
                },
                {
                  name: 'large',
                  value: 3,
                },
              ),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('update')
          .setDescription('Update a build')
          .addStringOption((option) =>
            option
              .setName('build')
              .setDescription('Select the build to update')
              .setAutocomplete(true)
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('name')
              .setDescription('Build name')
              .setRequired(false),
          )
          .addStringOption((option) =>
            option
              .setName('attribute')
              .setDescription('Build main attribute')
              .addChoices(
                { name: 'Strength', value: 'S' },
                { name: 'Perception', value: 'P' },
                { name: 'Endurance', value: 'E' },
                { name: 'Charism', value: 'C' },
                { name: 'Intelligence', value: 'I' },
                { name: 'Agility', value: 'A' },
                { name: 'Luck', value: 'L' },
              )
              .setRequired(false),
          )
          .addNumberOption((option) =>
            option
              .setName('lvl')
              .setDescription('Build level')
              .setRequired(false)
              .setMinValue(1)
              .setMaxValue(3),
          )
          .addNumberOption((option) =>
            option
              .setName('combined')
              .setDescription('How many builds are combined')
              .setRequired(false)
              .setMinValue(1)
              .setMaxValue(3)
              .addChoices(
                {
                  name: 'small',
                  value: 1,
                },
                {
                  name: 'medium',
                  value: 2,
                },
                {
                  name: 'large',
                  value: 3,
                },
              ),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('view')
          .setDescription('View a  build')
          .addStringOption((option) =>
            option
              .setName('build')
              .setDescription('Select the build to view')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      );
    super(data);
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);
    const builds = await BuildsService.list(interaction.user.id);
    let filtered: Array<AutocompleteOption> = [];

    if (focusedValue.name === 'build') {
      filtered = builds
        .filter(
          (dweller) => dweller.name?.toLowerCase().includes(focusedValue.value),
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
      await interaction.editReply(
        "Whops... Couldn't process. Try again later, please.",
      );
    }
  }
}
