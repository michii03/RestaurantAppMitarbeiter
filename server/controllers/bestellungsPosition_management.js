const bestellungsPositionService = require("../services/bestellungsPosition_service.js");

class BestellungsPositionManagement{

    getAllBestellungsPosition = async () => {
        const bestellungsPosition = await bestellungsPositionService.getAllBestellungsPosition();
        return bestellungsPosition;
    }

    getSingleBestellungsPosition = async (id) => {
        const bestellungsPosition = await bestellungsPositionService.getSingleBestellungsPosition(id);
        return bestellungsPosition;
    }

    createBestellungsPosition = async (bestellungsPosition) => {
        const meldung = await bestellungsPositionService.createBestellungsPosition(bestellungsPosition);
        return meldung;
    }

    updateBestellungsPosition = async (id, bestellungsPosition) => {
        const meldung = await bestellungsPositionService.updateBestellungsPosition(id, bestellungsPosition);
        return meldung;
    }


    deleteBestellungsPosition = async (id) => {
        const meldung = await bestellungsPositionService.deleteBestellungsPosition(id);
        return meldung;
    }

    /**============================================================================================
     *                                           SCHÄNKE
     ============================================================================================*/

     getNichtZubereiteteBestellungenNurProduktSchaenke = async () => {
        const result = await bestellungsPositionService.getNichtZubereiteteBestellungenNurProduktSchaenke();
        return result;
     }

    getZubereiteteBestellungenNurProduktSchaenke = async () => {
        const result = await bestellungsPositionService.getZubereiteteBestellungenNurProduktSchaenke();
        return result;
    }

    /**============================================================================================
     *                                           KOCH
     ============================================================================================*/

    getBestellnummernNichtZubereitetKoch = async () => {
        const result = await bestellungsPositionService.getBestellnummernNichtZubereitetKoch();
        return result;
    }

    getNichtZubereiteteBestellungenNurProdukt = async () => {
        const result = await bestellungsPositionService.getNichtZubereiteteBestellungenNurProdukt();
        return result;
    }

    getZubereiteteBestellungenNurProdukt = async () => {
        const result = await bestellungsPositionService.getZubereiteteBestellungenNurProdukt();
        return result;
    }

    /**============================================================================================
     *                                     KOCH + SCHAENKE
     ============================================================================================*/

    updateBestellungsPositionByID = async (id) => {
        const meldung = await bestellungsPositionService.updateBestellungsPositionByID(id);
        return meldung;
    }
}

module.exports = new BestellungsPositionManagement();