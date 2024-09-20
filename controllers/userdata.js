const ProfileData = require("../models/ProfileData");
const User = require("../models/User");

const FetchUserDetails = async (req, res) => {
	const {username} = req.body;
	console.log(username)

	try {
		const user = await User.findOne({
			$or: [{ username: username }, { userId: username }]
		});

		if (!user) {
			return res.status(404).json({error: "User not found"});
		}
		const profileData = await ProfileData.findOne({userId: user._id});

		if (!profileData) {
			return res.status(404).json({error: "Profile data not found"});
		}
		const userDetails = {
			user,
			profile: profileData,
		};

		res.status(200).send(userDetails);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).send({error: "Internal Server Error"});
	}
};


const UpdatePhoneNumber = async (req, res) => {
	const { phone_number, userId } = req.body;
  
	if (!phone_number || !userId) {
	  return res.status(400).json({ error: "Phone number and user ID are required" });
	}
  
	try {
	  const updatedUser = await User.findOneAndUpdate(
		{ userId },
		{ phone_number },
		{ new: true } 
	  );
  
	  if (!updatedUser) {
		return res.status(404).json({ error: "User not found" });
	  }
  
	  return res.status(200).json({ msg: "Data Updated" });
	} catch (error) {
		
	  return res.status(500).json({ error: "Internal Server Error" });
	}
  };
  

module.exports = {FetchUserDetails, UpdatePhoneNumber}
