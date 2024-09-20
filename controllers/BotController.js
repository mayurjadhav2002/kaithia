const User = require("../models/User");
const ProfileData = require("../models/ProfileData"); 

const UserExists = async ({ username }) => {
    try {
        const existingUser = await User.findOne({ username: username });
        console.log(existingUser);
        if (existingUser) {
            return { status: true, user: existingUser };
        } else {
            return { status: false, user: {} };
        }
    } catch (error) {
        console.error("Error checking if user exists:", error); 
        return { status: false, user: {}, error: "Internal Server Error" };
    }
};

const CreateNewUser = async ({ userInfo }) => {
    try {
        const newUser = new User({
            userId: userInfo.id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            date: new Date(), 
        });
        await newUser.save();

        const newProfile = new ProfileData({
            userId: newUser._id,
        });
        await newProfile.save();

        return { status: true, user: newUser };
    } catch (error) {
        console.error("Error creating new user:", error); // Log the error
        return { status: false, user: {}, error: "Internal Server Error" };
    }
};

const SavePhoneNumber = async ({ userId, phoneNumber }) => {
    try {
        const savedNumber = await User.findOneAndUpdate(
            { userId: userId },
            { phone_number: phoneNumber },
            { new: true } // This returns the updated document
        );
        if (savedNumber) {
            return { status: true, user: savedNumber };
        } else {
            return { status: false, user: {}, error: "User not found." };
        }
    } catch (error) {
        console.error("Error saving phone number:", error); // Log the error
        return { status: false, user: {}, error: "Internal Server Error" };
    }
};

module.exports = {
    UserExists,
    CreateNewUser,
    SavePhoneNumber
};
