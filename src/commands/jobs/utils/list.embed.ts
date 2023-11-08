import { APIEmbedField, Colors, EmbedBuilder } from 'discord.js';
import { JobsEntity, AssignmentEntity } from '../../../database/entities';

export const PaginatedJobsEmbeded = (
  jobs: JobsEntity[],
  currentPage: number,
  pages: number,
) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is all your jobs!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .setFooter({
      text: `Page: ${currentPage}/${pages}`,
    });
  jobs.map((job) =>
    embed.addFields([
      {
        name: 'Name: ',
        value: job.name,
        inline: true,
      },
      {
        name: 'Place: ',
        value: job.place.name,
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
    ] as APIEmbedField[]),
  );
  return embed;
};
export const JobEmbeded = (job: JobsEntity) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is your Job details!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .addFields([
      {
        name: 'Name: ',
        value: job.name,
      },
      {
        name: 'Local: ',
        value: job.place.name,
        inline: true,
      },
    ]);
  return embed;
};

export const AssignmentEmbed = (job: AssignmentEntity) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is your Job details!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .addFields([
      {
        name: 'Job: ',
        value: job.job.name,
      },
      {
        name: 'Worker: ',
        value: job.dweller.name,
        inline: true,
      },
    ]);
  return embed;
};
