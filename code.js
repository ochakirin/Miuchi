const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const axios = require("axios");

const {Client, GatewayIntentBits} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});



client.on("ready", () => {
  console.log("Bot準備完了！");
});

//ここから



//ここまで



//modal表示の設定

const fs = require("node:fs");
const path = require("node:path");
const {Collection, Events } = require("discord.js");
const TOKEN = process.env.DISCORD_BOT_TOKEN;


// 各コマンドの読み込み
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// 取得した.jsファイル内の情報から、コマンドと名前をListenner-botに対して設定
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING]  ${filePath} のコマンドには、必要な "data" または "execute" プロパティがありません。`);
	}
}

// BOTが稼働できる状態にあるかの確認
client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

// Discordからコマンドを受け取り、それに応じた処理を行う
client.on(Events.InteractionCreate, async (interaction) => {

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "このコマンドの実行中にエラーになりました。ごめんね。",
      ephemeral: true,
    });
  }
});

// モーダルで受け取った入力値をDiscordに送信する
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'myModal') {
  
  const userHourInput = interaction.fields.getTextInputValue("userHourInput");
  const userMinuteInput = interaction.fields.getTextInputValue("userMinuteInput");
  const userSecondInput = interaction.fields.getTextInputValue("userSecondInput");
  const LiveURLInput = interaction.fields.getTextInputValue("LiveURLInput");
  console.log({ userHourInput, userMinuteInput, userSecondInput, LiveURLInput });
  var time = userHourInput + ":" + userMinuteInput + ":" +  userSecondInput;
  await interaction.reply({
    content: "記録：\n" +  time + "\n" + "配信URL：\n" + LiveURLInput  + "\n" + "で申請しました",
  });
    
       var membername = interaction.member.displayName;
       var chatname = interaction.channel.name;
    
              client.channels
              .cache.get('1355196242283598025')
              .send(`@everyone` +
                "\n" +
               chatname + 'の' + membername + 'さんから記録が申請されています。\n運営は確認してください。\n確認が終わったらメンションをつけてください。'
              );
  
var id2 = interaction.member.id;
var id3 = '';
var id4 = interaction.channel.id;
var id5 = time;
var id6 = LiveURLInput;
var id7 = 'record';
  
           // 形式に添ってspreadsheetに出力
          var url2 = process.env.GAS_URL;
  
          // spreadsheet URLにパラメータを付加
          url2 = `${url2}?id2=${id2}&id3=${id3}&id4=${id4}&id5=${id5}&id6=${id6}&id7=${id7}`;

          // 文字コードの変換
          url2 = encodeURI(url2);
  
  // API通信
const doApi2 = async () => {
  try {
    await axios.get(url2);
  } catch (error) {
    console.log("Error message: " + error.message);
  }
};


// 実行
doApi2(); 
  } ;
  
  if (interaction.customId === 'myModal2') {
     
  const scheduleyearInput = interaction.fields.getTextInputValue("scheduleyearInput");
  const scheduleMonthInput = interaction.fields.getTextInputValue("scheduleMonthInput");
  const scheduleTimeInput = interaction.fields.getTextInputValue("scheduleTimeInput");
  const scheduletitle = interaction.fields.getTextInputValue("scheduletitle");
  const schedulecomponent = interaction.fields.getTextInputValue("schedulecomponent");
  console.log({ scheduleyearInput, scheduleMonthInput, scheduleTimeInput, scheduletitle ,schedulecomponent });
  var time = scheduleyearInput + "/" + scheduleMonthInput + " " +  scheduleTimeInput + ":00";
  await interaction.reply({
    content: time + "に下記内容をリマインドします\nタイトル：" +  scheduletitle + "\n内容：\n" + schedulecomponent
  });   
    
    
var id2 = interaction.member.id;
var id3 = scheduletitle;
var id4 = interaction.channel.id;
var id5 = time;
var id6 = schedulecomponent;
var id7 = 'schedule';
  
           // 形式に添ってspreadsheetに出力
          var url2 = process.env.GAS_URL;
  
          // spreadsheet URLにパラメータを付加
          url2 = `${url2}?id2=${id2}&id3=${id3}&id4=${id4}&id5=${id5}&id6=${id6}&id7=${id7}`;

          // 文字コードの変換
          url2 = encodeURI(url2);
  
  // API通信
const doApi2 = async () => {
  try {
    await axios.get(url2);
  } catch (error) {
    console.log("Error message: " + error.message);
  }
};


// 実行
doApi2(); 
  } ;  
  

  if (interaction.customId === 'myModal3') {
  
  const question1 = interaction.fields.getTextInputValue("question1");
  const question2 = interaction.fields.getTextInputValue("question2");
  const question3 = interaction.fields.getTextInputValue("question3");
  const question4 = interaction.fields.getTextInputValue("question4");
  const answer = interaction.fields.getTextInputValue("answer");

  
    await interaction.reply({
    content: "アンケートにご回答ください\n"+ answer +"\n1：" +  question1  + "\n2：" +  question2 + "\n3：" +  question3 + "\n4：" +  question4
    });
    
  };



});


client.login(process.env.DISCORD_BOT_TOKEN);