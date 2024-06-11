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
router.get("/", handleGetEntry);  

router.get("/all", handleGetEntries); //Think of proper path

module.exports=router;  
