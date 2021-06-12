const express = require("express");
const router = express.Router();
const bestellungsPositionManagement = require("../controllers/bestellungsPosition_management");





/**============================================================================================
 *                                           SCHÄNKE
 ============================================================================================*/

/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/produkteKochNichtZubereitet werden alle Produkte zurück geliefert,
 * welche in der Bestellung als nicht zubereitet markiert sind
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/produkteSchaenkeNichtZubereitet", async (req, res) => {
    const result = await bestellungsPositionManagement.getNichtZubereiteteBestellungenNurProduktSchaenke();
    if (Object.keys(result).length == 0) {
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});


/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/produkteKochZubereitet werden alle Produkte zurück geliefert,
 * welche in der Bestellung als zubereitet markiert sind
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/produkteSchankeZubereitet", async (req, res) => {
    const result = await bestellungsPositionManagement.getZubereiteteBestellungenNurProduktSchaenke();
    if (Object.keys(result).length == 0) {
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});


/**============================================================================================
 *                                           KOCH
 ============================================================================================*/

router.get("/getBestellnummernNichtZubereitetKoch", async (req, res) => {
    const result = await bestellungsPositionManagement.getBestellnummernNichtZubereitetKoch();
    // if(Object.keys(result).length == 0){
    //     res.status(404).send("No Content");
    //     return;
    // }
    res.status(200).send(result);
});



/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/produkteKochNichtZubereitet werden alle Produkte zurück geliefert,
 * welche in der Bestellung als nicht zubereitet markiert sind
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/ProdukteKochNichtZubereitet", async (req, res) => {
    const result = await bestellungsPositionManagement.getNichtZubereiteteBestellungenNurProdukt();
    if (Object.keys(result).length == 0) {
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/produkteKochZubereitet werden alle Produkte zurück geliefert,
 * welche in der Bestellung als zubereitet markiert sind
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/ProdukteKochZubereitet", async (req, res) => {
    const result = await bestellungsPositionManagement.getZubereiteteBestellungenNurProdukt();
    if (Object.keys(result).length == 0) {
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});

/**============================================================================================
 *                                     KOCH + SCHAENKE
 ============================================================================================*/

router.put("/update/zubereitet/:id", async (req, res) => {
    // const bestellungsPosition = await bestellungsPositionManagement.getSingleBestellungsPosition(req.params.posid);
    // if(Object.keys(bestellungsPosition).length == 0){
    //     res.status(404).send(`BestellungsPosition with ID ${req.params.posid} does not exist`);
    //     return;
    // }
    const result = await bestellungsPositionManagement.updateBestellungsPositionByID(req);
    // if(Object.keys(result).length == 0){
    //     res.status(404).send(`ERROR: BESTELLUNGSPOSITION NOT UPDATED`);
    //     return;
    // }
    // res.status(200).send(result);
});





/** 
 * Bei Aufruf der Route {Host}/bestellungsPosition/{ID} wird die Bestellungs Position mit der gesuchten ID geliefert
 * Normal: HTTP-Status: 200 + Bestellungs Position als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/:id", async (req, res) => {
    const result = await bestellungsPositionManagement.getSingleBestellungsPosition(req.params.id);
    if (Object.keys(result).length == 0) {
        res.status(404).send(`BestellungsPosition with ID ${req.params.id} does not exist`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/create wird die übergebenen Bestellungs Position persisitiert
 * Normal: HTTP-Status: 201 + Eben angelegte Bestellungs Position zurück als JSON
 * Bei Error: HTTP-Status: 404
 */
router.post("/create", async (req, res) => {
    const result = await bestellungsPositionManagement.createBestellungsPosition(req.body);
    if (Object.keys(result).length == 0) {
        res.status(404).send(`ERROR: BESTELLUNGSPOSITION NOT CREATED`);
        return;
    }
    res.status(201).send(result);
});

/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/update/{ID} wird die übergebene Bestellungs Position persistent geändert
 * Normal: HTTP-Status: 200 + Eben geänderte Bestellungs Position zurück als JSON
 * HTTP-Status: 404 - wenn Bestellungs Position-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim ändern
 */
router.put("/update/:id", async (req, res) => {
    const bestellungsPosition = await bestellungsPositionManagement.getSingleBestellungsPosition(req.params.id);
    if (Object.keys(bestellungsPosition).length == 0) {
        res.status(404).send(`BestellungsPosition with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await bestellungsPositionManagement.updateBestellungsPosition(req.params.id, req.body);
    if (Object.keys(result).length == 0) {
        res.status(404).send(`ERROR: BESTELLUNGSPOSITION NOT UPDATED`);
        return;
    }
    res.status(200).send(result);
});



/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/delete/{ID} wird die übergebene Bestellungs Position persistent gelöscht
 * Normal: HTTP-Status: 200 + Eben gelöschte Bestellungs Position zurück als JSON
 * HTTP-Status: 404 - wenn Bestellungs Position-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim löschen
 */
router.delete("/delete/:id", async (req, res) => {
    const bestellungsPosition = await bestellungsPositionManagement.getSingleBestellungsPosition(req.params.id);
    if (Object.keys(produkt).length == 0) {
        res.status(404).send(`BestellungsPosition with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await bestellungsPositionManagement.deleteBestellungsPosition(req.params.id);
    if (Object.keys(result).length > 0) {
        res.status(404).send(`ERROR: BESTELLUNGSPOSITION NOT DELETED`);
        return;
    }
    res.status(200).send(result);


});


/**
 * Bei Aufruf der Route {Host}/bestellungsPosition/ werden alle Bestellungs Positionen zurück geliefert 
 * Normal: HTTP-Status: 200 + Bestellungs Positionen als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/", async (req, res) => {
    const result = await bestellungsPositionManagement.getAllBestellungsPosition();
    if (Object.keys(result).length == 0) {
        res.status(404).send("No Content");
        return;
    }
    res.status(200).send(result);
});

module.exports = router;