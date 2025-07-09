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
    .setName("questionnaire")
    .setDescription("アンケートを取るよ"),
  // スラッシュコマンドを受け取ると以下が実行される
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "questionnaire") {
      const questionnaire = new ModalBuilder()
        .setCustomId("myModal3")
        .setTitle("記録申請フォーム");

      // モーダルを構成するコンポーネントを定義
      
      const answer = new TextInputBuilder()
        .setCustomId("answer")
        .setLabel("質問を入れてください")
        .setStyle(TextInputStyle.Short);      
      
      
      const question1 = new TextInputBuilder()
        .setCustomId("question1")
        .setLabel("質問1")
        .setStyle(TextInputStyle.Short);
      
      const question2 = new TextInputBuilder()
        .setCustomId("question2")
        .setLabel("質問2")
        .setStyle(TextInputStyle.Short);
      
      const question3 = new TextInputBuilder()
        .setCustomId("question3")
        .setLabel("質問3")
        .setStyle(TextInputStyle.Short);

      const question4 = new TextInputBuilder()
        .setCustomId("question4")
        .setLabel("質問4")
        .setStyle(TextInputStyle.Short);

      // コンポーネントの登録
      
      
            
      const fifthActionRow = new ActionRowBuilder().addComponents(
        answer
      );
      
      const firstActionRow = new ActionRowBuilder().addComponents(
        question1
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        question2
      );

      const thirdActionRow = new ActionRowBuilder().addComponents(
        question3
      );
      
      const fourthActionRow = new ActionRowBuilder().addComponents(
        question4
      );
      
      questionnaire.addComponents(fifthActionRow, firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

      // モーダルの表示
      await interaction.showModal(questionnaire);
    }
  },
};