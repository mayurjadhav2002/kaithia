const mongoose = require("mongoose");

const AllGroupUser = mongoose.Schema(
	{
        group_id:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			required: true,
        },
        group_user_id: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
        },
		created_on: {
			type: Date, 
			default: Date.now, 
		},
	},
	{timestamps: true}
);

module.exports = mongoose.model("AllGroupUser", AllGroupUser);
