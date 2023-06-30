const TwitchBot = require('twitch-bot');

const twitchUsername = process.env.TWITCH_USERNAME;
const twitchOAuth = process.env.TWITCH_OAUTH;
const twitchChannels = process.env.TWITCH_CHANNELS;

if(twitchUsername === undefined){
  console.log('Twitch username was undefined, did you forget to add it to the environment?');
  console.log(`TWITCH_USERNAME: ${process.env.TWITCH_USERNAME}`);
  return;
}

if(twitchOAuth === undefined){
  console.log('OAuth key was undefined, did you forget to add it to the environment?');
  console.log(`TWITCH_OATH: ${process.env.TWITCH_OAUTH}`);
  return;
}

if(twitchChannels === undefined){
  console.log('Twitch channels were undefined, did you forget to add them to the environment?');
  console.log(`TWITCH_CHANNELS: ${process.env.TWITCH_CHANNELS}`);
  return;
}

const Bot = new TwitchBot({
  username: twitchUsername,
  oauth: twitchOAuth,
  channels: [twitchChannels]
})

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`);
})

Bot.on('error', error => {
  console.log(error);
})

Bot.on('message', chatter => {
  console.log(chatter.message);
})

Bot.join('subfrequencies');