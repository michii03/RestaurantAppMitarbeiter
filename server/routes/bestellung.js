const express = require("express");
const router  = express.Router();
const bestellungManagement  = require("../controllers/bestellung_management");



router.get("/bestellnummern", async (req, res) => {
    const result = await bestellungManagement.getAllBestellnummern();
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellung/ werden alle Bestellungen zurück geliefert 
 * Normal: HTTP-Status: 200 + Bestellungen als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/", async (req, res) => {
    const result = await bestellungManagement.getAllBestellung();
    if(Object.keys(result).length == 0){
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});

router.get("/BestellungMitPositionen", async (req, res) => {
    const result = await bestellungManagement.getBestellungen();
    if(Object.keys(result).length == 0){
        res.status(404).send(`0 Bestellungen found`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellung/{ID} wird die Bestellungen mit der gesuchten ID geliefert
 * Normal: HTTP-Status: 200 + Bestellungen als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/:id", async (req, res) => {
    const result = await bestellungManagement.getSingleBestellung(req.params.id);
    if(Object.keys(result).length == 0){
        res.status(404).send(`Bestellung with ID ${req.params.id} does not exist`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellung/create wird die übergebenen Bestellung persisitiert
 * Normal: HTTP-Status: 201 + Eben angelegte Bestellung zurück als JSON
 * Bei Error: HTTP-Status: 404
 */
router.post("/create", async (req, res) => {
    const result = await bestellungManagement.createBestellung(req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: BESTELLUNG NOT CREATED`);
        return;
    }
    res.status(201).send(result);
});





/**
 * Bei Aufruf der Route {Host}/bestellung/update/{ID} wird die übergebene Bestellung persistent geändert
 * Normal: HTTP-Status: 200 + Eben geänderte Bestellung zurück als JSON
 * HTTP-Status: 404 - wenn Bestellung-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim ändern
 */
router.put("/update/:id", async (req, res) => {
    const bestellung = await bestellungManagement.getSingleBestellung(req.params.id);
    if(Object.keys(bestellung).length == 0){
        res.status(404).send(`Bestellung with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await bestellungManagement.updateBestellung(req.params.id, req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: BESTELLUNG NOT UPDATED`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellung/delete/{ID} wird die übergebene Betsellung persistent gelöscht
 * Normal: HTTP-Status: 200 + Eben gelöschte Bestellung zurück als JSON
 * HTTP-Status: 404 - wenn Bestellung-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim löschen
 */
router.delete("/delete/:id", async (req, res) => {
    const bestellung = await bestellungManagement.getSingleBestellung(req.params.id);
    if(Object.keys(bestellung).length == 0){
        res.status(404).send(`Bestellung with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await bestellungManagement.deleteBestellung(req.params.id);
    if(Object.keys(result).length > 0){
        res.status(404).send(`ERROR: BESTELLUNG NOT DELETED`);
        return;
    }
    res.status(200).send(result);
});







module.exports = router;