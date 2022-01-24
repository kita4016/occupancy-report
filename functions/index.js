const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const app = express();
const line = require("@line/bot-sdk");
const moment = require('moment-timezone');
const config = {
  channelAccessToken: "X0+qhbiSoCjGjDetqljynC+XYWsghpz4KFyG26ENsUp2DLGISU2KsJT5WAUPK7JwAtlZto65apuIKbEAQ+No+2kKdiPxhvhEYSXpfWpIDL8Qd/ylW579b9nAbfXle1n9tTfTPwOppf0GRQn4BI19kgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "14a69eec468b6b5841f677a4e2aa8d87",
};
const client = new line.Client(config);
  
  app
      .post("/hook", line.middleware(config), (req, res)=> lineBot(req, res));
  
  const lineBot = (req, res) => {
    res.status(200).end();
    const events = req.body.events;
    const promises = [];
    for (let i=0; i<events.length; i++) {
      const ev = events[i];
      console.log(ev);
      for (let i=0; i<events.length; i++) {
        const ev = events[i];
        // イベントタイプにより仕分け
        switch (ev.type) {
          // 友達登録
        //   case "follow":
        //     promises.push(handleFollowEvent(ev));
        //     break;
          // メッセージイベント
          case "message":
            promises.push(handleMessageEvent(ev));
            break;
          // ポストバックイベント
        //   case "postback":
        //     promises.push(handlePostbackEvent(ev));
        //     break;
        }
      }
    }
    Promise
        .all(promises)
        .then(() => console.log("all promises passed"))
        .catch((e) => console.error(e.stack));
  };

//   function sendPushMessage(mes) {
//     client.pushMessage('U10c2d58a0128e19ef170d219e4203e00', {
//      type: 'text',
//      text: mes,
//     })
//     console.log(moment().tz("Asia/Tokyo").format() + ' 送信完了：push message');
//  }
  
//   const handleMessageEvent = (ev) => {
//     const text = ev.message.text;
//     client.replyMessage(ev.replyToken, {
//         type: "text",
//         text,
//     });
//   };

// client.pushMessage('U10c2d58a0128e19ef170d219e4203e00', {
//     type: 'text',
//     text: 'hello, world',
//   })

function sendPushMessage(mes) {
    client.broadcast({
     type: 'text',
     text: mes,
    })
    console.log(moment().tz("Asia/Tokyo").format() + ' 送信完了：push message');
 }

 exports.scheduledFunction = functions.region('asia-northeast1').pubsub.schedule('0 10 * * 1-5')
  .timeZone('Asia/Tokyo') // 必ずタイムゾーンを指定します。
  .onRun( async (context) => {
  const mes = `おはようございます！
朝10時になりました！
スプシに記入お願いします。
   
https://docs.google.com/spreadsheets/d/1iaL3mKinv-LxvCZiF0NtvhwoJJz3MjCz/edit#gid=616395506`
    // const mes = 'これはテストです'
  await sendPushMessage(mes);
});
  exports.app = functions.region('asia-northeast1').https.onRequest(app);