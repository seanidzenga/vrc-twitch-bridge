const tmi = require('tmi.js');

const twitchUsername = process.env.TWITCH_USERNAME;
const twitchOAuth = process.env.TWITCH_OAUTH;
const twitchChannels = process.env.TWITCH_CHANNELS.split(";");

let messages = [];
let users = {};
let all = { 
  'messages' : [],
  'users' : {}
};

const maxMessages = 20;

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

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: twitchUsername,
    password: twitchOAuth
  },
  channels: twitchChannels
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {

  if (messages.length === maxMessages) messages.pop();

  messages.unshift({
    "user" : tags.username,
    "message" : message
  });

  if(!users.hasOwnProperty(tags.username)){
    users[tags.username] = tags;
  }

  all['messages'] = messages;
  all['users'] = users;

  // TODO - we can get emotes in messages when they're used
  // unfortunately without dynamic vrcurl creation we can't do much in-client about them
  // what we *could* do for now, however, is find a way to match some emotes
  // to in-game sprites and substitute those when they show up
  // this obviously won't work for all of them.

  // for future reference - https://static-cdn.jtvnw.net/emoticons/v1/[emote_id]/[size]
  // this url will get you an emoji provided data from tags.emotes, such as 
  // emotes: { emotesv2_7432e844fa7e46ea80307a83c4c417f4: [ '0-19' ] }
  // the array tells you which characters in the message should be replaced with the image
  // given this we'd use this url: https://static-cdn.jtvnw.net/emoticons/v1/emotesv2_7432e844fa7e46ea80307a83c4c417f4/1.0
  // size ranges 1.0, 2.0, 3.0 and give you 28x28, 56x56, 112x112 respectively
});

exports.all = all;
exports.messages = messages;
exports.users = users;