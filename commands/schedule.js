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
    .setName("schedule")
    .setDescription("リマインドするスケジュールを登録するよ！"),
  // スラッシュコマンドを受け取ると以下が実行される
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "schedule") {
            console.log("schedule");
      const schedule = new ModalBuilder()
        .setCustomId("myModal2")
        .setTitle("スケジュール登録フォーム");

      // モーダルを構成するコンポーネントを定義
      const scheduleyearInput = new TextInputBuilder()
        .setCustomId("scheduleyearInput")
        .setLabel("スケジュールの年")
        .setStyle(TextInputStyle.Short);
      
      const scheduleMonthInput = new TextInputBuilder()
        .setCustomId("scheduleMonthInput")
        .setLabel("スケジュールの月日（半角で入力「例：12/13」)")
        .setStyle(TextInputStyle.Short);
      
      
      const scheduleTimeInput = new TextInputBuilder()
        .setCustomId("scheduleTimeInput")
        .setLabel("スケジュールの時間（半角で入力「例19:30」）")
        .setStyle(TextInputStyle.Short);
      

      const scheduletitle = new TextInputBuilder()
        .setCustomId("scheduletitle")
        .setLabel("リマインドタイトル")
        .setStyle(TextInputStyle.Short);
      
      const schedulecomponent = new TextInputBuilder()
        .setCustomId("schedulecomponent")
        .setLabel("リマインドの内容")
        .setStyle(TextInputStyle.Paragraph);

      // コンポーネントの登録
      const firstActionRow = new ActionRowBuilder().addComponents(
        scheduleyearInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        scheduleMonthInput
      );

      
      const fourthActionRow = new ActionRowBuilder().addComponents(
        scheduleTimeInput
      );
      
      const fifthActionRow = new ActionRowBuilder().addComponents(

        scheduletitle
      );
      
      const seventhActionRow = new ActionRowBuilder().addComponents(
        schedulecomponent
      );
      
      schedule.addComponents(firstActionRow, secondActionRow, fourthActionRow, fifthActionRow, seventhActionRow);

      // モーダルの表示
      await interaction.showModal(schedule);
    }
  },
};