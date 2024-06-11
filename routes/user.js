const express=require("express");
const {
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleViewUser
} = require("../controllers/user");

const router = express.Router();

router.post("/register", handleCreateUser);
router.patch("/update", handleUpdateUser);
router.delete("/delete", handleDeleteUser);
router.get("/", handleViewUser);

module.exports=router;  
