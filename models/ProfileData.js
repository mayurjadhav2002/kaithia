const mongoose = require("mongoose");

const ProfileData = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		bio: {
			type: String,
			default: "I am a Human from planet Earth, from universe x16",
		},
		skills: {
			type: [String],
			default: [],
		},
		links: {
			type: [String],
			default: [],
		},
        // User permission to join the group
        permissions: {
            groupCreation: {type:Boolean, default: true},
            groupAdding: {type:Boolean, default: true},
        },
		created_on: {
			type: Date,
			default: Date.now,
		},
        
	},
	{timestamps: true}
);

module.exports = mongoose.model("ProfileData", ProfileData);
