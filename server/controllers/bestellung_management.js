const bestellungService = require("../services/bestellung_service.js");

class BestellungManagement{

    getAllBestellung = async () => {
        const bestellung = await bestellungService.getAllBestellung();
        return bestellung;
    }

    getBestellungen = async () => {
        const bestellung = await bestellungService.getBestellungen();
        return bestellung;
    }

    getSingleBestellung = async (id) => {
        const bestellung = await bestellungService.getSingleBestellung(id);
        return bestellung;
    }

    createBestellung = async (bestellung) => {
        const meldung = await bestellungService.createBestellung(bestellung);
        return meldung;
    }

    updateBestellung = async (id, bestellung) => {
        const meldung = await bestellungService.updateBestellung(id, bestellung);
        return meldung;
    }

    deleteBestellung = async (id) => {
        const meldung = await bestellungService.deleteBestellung(id);
        return meldung;
    }


    

}

module.exports = new BestellungManagement();
