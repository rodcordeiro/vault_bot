import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { BaseCommand } from 'src/common/commands/base.command';

export default class CleanupCommand extends BaseCommand {
  constructor() {
    const data = new SlashCommandBuilder()
      .setName('cleanup')
      .setDescription('Clear last 100 messages');
    super(data, true);
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const channel = await interaction.channel;
    console.log(channel?.id);
    await interaction.reply({ content: 'Pong!', ephemeral: true });
  }
}
