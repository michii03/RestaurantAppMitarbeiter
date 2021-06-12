const produktService = require("../services/produkt_service.js");

class ProduktManagement{

    getAllProdukte = async () => {
        const produkte = await produktService.getAllProdukte();
        return produkte;
    }

    getSingleProdukt = async (id) => {
        const produkt = await produktService.getSingleProdukt(id);
        return produkt;
    }

    createProdukt = async (produkt) => {
        const meldung = await produktService.createProdukt(produkt);
        return meldung;
    }

    updateProdukt = async (id, produkt) => {
        const meldung = await produktService.updateProdukt(id, produkt);
        return meldung;
    }

    deleteProdukt = async (id) => {
        const meldung = await produktService.deleteProdukt(id);
        return meldung;
    }

    getDifferentKategorien = async () => {
        const kategorien = await produktService.getDifferentKategorien();
        return kategorien;
    }

    getProdukteByKategorie = async (kategorie) => {
        const produkte = await produktService.getProdukteByKategorie(kategorie);
        return produkte;
    }

    getVegetarisch = async () => {
        const produkte = await produktService.getVegetarisch();
        return produkte;
    }

    /**============================================================================================
     *                                           KOCH
     ============================================================================================*/

     getProdukteByBestellnummer = async (bestellnummer) => {
        const produkte = await produktService.getProdukteByBestellnummer(bestellnummer);
        return produkte;
     }

     updateProduktZubereitet = async (id) => {
         const produkte = await produktService.updateProduktZubereitet(id);
         return produkte;
     }

}

module.exports = new ProduktManagement();