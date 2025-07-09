const http = require("http");
const querystring = require("node:querystring");
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

//GASでwakeさせること。

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          res.end("No post data");
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
//リマインドに反応して特定チャンネルへ投稿を行います
            if (dataObject.type == "remind") {
          var jsonarrangement = JSON.parse(dataObject.content);
          var jsonDeployment;
          var planstring;
          var planchannel;
          var r = 0;
        
        console.log("post:" + jsonarrangement + r);

          for (r = 0; r < jsonarrangement.length; r++) {
            jsonDeployment = jsonarrangement[r];
            planstring = jsonDeployment[0];
            planchannel = jsonDeployment[1];

            
            planchannel.toString();

            console.log(planstring);
            console.log(planchannel);

               client.channels
              .cache.get(planchannel)
              .send(
                 '@everyone' + "\n" +
                  planstring +
                  "\n とnanaさんがおっしゃっています。"
              );

          };
          };

 //応募フォームと連携してリマインドを送ります       
              if (dataObject.type == "notice") {
          var jsonarrangement = JSON.parse(dataObject.content);
          var jsonDeployment;
          var noticestring;
          var noticechannel;
          var r = 0;


          for (r = 0; r < jsonarrangement.length; r++) {
            jsonDeployment = jsonarrangement[r];
            noticestring = jsonDeployment[0];
            noticechannel = jsonDeployment[1];

            
            noticechannel.toString();

            console.log(noticestring);
            console.log(noticechannel);

                        client.channels
              .cache.get(noticechannel)
              .send(`@everyone` +
                "\n" +
                   noticestring +
                  "から裏方応募が届ています。対応が完了したらリアクションをつけてください。"
              );

          };
          };
  
  //ノルマ報告と連携してリマインドを送ります       
              if (dataObject.type == "quota") {
          var jsonarrangement = JSON.parse(dataObject.content);
          var jsonDeployment;
          var noticestring;
          var noticechannel;
          var r = 0;


          for (r = 0; r < jsonarrangement.length; r++) {
            jsonDeployment = jsonarrangement[r];
            noticestring = jsonDeployment[0];
            noticechannel = jsonDeployment[1];

            
            noticechannel.toString();

            console.log(noticestring);
            console.log(noticechannel);

                        client.channels
              .cache.get(noticechannel)
              .send(`@everyone` +
                "\n" +
                   noticestring +
                  "からノルマ報告が届ています。対応が完了したらリアクションをつけてください。"
              );

          };
          };

  

  //生存報告を促します      
          if (dataObject.type == "confirmation") {
          var jsonarrangement = JSON.parse(dataObject.content);
          var jsonDeployment;
          var seizonname;
          var seizonid;
          var seizonchannel;
          var r = 0;

          for (r = 0; r < jsonarrangement.length; r++) {
            jsonDeployment = jsonarrangement[r];
            seizonname = jsonDeployment[0];
            seizonid = jsonDeployment[1];
            seizonchannel = jsonDeployment[2];

            seizonid.toString();
            seizonchannel.toString();

            console.log(seizonname);
            console.log(seizonid);
            console.log(seizonchannel);

            client.channels
              .cache.get(seizonchannel)
              .send(
                `<@!${seizonid}>` + "\n" +
                  seizonname +
                  "さんへ\n\n生存報告をお願いします。"
              );
          }
        }      
        
  //OPEN AIと連携して質問に返答します      
          if (dataObject.type == "answer") {
          var jsonarrangement = JSON.parse(dataObject.content);
          var jsonDeployment;
          var planstring;
          var planchannel;
          var planid;
          var r = 0;
        
        console.log("post:" + jsonarrangement + r);

          for (r = 0; r < jsonarrangement.length; r++) {
            jsonDeployment = jsonarrangement[r];
            planstring = jsonDeployment[0];
            planchannel = jsonDeployment[1];
            planid = jsonDeployment[2];

            
            planchannel.toString();
            planid.toString();

            console.log(planstring);
            console.log(planchannel);
            console.log(planid);


                        client.channels
              .cache.get(planchannel).send(
                  `<@!${planid}>` + "\n" + planstring
              );

          }
            }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is Oprateing!");
    }
  
  })
  .listen(3000);

