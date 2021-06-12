const personalService = require("../services/personal_service.js");

class PersonalManagement{

    getAllPersonal = async () => {
        const mitarbeiter = await personalService.getAllPersonal();
        return mitarbeiter;
    }

    getSinglePersonal = async (persNr) => {
        const mitarbeiter = await personalService.getSinglePersonal(persNr);
        return mitarbeiter;
    }

    createPersonal = async (mitarbeiter) => {
        const meldung = await personalService.createPersonal(mitarbeiter);
        return meldung;
    }

    updatePersonal = async (persNr, mitarbeiter) => {
        const meldung = await personalService.updatePersonal(persNr, mitarbeiter);
        return meldung;
    }

    deletePersonal = async (persNr) => {
        const meldung = await personalService.deletePersonal(persNr);
        return meldung;
    }
}

module.exports = new PersonalManagement();
