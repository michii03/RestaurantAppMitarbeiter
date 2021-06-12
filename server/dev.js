const bestellungManagement = require("./controllers/bestellung_management");
const personalManagement = require("./controllers/personal_management");
const bestellungsPositionManagement = require("./controllers/bestellungsposition_management");
const produktManagement  = require("./controllers/produkt_management");

class DevTesting{

    run_test = () => {

        this.selectProduktTest();

        this.selectPersonalTest();

        this.selectBestellungTest();
        
        this.selectBestellungsPositionTest();


    }


    /**--------------------------------------------------------
     * Testfunktionen
     */
    selectProduktTest = async () => {
        // getSingleProdukt -----------------------------------

        // const id = 1;
        // console.log(await produktManagement.getSingleProdukt(id));


        // getAllProdukt --------------------------------------

        // console.log(await produktManagement.getAllProdukte());


        // CreateProdukt --------------------------------------

        // const idA = 1;
        // const dataA = {
        //     name: '',
        //     beschreibung: '',
        //     kategorie: '',
        //     preis: 0.00,
        //     vegetarisch: ''
        // }
        // const meldungA = await produktManagement.createProdukt(dataA);
        // console.log(meldungA);


        // UpdateProdukt --------------------------------------

        // const idB = 1;
        // const dataB = {
        //     name: '',
        //     beschreibung: '',
        //     kategorie: '',
        //     preis: 0.00,
        //     vegetarisch: ''
        // }
        // const meldungB = await produktManagement.updateProdukt(idB,dataB);
        // console.log(meldungB);


        // DeleteProdukt --------------------------------------

        // const idC = 1;
        // const meldungC = await produktManagement.deleteProdukt(idC);
        // console.log(meldungC);


        // getDifferentKategorien -----------------------------

        // console.log(await produktManagement.getDifferentKategorien());


        // getProdukteByKategorie -----------------------------

        // console.log(await produktManagement.getProdukteByKategorie("Pizza"));


        // getVegetarisch -------------------------------------

        // console.log(await produktManagement.getVegetarisch());
    }
    selectPersonalTest = async () => {
        // getSinglePersonal ----------------------------------

        // const id = 1;
        // console.log(await personalManagement.getSinglePersonal(1));


        // getAllPersonal -------------------------------------

        // console.log(await personalManagement.getAllPersonal());


        // CreatePersonal -------------------------------------
    
        // const idA = 1;
        // const dataA = {
        //     vorname: '',
        //     name: '',
        //     taetigkeit: '',
        //     eintrittsdatum: '',
        //     gehalt: 0.0
        // };
        // const meldungA = await personalManagement.createPersonal(dataA);
        // console.log(meldungA);


        // UpdatePersonal -------------------------------------

        // const idB = 1;
        // const dataB = {
        //     vorname: 'T',
        //     name: '',
        //     taetigkeit: '',
        //     eintrittsdatum: '',
        //     gehalt: 0.0
        // }
        // const meldungB = await personalManagement.updatePersonal(idB,dataB);
        // console.log(meldungB);


        // DeletePersonal -------------------------------------

        // const idC = 2;
        // const meldungC = await personalManagement.deletePersonal(idC);
        // console.log(meldungC);
    }
    selectBestellungTest = async () => {
        // getSingleBestellung --------------------------------

        // const id = 3;
        // console.log(await bestellungManagement.getSingleBestellung(id));


        // getAllBestellung -----------------------------------

        // console.log(await bestellungManagement.getAllBestellung());


        // CreateBestellung -----------------------------------
    
        // const idA = 1;
        // const dataA = {
        //     typ: '',
        //     ausstehend: '',
        //     tischnummer: '',
        //     nachname: '',
        //     abholzeit: ''
        // }
        // const meldungA = await bestellungManagement.createBestellung(dataA);
        // console.log(meldungA);


        // UpdateBestellung -----------------------------------

        // const idB = 1;
        // const dataB = {
        //     typ: '',
        //     ausstehend: '',
        //     tischnummer: '',
        //     nachname: '',
        //     abholzeit: ''
        // }
        // const meldungB = await bestellungManagement.updateBestellung(idB,dataB);
        // console.log(meldungB);


        // DeleteBestellung -----------------------------------

        // const idC = 1;
        // const meldungC = await bestellungManagement.deleteBestellung(idC);
        // console.log(meldungC);


        // getNichtZubereiteteBestellungen --------------------

        // console.log(await bestellungManagement.getNichtZubereiteteBestellungen());

    }
    selectBestellungsPositionTest = async () => {
        // getSingleBestellungsPosition -----------------------

        // const id = 1;
        // console.log(await bestellungsPositionManagement.getSingleBestellungPosition(id));


        // getAllBestellungPosition ---------------------------

        // console.log(await bestellungsPositionManagement.getAllBestellungsPosition());


        // CreateBestellungsPosition --------------------------
    
        // const idA = 1;
        // const dataA = {
        //     bestellungsNr: '',
        //     produktNr: ''
        // }
        // const meldungA = await bestellungsPositionManagement.createBestellungsPosition(dataA);
        // console.log(meldungA);


        // UpdateBestellungsPosition --------------------------

        // const idB = 1;
        // const dataB = {
        //     bestellungsNr: '',
        //     produktNr: ''
        // }
        // const meldungB = await bestellungsPositionManagement.updateBestellungsPosition(idB,dataB);
        // console.log(meldungB);


        // DeleteBestellungsPosition --------------------------

        // const idC = 1;
        // const meldungC = await bestellungsPositionManagement.deleteBestellungsPosition(idC);
        // console.log(meldungC);


        // getNichtZubereiteteBestellungenNurProdukt ----------

        // console.log(await bestellungsPositionManagement.getNichtZubereiteteBestellungenNurProdukt());
        

        // getZubereiteteBestellungenNurProdukt ---------------

        // console.log(await bestellungsPositionManagement.getZubereiteteBestellungenNurProdukt());
    }


}

module.exports = new DevTesting();