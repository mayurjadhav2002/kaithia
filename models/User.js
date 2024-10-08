const { type } = require("express/lib/response");
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
		},
		username: {
			type: String,
			required: false,
		},
		phone_number:{
			type:String,
			required: false
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
		hasSession:{
			type:Boolean,
			default:false
	
		},
		phone_code_hash:{
			type:String,
			default:""
		}
		
	},
	{timestamps: true}
);

User.method({
	async authenticate(password) {
		return bcrypt.compare(password, this.hash_password);
	},
});

module.exports = mongoose.model("User", User);
