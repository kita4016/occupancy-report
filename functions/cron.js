// var mycron = require('./cron').CronJob;
const server = require('./index');

// var task = new mycron({
//   cronTime: '* * * * * *',
//   onTick: function() {
//     // server.sendPushMessage(mes);
//     console.log("実行しました")
//   },
//   start: false, //newした後即時実行するかどうか
//   timeZone: 'Japan/Tokyo'
// });

// task.start();

// var cron = require('node-cron').config({ path: '/Users/s06033/Dev/occupancy-report/functions/node_modules/node-cron' });
var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});