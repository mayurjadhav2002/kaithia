const mongoose = require("mongoose");

const Group = mongoose.Schema(
	{
		group_name: {
			type: String,
			required: true,
		},
		group_description: {
			type: String,
			required: true,
		},
		users_added: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		created_by: {
			type: String,
			required: false,
		},
		created_on: {
			type: Date, 
			default: Date.now, 
		},
	},
	{timestamps: true}
);

module.exports = mongoose.model("Group", Group);
