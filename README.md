# Kaithia Server (Bot)
Kaithia Bot uses Telegraf to provide commands and automated responses to users on Telegram. This bot helps to create a group with any user on telegram with just 1 command.


The API is divided into two main files:

* index.js: Acts as an Express server, handling REST API endpoints to interact with the backend for the application.
* server.js: Managing the Telegram bot commands and connecting with the backend via Telegraf.

## `server.js`

This file is responsible for handling the Kaithia Bot's commands and interactions using the [Telegraf](https://telegraf.js.org/) library. The bot listens for commands and responds to user input.

#### Commands

| Command  | Description |
| -------- | ----------- |
| `/start` | Starts the bot and welcomes the user. |
| `/join`  | Provides a link to sign up and join Kaithia Bot. |
| `/help`  | Provides a list of available commands and their functions. |
| `/group [groupname]` | Creates a group with the specified name. |
| `/security` | Displays information about how Kaithia Bot handles data and security. |

---

## `index.js`

This file acts as an Express server, providing REST API endpoints to interact with the backend for group chat features on external platforms like XYZ.

**It Can be used to**:
- Adding groups to platform.
- Managing group members.
- API endpoints for external integrations.


---

## Run Locally


1. Clone the repository from


```bash
git clone https://github.com/mayurjadhav2002/kaithia -b main
```

2. Install Dependencies

```bash
  cd kaithia
  npm install
```

3. Create a `.env` file

```bash
TELEGRAM_BOT_API_KEY=<your-telegram-bot-api-key>
BACKEND_URL=http://<your-backend-url>
MONGO_LOCAL_URL=mongodb+srv://<your-mongodb-credentials>
PORT=<your-port-number>
TELEGRAM_APP_API_ID=<your-telegram-app-api-id>
TELEGRAM_APP_API_HASH=<your-telegram-app-api-hash>
PYTHON_BACKEND_URL=<your-python-backend-url>
```

4. Run the Server Locally

```bash
npm run dev

```


## Automated Telegram Group Creation
Check out the `pybackend` branch for automated Telegram group creation code. This branch contains additional features for handling group creation and management using a Python backend service.

<div>
    <a href="https://www.loom.com/share/6fc689fd018148159c3562f8fc1342c9">
      <p>Kaithia Demo - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/6fc689fd018148159c3562f8fc1342c9">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/6fc689fd018148159c3562f8fc1342c9-e81078f1f5b37e22-full-play.gif">
    </a>
  </div>


