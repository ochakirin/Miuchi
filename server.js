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
                  "\n とジャック様がおっしゃっています。"
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
                  "からチーム応募が届ています。対応が完了したらリアクションをつけてください。"
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
  
var result = 'https://docs.google.com/forms/d/e/1FAIpQLSdCaLceeWB7xvW4g-uH3sp-mwVjr9t8Co9ZvQyuWYDNuLgYuA/viewform?usp=pp_url&entry.2045982873='
+ message.member.displayName 
+ '&entry.1856541690=' + date
+ '&entry.662266852=' + message.member.id

message.reply('下記URLからノルマの提出をお願いします。'+ "\n" +
  '専用URLなので他のメンバーはURLを再利用せず都度申請をお願いします。'+ "\n" +
  result);
  
}else if (message.content.includes('リマインド')) {

  
var result = 'https://docs.google.com/forms/d/e/1FAIpQLSeyCyTu1PRrqw4r7eTc6nFb30zVWXBOwGwXJP722vTCG2OvRA/viewform?usp=pp_url&entry.487257199=' 
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
      "今日のあなたは超吉！鉄の斧ドロップ確定！",
      "今日のあなたは超吉！メタリンツモできる！即座にチャートを確認せよ！",
      "今日のあなたは大吉！ピエも1ツモできちゃうかも！？",
      "今日のあなたは大吉！ベロリンマン3発全部命中できる！",
      "今日のあなたは大吉！御茶麒麟さんが焼肉をおごってくれる！かも...？",
      "今日のあなたは大吉！会心技の命中率が80％越え！？",
      "今日のあなたは中吉！メタルエンカでとまどい！狩るチャンス！",
      "今日のあなたは中吉！並走でいい運がひけるかも？",
      "今日のあなたは中吉！デスマシーンがマジバリをしない！？攻めるチャンス！",
      "今日のあなたは中吉！キャプテンクロウがエロおやじ！ノーダメ撃破チャンス！",
      "今日のあなたは小吉。様子を見ないハンク！？全力でハンクを応援すべし。",
      "今日のあなたは小吉。鋼の鎧高額買取！その先も気を抜くことなかれ。",
      "今日のあなたは小吉。セーブを欠かさなければプレイも安らぐ。",
      "今日のあなたは小吉。まじゅうの皮ドロップ！その後のボスでちょっと安定する・・・かも？", 
      "今日のあなたは小吉。常に金欠...所持金に注意！",
      "今日のあなたは吉。可もなく不可もなく、とりあえず最後まで通してみましょう。",
      "今日のあなたは吉。平運オブザ平運。上振れは期待するな。",
      "今日のあなたは吉。無難にオルゴを13分で撃破。",
    　"今日のあなたは吉。茶番をしてたらフラグを忘れてた！チャートを見直すべし。",
      "今日のあなたは吉。トロデーンはぐれ30分抜け。・・・ザ平運！",
      "今日のあなたは吉。七色のしずく参拝に注意！",
      "今日のあなたは凶・・・中盤で腹痛！食べ物の賞味期限を確認せよ！",
      "今日のあなたは凶・・・50ためピロ！アイドル、ゲモン、ベホイミに気をつけろ！",
      "今日のあなたは凶・・・3万ゴールド強奪に注意すべし。",
      "今日のあなたは凶・・・ゲマからメラゾーマ集中2連続。リカバリー策を準備せよ。",
      "今日のあなたは大凶・・・被ダメが最大乱数ばかり。即座に気持ちを切り替えよう！",
      "今日のあなたは大凶・・・冷気マダンテ・・・ドンマイ。",
      "今日のあなたは大凶・・・カンダタから痛恨2連発。世界樹の葉の補充を忘れずに。",
      "今日のあなたは超凶・・・ピサロの手先5乙・・・心の平穏を保つものを用意すべし。",
      "今日のあなたは超凶・・・雪の女王5乙・・・ベラを応援せよ！",
      "今日のあなたは超凶・・・イノゴン5乙・・・そういうときもある？よね？",
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
