const express=require("express");
const {
    handleCreateEntry,
    handleUpdateEntry,
    handleDeleteEntry,
    handleGetEntry,
    handleGetEntries
} = require("../controllers/entry");

const router = express.Router();

router.post("/", handleCreateEntry);
router.patch("/", handleUpdateEntry);
router.delete("/", handleDeleteEntry);
// router.get("/Entry", handleGetEntry);  Think of proper path
router.get("/", handleGetEntries);

module.exports=router;  
