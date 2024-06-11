const express=require("express");
const {
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleViewUser
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleCreateUser);
router.patch("/", handleUpdateUser);
router.delete("/", handleDeleteUser);
router.get("/", handleViewUser);

module.exports=router;  
