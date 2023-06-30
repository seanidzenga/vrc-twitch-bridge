const TwitchBot = require('./ChatMonitor/Bot');

const express = require('express');
const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

app.get('/messages', (request, response) => {
  response.send(TwitchBot.messages);
});

app.get('/users', (request, response) => {
  response.send(TwitchBot.users);
});

app.get('/all', (request, response) => {
  response.send(TwitchBot.all);
})

app.listen(port, () => console.log(`listening on port ${port}`));