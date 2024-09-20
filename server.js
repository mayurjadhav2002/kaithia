const { Telegraf, Markup } = require('telegraf');
const User = require("./models/User")
const {Connect} = require("./db/connect")

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);

bot.launch();
Connect()

bot.command('start', async (ctx) => {
	const user = ctx.from;
	try {
		const fullName = `${user.first_name} ${user.last_name}`;
    const message = `<b>Welcome to Kaithia Bot, ${fullName}!</b>\n\n` +
    `Kaithia Bot helps you manage groups and provides useful features to enhance your Telegram experience. Here are the commands you can use:\n\n` +
    
    `Enjoy using Kaithia Bot!`;
  
  

		const newUser = await User.findOne({ userId: user.id });
		if (!newUser) {
			const addUser = new User({
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				userId: user.id,
			});
			await addUser.save();
		}

		ctx.reply(message, {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback("🤝 Join", "join"),
				Markup.button.callback("❓ Help", "help"),
			]),
		});
	} catch (error) {
    console.log(error)
		ctx.reply("Unexpected error occurred");
	}
});



bot.action('join', (ctx) => {
  const userId = ctx.from.id; 
  const joinUrl = `https://kaithia.vercel.app?u=${userId}`;
  
  ctx.reply(
    `✅ Great to see you onboard, ${fullName}! You can easily connect with others and explore all the features of Kaithia Bot.\n\Open Link to Sign Up: [Join Here](${joinUrl})`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        Markup.button.webApp("🌐 Open Link", joinUrl),
      ]).reply_markup,
    }
  );
});


bot.command('security', (ctx) => {
  try {
    const message = `<b>Security and Data Usage</b>\n\n` +
    `At Kaithia Bot, we take your privacy and security seriously. Here's how we handle your data:\n\n` +
    `<b>Phone Number, OTP, and 2FA:</b> To create your session, we require your phone number, a one-time password (OTP), and, if enabled, your 2FA password. We don't store this information. The only thing we keep is your active session, which you can delete at any time by using the <code>/delete-session</code> command.\n\n` +
    `<b>Basic Information:</b> We store your username, first name, last name, and other basic details to facilitate communication within the bot. This helps us personalize your experience and manage interactions.\n\n` +
    `<b>Message Listening:</b> Kaithia Bot listens to the messages you send, but we do not store any of them. We only take action when you send a command, like <code>/group</code>.\n\n` +
    `<b>Security and Infrastructure:</b> All of our services are deployed on a live server and are highly secured to ensure your data remains safe. We prioritize strong security measures to protect all interactions.`;
  

    ctx.reply(message, {
      parse_mode: 'HTML',
    });
  } catch (error) {
    ctx.reply("Unexpected error occurred");
  }
});

bot.command('help', (ctx) => {
  const helpMessage = `🆘 You requested help. Here are the instructions:\n\n` +
   `👋 <b>/start</b> - Initialize or start Kaithia Bot. This command sets everything up for you to use the bot's features.\n\n` +
    `🤝 <b>/join</b> - Join a group or connect with other users.\n\n` +
    `👥 <b>/group [groupname]</b> - Kaithia Bot also works as a client! Use <code>/group</code> in a private chat with another user to create a group for you both. You can optionally provide a group name.\n\n` +
    `❓ <b>/help</b> - Get more information about the available commands and how to use Kaithia Bot.\n\n` +
    `🔒 <b>/security</b> - Learn how we handle your data, what events we capture, and the security measures we have in place.\n\n` +
    `If you need further assistance, feel free to ask!`;

  ctx.reply(helpMessage, {
    parse_mode: 'HTML',
  });
});


bot.command('join', (ctx) => {
  const userId = ctx.from.id;
  const joinUrl = `https://kaithia.vercel.app`;
  
  ctx.reply(
    `✅ You have chosen to join! Access the link here: [Join Here](${joinUrl})`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        Markup.button.webApp("🌐 Open Link", joinUrl),
      ]).reply_markup,
    }
  );
});


bot.hears('hi', (ctx) => ctx.reply('👋 Hey there!'));


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
