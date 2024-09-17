const {Telegraf} = require("telegraf");
const {message} = require("telegraf/filters");

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);

const {Connect} = require("./db/connect");
const User = require("./models/User");

console.log("Bot is running...");
Connect();

bot.start(async (ctx) => {
	const userInfo = ctx.update.message.from;
	console.log(userInfo);
	try {
		const existingUser = await User.findOne({userId: userInfo.id});
		if (existingUser) {
			console.log("User already registered");
			ctx.reply(
				`Hi, ${userInfo.first_name}, Start a new Group chat easily`
			);
			return;
		}
		const newUser = new User({
			userId: userInfo.id,
			first_name: userInfo.first_name,
			last_name: userInfo.last_name,
			username: userInfo.username,
			date: ctx.update.message.date,
		});

		if (newUser) {
			await ctx.reply(
				`Welcome ${userInfo.first_name}, I will help you to create new Group with anyone`
			);
		} else {
			await ctx.reply(
				`Welcome ${userInfo.first_name}, We're facing some difficulties adding you please try again /start command`
			);
		}
	} catch (error) {
		console.log(error);
		await ctx.reply("Facing some difficulties, please try again later");
	}
});


bot.command('group', (ctx) => {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text;
    const targetUsername = messageText.split(' ')[1];

    if (!targetUsername) {
        return ctx.reply('Please provide the username of the other user: /group username');
    }

    ctx.reply(`You requested to create a group with ${targetUsername}. Currently, this functionality requires manual setup.`);
});

bot.on(message("text"), (ctx) => {

	ctx.reply("Hello, I am alive and listening to your commands!");
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