//サーバーに投稿したメッセージに反応します
 client.on('messageCreate', message => {
   
    
 　if (message.author.id === client.user.id) return;//二重反応を防ぐ
   
   if (message.mentions.users.has(client.user.id)) {



//文言に質問が含まれている場合、OPEN AIへ質問を連携します
if (message.content.includes('ノルマ')) {

var date = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
   day: "2-digit"}).replaceAll('/', '-')  
  
var result = 'https://docs.google.com/forms/d/e/1FAIpQLSdbIHyC4VktFCmCWcBUD6WOms3Emq9S_Y3-iOYn441bSLpJNA/viewform?usp=pp_url&entry.2045982873='
+ message.member.displayName 
+ '&entry.1856541690=' + date
+ '&entry.662266852=' + message.member.id

message.reply('下記URLからノルマの提出をお願いします。'+ "\n" +
  '専用URLなので他のメンバーはURLを再利用せず都度申請をお願いします。'+ "\n" +
  result);
  
}else if (message.content.includes('リマインド')) {

  
var result = 'https://docs.google.com/forms/d/e/1FAIpQLSceeFZl1BdtA9t0vIPsQNUDvUBZnOEjlkR3PLXNfWPyzZlbBQ/viewform?usp=pp_url&entry.487257199=' 
+ message.channel.id

message.reply(result);
  
}else if (message.content.includes('カウントダウン')) {

//カウントダウンの文言が含まれている場合、カウントダウンを行います
  
  var count = 5;
  var interval_id = null;
  var text_number;

  interval_id = setInterval(() => {

    if( 1 <= count ) {

      text_number = count;
      message.channel.send(String(text_number));
      count--;

    } else {
      clearInterval(interval_id);
      message.reply('スタート');
    }

  }, 1000);
  }else{
    
 //文言に質問が含まれている場合、OPEN AIへ質問を連携します
  
var questioncontent = message.content;
  
  questioncontent = questioncontent.replace('<@1094318241855320244>', '');
    
var id2 = message.member.id;
var id3 = questioncontent;
var id4 = message.channel.id;
var id5 = '';
var id6 = '';
var id7 = 'question';
 
  console.log(id3);
  
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
  
  };

//メンションに対してリアクションをつけます
message.react('👍');
   
  }

//おみくじに反応して結果を返します
if (message.content.includes('おみくじ')) {
  
     let arr = [
      "今日のあなたは超吉！神速のタイムを体現せよ！",
      "今日のあなたは大吉！ピエも1ツモできちゃうかも！？",
      "今日のあなたは大吉！転売もはかどる",
      "今日のあなたは大吉！メタルを倒しに行くとなおよい",
      "今日のあなたは大吉！どのボスもまどろみで寝る",
      "今日のあなたは中吉！ガーゴイルからてつかぶとを期待してもよい",
      "今日のあなたは中吉！並走でいい運がひけるかも？",
      "今日のあなたは中吉！探し物（杖）見つかる。",
      "今日のあなたは小吉。走りも無難にまとまる。",
      "今日のあなたは小吉。デスタムーアは安全に攻めれば好機有。",
      "今日のあなたは小吉。セーブを欠かさなければプレイも安らぐ。",
      "今日のあなたは小吉。死の首飾りは10ツモ。",
      "今日のあなたは吉。可もなく不可もなく、とりあえず最後まで通してみましょう。",
      "今日のあなたは吉。平運オブザ平運。上振れは期待するな。",
      "今日のあなたは吉。メタル狩りは初のうち思ふ様に無。",
      "今日のあなたは吉。ラーミアの鳴きまねで運は上向く。",
      "今日のあなたは凶・・・食い逃げ多発、心せよ。",
      "今日のあなたは凶・・・バイキルは調整すべし。",
      "今日のあなたは凶・・・1回はフリーズを覚悟せよ。",
      "今日のあなたは凶・・・はぐれメタルの群れに焼かれる",
      "今日のあなたはミルド凶・・・打撃！",
      "今日のあなたは大凶・・・バラモスも寝ない。安定を取るべし。",
      "今日のあなたは大凶・・・まじんぎり。みなごろし。痛恨の一撃。",
      "今日のあなたは大凶・・・ラリホー永眠しないよう祈れ。",
      "今日のあなたは大凶・・・ブラディーポのスカラ麻痺に備えるべし。",
      "今日のあなたは大凶・・・マルチェロのHPが53万に。",
      "今日のあなたは超凶・・・バルログ襲い掛かり！ザラキ！ビンゴ！！！",
    ];

  var random = Math.floor(Math.random() * arr.length);
  var result = arr[random];
  message.reply(result);}

   

//あらめしに反応して結果を返します   
if (message.content.includes('あらめし')) {
  
     let arr = [
      "デリシャス",
      "なんちゅうもんを食わせてくれたんや、なんちゅうもんを…",
      "うーん・・・75点！",
      "明日もう一度ここに来てください。本物のあら飯というものをお見せしますよ",
      "うわあ　柏手ダァ!!!　いきなり出ちまったぞォ!!!",
      "おいしそうですね",
      "まさに生ゴミ…シェフを呼べ！",
      "ほー いいじゃないか こういうのでいいんだよ こういうので",
      "今日はフルコースですね",
      "でりーしゃす",
      "ほう炭酸抜きコーラですか…たいしたものですね",
    ];

  var randomara = Math.floor(Math.random() * arr.length);
  var resultara = arr[randomara];
  message.reply(resultara);}
   
  //返信者の情報を格納

  var id2 = message.member.id;
  var id3 = '';
  var id4 = message.channel.id;
  var id5 = '';
  var id6 = '';
  var id7 = '';
 
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
  
      
 })


if (process.env.DISCORD_BOT_TOKEN == undefined || process.env.DISCORD_BOT_TOKEN == "") {
  console.log("DISCORD_BOT_TOKENを設定してください。");
  process.exit(0);
}




//require("./code.js")

client.login(process.env.DISCORD_BOT_TOKEN);