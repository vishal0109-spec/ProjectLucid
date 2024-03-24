import express from "express";
import Authentication from "../controllers/Authentication.js";
import createDns from "../controllers/createDns.js";
import getAllDnsData from "../controllers/getAllDnsData.js";
import updateDns from "../controllers/UpdateDns.js";
import deleteDns from "../controllers/deleteDns.js";
const router=express.Router();

router.post("/create",Authentication,createDns);
router.get("/getAllDnsData",Authentication,getAllDnsData);
router.put("/update/:id",Authentication,updateDns)
router.delete("/delete/:id",Authentication,deleteDns);


export default router;