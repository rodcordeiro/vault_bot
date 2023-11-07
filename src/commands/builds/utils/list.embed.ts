import { APIEmbedField, Colors, EmbedBuilder } from 'discord.js';
import { BuildEntity } from 'src/database/entities';

export const PaginatedBuildEmbeded = (
  builds: BuildEntity[],
  currentPage: number,
  pages: number,
) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is all your builds!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .setFooter({
      text: `Page: ${currentPage}/${pages}`,
    });
  builds.map((build) =>
    embed.addFields([
      {
        name: 'Name: ',
        value: build.name,
        inline: true,
      },
      {
        name: 'lvl: ',
        value: build.lvl.toString(),
        inline: true,
      },
      {
        name: 'Attr: ',
        value: build.attribute,
        inline: true,
      },
    ] as APIEmbedField[]),
  );
  return embed;
};
export const BuildEmbeded = (build: BuildEntity) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is your build details!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .addFields([
      {
        name: 'Name: ',
        value: build.name,
      },
      {
        name: 'lvl: ',
        value: build.lvl.toString(),
        inline: true,
      },
      {
        name: 'Attr: ',
        value: build.attribute,
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
      {
        name: 'Max Workers: ',
        value: build.max_workers.toString(),
        inline: true,
      },
      {
        name: 'Size: ',
        value: ['Small', 'Medium', 'Large'][build.combined - 1],
        inline: true,
      },
    ]);
  return embed;
};
