/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { client } from 'src/core/discord/client.discord';

export const CreateDwellersModal = async (
  interaction: ChatInputCommandInteraction,
) => {
  const modal = new ModalBuilder()
    .setCustomId('create_dweller_modal')
    .setTitle('Dweller registration');

  const DwellerName = new TextInputBuilder()
    .setCustomId('create_dweller_modal_title')
    .setLabel('Dweller name:')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setValue(interaction.options.getString('name') || '');
  const dwellerGender = new TextInputBuilder()
    .setCustomId('create_dweller_modal_gender')
    .setLabel('Dweller gender:')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Please insert M, for male, or F, for female');
  const dwellerLevel = new TextInputBuilder()
    .setCustomId('create_dweller_modal_lvl')
    .setLabel('Dweller Level:')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
  const dwellerStrength = new TextInputBuilder()
    .setCustomId('create_dweller_modal_strength')
    .setLabel('Dweller Strength:')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
  const dwellerPerception = new TextInputBuilder()
    .setCustomId('create_dweller_modal_perception')
    .setLabel('Dweller Strength:')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const vaultKid = new TextInputBuilder()
    .setCustomId('create_dweller_modal_vault_kid')
    .setLabel('Is dweller born in vault?')
    .setStyle(TextInputStyle.Short)
    .setValue(`${!!interaction.options.getBoolean('kid')}`);

  const titleActionRow = new ActionRowBuilder().addComponents(DwellerName);
  const descriptionActionRow = new ActionRowBuilder().addComponents(
    dwellerGender,
  );
  const levelActionRow = new ActionRowBuilder().addComponents(dwellerLevel);
  const strengthActionRow = new ActionRowBuilder().addComponents(
    dwellerStrength,
  );
  const perceptionActionRow = new ActionRowBuilder().addComponents(
    dwellerPerception,
  );
  const vaultKidActionRow = new ActionRowBuilder().addComponents(vaultKid);

  modal.addComponents(
    // @ts-ignore
    titleActionRow,
    descriptionActionRow,
    levelActionRow,
    vaultKidActionRow,
    strengthActionRow,
    // perceptionActionRow,
  );

  client.modalHandlers?.push({
    modal: 'create_dweller_modal',
    command: 'dwellers',
  });

  return await interaction.showModal(modal);
};
