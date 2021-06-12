const express = require("express");
const router  = express.Router();
const kontoManagement  = require("../controllers/konto_management.js");

/**
 * Bei Aufruf der Route {Host}/konto/ werden alle Personal-Objects zurück geliefert 
 * Normal: HTTP-Status: 200 + Personal-Objects als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/", async (req, res) => {
    const result = await kontoManagement.authKonto(req.body);
    if(Object.keys(result).length == 0){
        res.status(204).send("No Content");
        return;
    }
    res.status(200).send(result);
});


router.get("/all", async (req, res) => {
    const result = await kontoManagement.getAllKonten();
    if(Object.keys(result).length == 0){
        res.status(204).send("No Content");
        return;
    }
    res.status(200).send(result);
});

module.exports = router;