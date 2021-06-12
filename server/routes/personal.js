const express = require("express");
const router  = express.Router();
const personalManagement  = require("../controllers/personal_management.js");

/**
 * Bei Aufruf der Route {Host}/personal/ werden alle Personal-Objects zurück geliefert 
 * Normal: HTTP-Status: 200 + Personal-Objects als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/", async (req, res) => {
    const result = await personalManagement.getAllPersonal();
    if(Object.keys(result).length == 0){
        res.status(204).send("No Content");
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/personal/{ID} wird das Personal-Object mit der gesuchten ID geliefert
 * Normal: HTTP-Status: 200 + Personal-Object als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/:id", async (req, res) => {
    const result = await personalManagement.getSinglePersonal(req.params.id);
    if(Object.keys(result).length == 0){
        res.status(404).send(`Personal with ID ${req.params.id} does not exist`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/personal/create wird das übergebenen Personal-Object persisitiert
 * Normal: HTTP-Status: 201 + Eben angelegtes Personal-Object zurück als JSON
 * Bei Error: HTTP-Status: 404
 */
router.post("/create", async (req, res) => {
    const result = await personalManagement.createPersonal(req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: PERSONAL NOT CREATED`);
        return;
    }
    res.status(201).send(result);
});
/**
 * Bei Aufruf der Route {Host}/personal/update/{ID} wird das übergebenen Personal-Object persistent geändert
 * Normal: HTTP-Status: 200 + Eben geändertes Personal-Object zurück als JSON
 * HTTP-Status: 404 - wenn Personal-Object-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim ändern
 */
router.put("/update/:id", async (req, res) => {
    const personal = await personalManagement.getSinglePersonal(req.params.id);
    if(Object.keys(produkt).length == 0){
        res.status(404).send(`Personal with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await personalManagement.updatePersonal(req.params.id, req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: PERSONAL NOT UPDATED`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/personal/delete/{ID} wird das übergebenen Personal-Object persistent gelöscht
 * Normal: HTTP-Status: 200 + Eben gelöschte Personal-Object zurück als JSON
 * HTTP-Status: 404 - wenn Personal-Object-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim löschen
 */
router.delete("/delete/:id", async (req, res) => {
    const personal = await personalManagement.getSinglePersonal(req.params.id);
    if(Object.keys(produkt).length == 0){
        res.status(404).send(`Personal with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await personalManagement.deletePersonal(req.params.id);
    if(Object.keys(result).length > 0){
        res.status(404).send(`ERROR: PERSONAL NOT DELETED`);
        return;
    }
    res.status(200).send(result);
});

module.exports = router;