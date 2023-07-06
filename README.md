# vrc-twitch-bridge

## Description
A bridge application for providing twitch chat data to a VRChat world.

## Usage

* Define the appropriate environment variables
* Run `node index.js` to start the bot and service
* Hosted on `localhost:3000` endpoints:
    * `/messages` retrieves all messages for all channels
    * `/messages/[name of channel here]` retrieves messages only for the specified channel e.g. `/messages/ironmouse` would return only messages from the ironmouse twitch channel
    * `users` are provided on all endpoints

### Environment Variables
* TWITCH_USERNAME - The username of the bot account that should be used
* TWITCH_OAUTH - The oauth token to be used to log in
* TWITCH_CHANNELS - Semicolon delimited list of channels to connect the bot to