# 🗻 Mount Bot

A Discord.js bot made for entertainment purposes. Uses [Sapphire](https://www.sapphirejs.dev/) for command handling.

## 💡 Intentions:

- 🎡 Fun commands
- 🙅 No moderation/utility commands

## 👨‍⚖️ Commands
- Help
- Emojify - Turns numbers and alphabets to emojis
  - `String`: Sentence to emojify
- Og - Determines who joined the guild first and returns a custom embed
  - `Guild Member`: Determines who joined the guild first and returns a custom embed

## 💻 Usage
1. Clone the repo:
```shell
git clone https://github.com/Ranger-NF/Mount-Bot
cd Mount-Bot
```

2. Make a new `.env` file with the following entries:
```dotenv
TOKEN="" # Your bot token
PREFIX="" # The prefix you want to use (Currently not in use)
OWNER_ID="" # You discord ID
```

2. Install required packages and start bot in development mode:
```shell
npm i
npm run dev
```

4. Build typescript file and run production code:
```npm
npm run build
npm run start
```
