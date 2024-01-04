/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { BaseCommand } from '../../common/commands/base.command';

export default class CleanupCommand extends BaseCommand {
  constructor() {
    const data = new SlashCommandBuilder()
      .setName('cleanup')
      .setDescription('Clear last 100 messages');
    super(data, true);
  }

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const messages = await interaction.channel?.messages
        .fetch()
        .then((data) => data.filter((message) => message.deletable))
        .then(async (data) => {
          const len = data.size;

          return {
            len,
            promises: data.each(
              (message) =>
                new Promise((resolve) => {
                  message.delete().then(() => resolve(true));
                }),
            ),
          };
        })
        .catch((err) => {
          throw err;
        });
      await interaction.reply({
        content: `${messages?.len} messages included for deleting. Processing it all.`,
      }),
        await Promise.all(messages!.promises);
    } catch (e) {
      console.error(e);
      await interaction.reply('fudeu');
    }
  }
}
