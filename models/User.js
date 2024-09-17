const mongoose = require("mongoose");
const defaultAvatar = `${process.env.BACKEND_URL}/uploads/default.png`;
const User = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
        userId:{
            type: String,
            required: true,
        },
		password: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			default: defaultAvatar,
		},
		password_reset: {
			type: String,
			default: "",
		},
		password_reset_token: {
			type: String,
			default: "",
		},
		date: {
			type: String,
			default: "",
		},
		
	},
	{timestamps: true}
);

User.method({
	async authenticate(password) {
		return bcrypt.compare(password, this.hash_password);
	},
});

module.exports = mongoose.model("User", User);
