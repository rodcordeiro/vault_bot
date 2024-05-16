import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from 'discord.js';

import { BaseCommand } from '../../common/commands/base.command';
import { BuildsService } from '../../services/build.service';
import { actionsMapper } from './actions';
import { JobsService } from '../../services/jobs.service';
import { DwellerServices } from '../../services/dweller.service';
import { Attribute } from './utils/attribute.util';

type AutocompleteOption = {
  name: string;
  value: string;
};
export default class BuildsCommand extends BaseCommand {
  constructor() {
    const data = new SlashCommandBuilder()
      .setName('jobs')
      .setDescription('Manage your vault jobs!')
      .addSubcommand((subcommand) =>
        subcommand.setName('list').setDescription('List all jobs'),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('create')
          .setDescription('Create a new job')
          .addStringOption((option) =>
            option.setName('name').setDescription('job name').setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('place')
              .setDescription('Where does this job is executed?')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('update')
          .setDescription('Update a job')
          .addStringOption((option) =>
            option
              .setName('job')
              .setDescription('Select the job to update')
              .setAutocomplete(true)
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('name')
              .setDescription('Job name')
              .setRequired(false),
          )
          .addStringOption((option) =>
            option
              .setName('place')
              .setDescription('Where does this job is executed?')
              .setAutocomplete(true)
              .setRequired(false),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('view')
          .setDescription('View a  job')
          .addStringOption((option) =>
            option
              .setName('job')
              .setDescription('Select the job to view')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('delete')
          .setDescription('Delete a  job')
          .addStringOption((option) =>
            option
              .setName('job')
              .setDescription('Select the job to delete')
              .setAutocomplete(true)
              .setRequired(true),
          ),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('assign')
          .setDescription('Assign a job to a dweller')
          .addStringOption((option) =>
            option
              .setName('job')
              .setDescription('Select the job to assign')
              .setAutocomplete(true)
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName('dweller')
              .setAutocomplete(true)
              .setDescription('Dweller name')
              .setRequired(true),
          ),
      );
    super(data);
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);
    const jobs = await JobsService.list(interaction.user.id);
    const builds = await BuildsService.list(interaction.user.id);
    let filtered: Array<AutocompleteOption> = [];

    if (focusedValue.name === 'job') {
      filtered = jobs
        .filter((job) => job.name?.toLowerCase().includes(focusedValue.value))
        .map(({ name, id }) => ({ name, value: id }));
    }

    if (focusedValue.name === 'place') {
      filtered = builds
        .filter((build) =>
          build.name?.toLowerCase().includes(focusedValue.value),
        )
        .map(({ name, id }) => ({ name, value: id }));
    }
    if (focusedValue.name === 'dweller') {
      const dwellers = await DwellerServices.list(interaction.user.id);
      const job = interaction.options.get('job');
      const selectedJob = jobs.find((j) => j.id === job?.value);
      filtered = dwellers
        .filter((dweller) =>
          dweller.name?.toLowerCase().includes(focusedValue.value),
        )
        .sort((a, b) => {
          const first = a[Attribute(selectedJob!.place.attribute)];
          const second = b[Attribute(selectedJob!.place.attribute)];
          return second - first;
        })
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
