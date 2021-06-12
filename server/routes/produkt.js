const express = require("express");
const router  = express.Router();
const produktManagement  = require("../controllers/produkt_management.js");

/**
 * Bei Aufruf der Route {Host}/produkt/ werden alle Produkte zurück geliefert 
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/", async (req, res) => {
    const result = await produktManagement.getAllProdukte();
    if(Object.keys(result).length == 0){
        res.status(404);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/kategorie werden alle unterschiedlichen Kategorien zurück geliefert 
 * Normal: HTTP-Status: 200 + Kategorien als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/kategorie", async (req, res) => {
    const result = await produktManagement.getDifferentKategorien();
    if(Object.keys(result).length == 0){
        res.status(404);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/kategorie/{FILTER_STRING} werden alle Produkte der gesuchten Kategorie zurück geliefert 
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/kategorie/:kat", async(req, res) => {
    const result = await produktManagement.getProdukteByKategorie(req.params.kat);
    if(Object.keys(result).length == 0){
        res.status(404).send(`Kategorie ${req.params.kat} does not exist`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/vegetarisch werden alle Produkte die Vegetarisch sind zurück geliefert 
 * Normal: HTTP-Status: 200 + Produkte als JSON
 * Bei Error: HTTP-Status: 404 
 */
router.get("/vegetarisch", async(req, res) =>{
    const result = await produktManagement.getVegetarisch();
    if(Object.keys(result).length == 0){
        res.status(404);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/{ID} wird das Produkt mit der gesuchten ID geliefert
 * Normal: HTTP-Status: 200 + Produkt als JSON
 * Bei Error: HTTP-Status: 404
 */
router.get("/:id", async (req, res) => {
    const result = await produktManagement.getSingleProdukt(req.params.id);
    if(Object.keys(result).length == 0){
        res.status(404).send(`Produkt with ID ${req.params.id} does not exist`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/create wird das übergebenen Produkt persisitiert
 * Normal: HTTP-Status: 201 + Eben angelegtes Produkt zurück als JSON
 * Bei Error: HTTP-Status: 404
 */
router.post("/create", async (req, res) => {
    const result = await produktManagement.createProdukt(req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: PRODUKT NOT CREATED`);
        return;
    }
    res.status(201).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/update/{ID} wird das übergebenen Produkt persistent geändert
 * Normal: HTTP-Status: 200 + Eben geändertes Produkt zurück als JSON
 * HTTP-Status: 404 - wenn Produkt-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim ändern
 */
router.put("/update/:id", async (req, res) => {
    const produkt = await produktManagement.getSingleProdukt(req.params.id);
    if(Object.keys(produkt).length == 0){
        res.status(404).send(`Produkt with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await produktManagement.updateProdukt(req.params.id, req.body);
    if(Object.keys(result).length == 0){
        res.status(404).send(`ERROR: PRODUKT NOT UPDATED`);
        return;
    }
    res.status(200).send(result);
});

/**
 * Bei Aufruf der Route {Host}/produkt/delete/{ID} wird das übergebenen Produkt persistent gelöscht
 * Normal: HTTP-Status: 200 + Eben gelöschte Produkt zurück als JSON
 * HTTP-Status: 404 - wenn Produkt-ID nicht in Datenbank vorhanden
 * HTTP-Status: 404 - wenn DB-Fehler beim löschen
 */
router.delete("/delete/:id", async (req, res) => {
    const produkt = await produktManagement.getSingleProdukt(req.params.id);
    if(Object.keys(produkt).length == 0){
        res.status(404).send(`Produkt with ID ${req.params.id} does not exist`);
        return;
    }
    const result = await produktManagement.deleteProdukt(req.params.id);
    if(Object.keys(result).length > 0){
        res.status(404).send(`ERROR: PRODUKT NOT DELETED`);
        return;
    }
    res.status(200).send(result);
});

/**============================================================================================
     *                                           KOCH
     ============================================================================================*/

     router.get("/bestellnummer/:id", async (req, res) => {
        const result = await produktManagement.getProdukteByBestellnummer(req.params.id);
        if(Object.keys(result).length == 0){
            res.status(404).send(`Produkt with ID ${req.params.kat} does not exist`);
            return;
        }
        res.status(200).send(result);
    });

    router.get("/zubereitetUpdate/:id", async (req, res) => {
        const result = await produktManagement.updateProduktZubereitet(req.params.id);
        
        // if(Object.keys(result).length == 0) {
        //     res.status(404).send(`ERROR: PRODUKT NOT UPDATED`);
        //     return;
        // }
        res.status(200).send(result);
    });
    




module.exports = router;