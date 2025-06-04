const { Router } = require("express");
const router = Router();

const entrepot = require("../controller/ConrollerDataExcel");

//router.post("/ajouterEntrepot", entrepot.ajouterEntrepot);
router.get("/getAllEntrepot", entrepot.getAllDeviInfo);
router.post("/ajouterFile", entrepot.ajouterFile);
router.get("/getFileByNemeFile/:fileName", entrepot.getFileByNemeFile);
router.get("/getCountTable/:fileName", entrepot.getCountTable);



module.exports = router;
