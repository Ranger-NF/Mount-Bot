# Mount Bot

A Discord.js bot made for entertainment purposes. Uses [Sapphire](https://www.sapphirejs.dev/) for command handling.

## Intentions:

- Fun commands
- No moderation/utility commands

## Commands
- Help
- Emojify - Turns numbers and alphabets to emojis
  - Options: `string` - Sentence to emojify
- Og - Determines who joined the guild first and returns a custom embed
  - Options: `Guild Member` - Determines who joined the guild first and returns a custom embed

## Usage
Clone the repo:
```shell
git clone https://github.com/Ranger-NF/Mount-Bot
cd Mount-Bot
```

Make a new `.env` file with the following entries:
```dotenv
TOKEN="" # Your bot token
PREFIX="" # The prefix you want to use (Currently not in use)
OWNER_ID="" # You discord ID
```

Run the following commands
```shell
npm i
npm run dev
```

Running on production
```npm
npm run build
npm run start
```
