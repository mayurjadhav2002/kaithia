const AllGroupUser = require("../models/AllGroupUser");
const Group = require("../models/Group");
const Messages = require("../models/Messages");

const GetAllGroupsOfUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const groupUsers = await AllGroupUser.find({
      group_user_id: userId,
    }).populate({
      path: "group_id",
      select: "group_name group_description created_by created_on",
      model: Group,
    });

    const groups = await Promise.all(groupUsers.map(async (groupUser) => {
      const group = groupUser.group_id;

      const lastMessage = await Message.findOne({ groupId: group._id })
        .sort({ created_on: -1 })
        .populate({
          path: 'sender',
          select: 'username',
          model: User
        });

      return {
        id: group._id,
        name: group.group_name,
        description: group.group_description,
        created_by: group.created_by,
        created_on: group.created_on,
        last_message: lastMessage ? lastMessage.message : null,
        last_message_sender: lastMessage && lastMessage.sender ? lastMessage.sender.username : null
      };
    }));

    if (groups.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No groups found for this user",
      });
    }

    res.json({
      success: true,
      groups,
    });
  } catch (error) {
    console.error("Error fetching user groups:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user groups",
    });
  }
};


const GetGroupDetails = async(req,res)=>{
  const { groupId } = req.params;
  console.log(groupId)

  if (!groupId) {
    return res.status(400).json({ error: "Group ID is required" });
  }

  try {
    const group = await Group.findOne({ _id: groupId }).populate({
      path: 'users_added',
      select: 'username' 
  });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    return res.status(200).json(group);
  } catch (error) {
    console.error("Failed to fetch group details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const GetGroupMessages = async(req,res)=>{
  const { groupId } = req.params;
  try{
    const messages = await Messages.find({ groupId: groupId }).populate({
      path: 'sender',
      select: 'first_name username avatar'
  });
    return res.status(200).json(messages);

  }catch(error){
    console.error("Failed to fetch group messages:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = {
  GetAllGroupsOfUser,
  GetGroupDetails,
  GetGroupMessages
};
