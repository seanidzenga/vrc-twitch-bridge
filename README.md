# vrc-twitch-bridge

## Description
A bridge application for providing twitch chat data to a VRChat world.

## Usage

* Define the appropriate environment variables
* Run `node index.js` to start the bot and service
* endpoints are `/messages` `/users` `/all` running on `localhost:3000`

### Environment Variables
* TWITCH_USERNAME - The username of the bot account that should be used
* TWITCH_OAUTH - The oauth token to be used to log in
* TWITCH_CHANNELS - Semicolon delimited list of channels to connect the bot to