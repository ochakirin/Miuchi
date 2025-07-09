const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  // スラッシュコマンドの登録
  data: new SlashCommandBuilder()
    .setName("record")
    .setDescription("記録を申請するよ!"),
  
  
  // スラッシュコマンドを受け取ると以下が実行される
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "record") {

      const record = new ModalBuilder()
        .setCustomId("myModal")
        .setTitle("記録申請フォーム");

      // モーダルを構成するコンポーネントを定義
      const userHourInput = new TextInputBuilder()
        .setCustomId("userHourInput")
        .setLabel("時")
        .setStyle(TextInputStyle.Short);
      
      const userMinuteInput = new TextInputBuilder()
        .setCustomId("userMinuteInput")
        .setLabel("分")
        .setStyle(TextInputStyle.Short);
      
      const userSecondInput = new TextInputBuilder()
        .setCustomId("userSecondInput")
        .setLabel("秒")
        .setStyle(TextInputStyle.Short);

      const LiveURLInput = new TextInputBuilder()
        .setCustomId("LiveURLInput")
        .setLabel("配信URL")
        .setStyle(TextInputStyle.Short);

      // コンポーネントの登録
      const firstActionRow = new ActionRowBuilder().addComponents(
        userHourInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        userMinuteInput
      );

      const thirdActionRow = new ActionRowBuilder().addComponents(
        userSecondInput
      );
      
      const fourthActionRow = new ActionRowBuilder().addComponents(
        LiveURLInput
      );
      
      record.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

      // モーダルの表示
      await interaction.showModal(record);
    }
  },
};