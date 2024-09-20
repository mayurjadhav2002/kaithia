const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");
const UserData = require("./controllers/userdata");
const GroupData = require("./controllers/groupdata");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));
user_route.post("/profile", UserData.FetchUserDetails);
user_route.post("/getGroups", GroupData.GetAllGroupsOfUser);
user_route.get("/groups/:groupId", GroupData.GetGroupDetails);
user_route.get("/messages/:groupId", GroupData.GetGroupMessages);
user_route.post("/update_phone", UserData.UpdatePhoneNumber);
user_route.get("/", (req,res)=>{
    res.send("Hello, World!");
})
module.exports = user_route;
