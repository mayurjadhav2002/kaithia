const {Telegraf} = require("telegraf");
const {message} = require("telegraf/filters");

const bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);

const {Connect} = require("./db/connect");
const User = require("./models/User");
const ProfileData = require("./models/ProfileData");
const AllGroupUser = require("./models/AllGroupUser");
const Group = require("./models/Group");

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
		await newUser.save();

		const newProfile = new ProfileData({
			userId: newUser._id,
		});

		await newProfile.save();

		await ctx.reply(
			`Welcome ${userInfo.first_name}, I will help you to create a new Group with anyone!`
		);

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


bot.command("group", async (ctx) => {
	const groupCreator = ctx.update.message.from;
	const messageParts = ctx.message.text.split(" ");
	const targetUsername = messageParts[1];
	const providedGroupName = messageParts[2];

	try {
		const creatorUser = await User.findOne({userId: groupCreator.id});
		if (!creatorUser) {
			ctx.reply(
				"You need to register first by sending the /start command."
			);
			return;
		}

		const targetUser = await User.findOne({username: targetUsername});
		if (!targetUser) {
			ctx.reply(
				"This user hasn't registered yet. Send them this link to join: https://t.me/kaithia"
			);
			return;
		}

		const targetProfile = await ProfileData.findOne({
			userId: targetUser._id,
		});

		const groupName = providedGroupName
			? providedGroupName
			: `${groupCreator.first_name} <> ${targetUser.first_name}`;

		const newGroup = new Group({
			group_name: groupName,
			group_description: `Group created by ${groupCreator.first_name}`,
			users_added: [creatorUser._id, targetUser._id],
			created_by: groupCreator.username,
		});

		await newGroup.save();

		if (targetProfile && targetProfile.permissions.groupAdding) {
			const newGroupUser = new AllGroupUser({
				group_id: newGroup._id,
				group_user_id: targetUser._id,
			});
			await newGroupUser.save();

			await ctx.reply(
				`${targetUser.first_name} has been added to your group!`
			);
			await ctx.telegram.sendMessage(
				targetUser.userId,
				`You have been added to a group by ${groupCreator.first_name}.`,
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "View Group",
									url: `https://kaithia.vercel.app/group/${newGroup._id}`,
								},
							],
						],
					},
				}
			);
		} else {
			await ctx.reply("Your new group has been created!");
			await ctx.reply(
				`However, ${targetUser.first_name} has not enabled group-adding permissions. We will send them an invite link to join the group.`
			);
			await ctx.telegram.sendMessage(
				targetUser.userId,
				`${groupCreator.first_name} wants to add you to a group. Click the link below to join.`,
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: "Join Group",
									url: `https://kaithia.vercel.app/group/${newGroup._id}?accept=true`,
								},
								{
									text: "Cancel",
									url: `https://kaithia.vercel.app/group/${newGroup._id}?cancel=true`,
									callback_data: `cancel ${newGroup._id}`,
								},
							],
						],
					},
				}
			);
		}
	} catch (error) {
		console.error("Error creating group:", error);
		ctx.reply("Something went wrong. Please try again later.");
	}
});




bot.on(message("text"), (ctx) => {
	ctx.reply("Hello, I am Naithia, Friendly Telegram bot to create the groups");
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
