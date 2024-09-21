const { Telegraf, Markup } = require('telegraf');
const User = require("./models/User");
const { Connect } = require("./db/connect");

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);

bot.launch();
Connect();

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
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                username: user.username || '',
                userId: user.id || '',
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
        console.log(error);
        ctx.reply("Unexpected error occurred");
    }
});

bot.action('join', async (ctx) => {
    const userId = ctx.from.id; 
    const joinUrl = `https://kaithia.vercel.app?u=${userId}`;
    const fullName = `${ctx.from.first_name || 'explorer'} ${ctx.from.last_name || ''}`;

    ctx.reply(
        `✅ Great to see you onboard, ${fullName}! You can easily connect with others and explore all the features of Kaithia Bot.\n\nOpen Link to Sign Up: [Join Here](${joinUrl})`,
        {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                Markup.button.webApp("🌐 Open Link", joinUrl),
            ]).reply_markup,
        }
    );
});
bot.action('help', (ctx) => {
  const helpMessage = `🆘 Understading Kaithia. Here are the instructions:\n\n` +
      `👋 <b>/start</b> - Initialize or start Kaithia Bot. This command sets everything up for you to use the bot's features.\n\n` +
        `🤝 <b>/join</b> - Securely opens a sign-up window where you'll be asked to integrate your Telegram account for a seamless experience. \n\n` +
      `👥 <b>/group [groupname]</b> - Enter this command in any chat and It'll Create a group for you both. You can optionally provide a group name or add @kaithia_bot to add into group. \n\n` +
      `❓ <b>/help</b> - Get more information about the available commands and how to use Kaithia Bot.\n\n` +
      `🔒 <b>/security</b> - Learn about data and security.\n\n` +
      `If you need further assistance, feel free to reach out <b>@mayur8908</b> `;

  ctx.reply(helpMessage, {
      parse_mode: 'HTML',
  });
});


bot.command('help', (ctx) => {
    const helpMessage = `🆘 Understading Kaithia. Here are the instructions:\n\n` +
      `👋 <b>/start</b> - Initialize or start Kaithia Bot. This command sets everything up for you to use the bot's features.\n\n` +
        `🤝 <b>/join</b> - Securely opens a sign-up window where you'll be asked to integrate your Telegram account for a seamless experience. \n\n` +
      `👥 <b>/group [groupname]</b> - Enter this command in any chat and It'll Create a group for you both. You can optionally provide a group name or add @kaithia_bot to add into group. \n\n` +
      `❓ <b>/help</b> - Get more information about the available commands and how to use Kaithia Bot.\n\n` +
      `🔒 <b>/security</b> - Learn about data and security.\n\n` +
      `If you need further assistance, feel free to reach out <b>@mayur8908</b> `;


    ctx.reply(helpMessage, {
        parse_mode: 'HTML',
    });
})

bot.command('security', (ctx) => {
    const message = `<b>Security and Data Usage</b>\n\n` +
        `At Kaithia Bot, we take your privacy and security seriously. Here's how we handle your data:\n\n` +
        `<b>Phone Number, OTP, and 2FA:</b> We require your phone number, OTP, and 2FA password. We don't store this information.\n\n` +
        `<b>Basic Information:</b> We store your username, first name, last name, and other basic details.\n\n` +
        `<b>Message Listening:</b> Kaithia Bot listens to your messages but does not store them.\n\n` +
        `<b>Security and Infrastructure:</b> Our services are highly secured.`;

    ctx.reply(message, {
        parse_mode: 'HTML',
    });
});

bot.command('join', (ctx) => {
  const joinUrl = `https://kaithia.vercel.app?u=${ctx.from.id}`;
  
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
