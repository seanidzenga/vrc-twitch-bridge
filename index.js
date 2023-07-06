const TwitchBot = require('./ChatMonitor/Bot');

const express = require('express');
const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

app.get('/messages/:id', (request, response) => {
  // console.log(request.params.id);
  let channel = request.params.id;

  if(TwitchBot.channels[request.params.id] == null){
    response.send({});
  }else{
    response.send(
      {
        ...TwitchBot.channels[request.params.id],
        users : TwitchBot.users,
      }
    );
  }
});

app.get('/messages', (request,response) => {
  response.send({
    "channels" : TwitchBot.channels,
    "users" : TwitchBot.users,
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));