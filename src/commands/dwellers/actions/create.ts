import {
  ActionRowBuilder,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import { DwellerTypes } from 'src/common/interfaces/dweller.interface';
import { DwellerServices } from 'src/services/dweller.service';

export const CreateDweller = async (interaction: ModalSubmitInteraction) => {
  await interaction.deferReply({ ephemeral: false });
  const fields = Object.fromEntries(
    interaction.fields.fields.map((field) => [field.customId, field.value]),
  );
  if (fields.create_dweller_modal_vault_kid === 'false') {
    const dweller = await DwellerServices.store({
      name: fields.create_dweller_modal_title,
      lvl: +fields.create_dweller_modal_lvl,
      gender:
        fields.create_dweller_modal_gender === 'M'
          ? DwellerTypes.Gender.Male
          : DwellerTypes.Gender.Female,
      Strength: +fields.create_dweller_modal_strength,
      Perception: 1,
      Endurance: 1,
      Charisma: 1,
      Intelligence: 1,
      Agility: 1,
      Luck: 1,
      owner: interaction.user.id,
    });
    return await interaction.editReply({
      content: JSON.stringify(dweller),
    });
  }
  const dwellers = await DwellerServices.list();
  const momSelect = new StringSelectMenuBuilder()
    .setCustomId('mother')
    .setPlaceholder("Who's the mom?")
    .addOptions(
      dwellers
        .filter((dweller) => dweller.gender === DwellerTypes.Gender.Female)
        .map((dweller) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(dweller.name)
            .setValue(dweller.id),
        ),
    );
  const dadSelect = new StringSelectMenuBuilder()
    .setCustomId('mother')
    .setPlaceholder("Who's the dad?")
    .addOptions(
      dwellers
        .filter((dweller) => dweller.gender === DwellerTypes.Gender.Male)
        .map((dweller) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(dweller.name)
            .setValue(dweller.id),
        ),
    );

  const dadRow = new ActionRowBuilder().addComponents(dadSelect);
  const momRow = new ActionRowBuilder().addComponents(momSelect);

  await interaction.editReply({
    content: 'Choose the parents:',
    components: [momRow, dadRow],
  });
};
