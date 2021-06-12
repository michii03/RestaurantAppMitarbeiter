const kontoService = require("../services/konto_service.js");

class KontoManagement{

    authKonto = async (loginData) => {
        const result = await kontoService.authKonto(loginData);
        return result;
    }

    checkIfKontoExists = async (username) => {
        const result = await kontoService.checkIfKontoExists(username);
        return result;
    }

    getAllKonten = async() => {
        const result = await kontoService.getAllKonten();
        return result;
    }

    
}

module.exports = new KontoManagement();