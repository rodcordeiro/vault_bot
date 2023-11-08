import { APIEmbedField, Colors, EmbedBuilder } from 'discord.js';
import { DwellersEntity } from '../../../database/entities';

export const DwellersEmbed = (
  dwellers: DwellersEntity[],
  currentPage: number,
  pages: number,
) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is all your dwellers!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350',
    )
    .setFooter({
      text: `Page: ${currentPage}/${pages}`,
    });
  dwellers.map((dweller) =>
    embed.addFields([
      {
        name: 'Name: ',
        value: dweller.name,
        inline: true,
      },
      {
        name: 'lvl: ',
        value: dweller.lvl.toString(),
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
    ] as APIEmbedField[]),
  );
  return embed;
};
export const DwellerProfileEmbed = (dweller: DwellersEntity) => {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('Here is your dweller profile!')
    .setAuthor({
      name: 'Dweller vault manager',
    })
    .setThumbnail(
      dweller.gender === 'M'
        ? 'https://freepngimg.com/save/140471-pip-boy-images-fallout-download-free-image/1600x2350'
        : 'https://64.media.tumblr.com/07ad1ad60c8bcda07105743dfe69158b/tumblr_oyvbz6EXqh1qzg1pfo4_r3_400.png',
    )
    .addFields([
      {
        name: 'Name: ',
        value: dweller.name,
      },
      {
        name: 'lvl: ',
        value: dweller.lvl.toString(),
        inline: true,
      },
      {
        name: 'Gender: ',
        value: dweller.gender,
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
      {
        name: 'strength: ',
        value: dweller.strength.toString(),
        inline: true,
      },
      {
        name: 'perception: ',
        value: dweller.perception.toString(),
        inline: true,
      },
      {
        name: 'endurance: ',
        value: dweller.endurance.toString(),
        inline: true,
      },
      {
        name: 'charism: ',
        value: dweller.charism.toString(),
        inline: true,
      },
      {
        name: 'intelligence: ',
        value: dweller.intelligence.toString(),
        inline: true,
      },
      {
        name: 'agility: ',
        value: dweller.agility.toString(),
        inline: true,
      },
      {
        name: 'luck: ',
        value: dweller.luck.toString(),
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
      {
        name: 'Born in the vault? ',
        value: dweller.father ? 'Yes' : 'No',
        inline: true,
      },
    ]);
  return embed;
};
