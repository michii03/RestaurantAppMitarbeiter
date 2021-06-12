const db = require("../database/mysql.js");

class PersonalService{

    /**
     * Alle Elemente der Datenbanktabelle restaurant_personal werden geliefert.
     * @returns Objekt-Array des Types `Personal`
     */
    getAllPersonal = async () => {
        const rows = await this.runQuery("select * from restaurant_personal");
        return rows;
    }
    /**
     * Personal mit angegebener ID wird geliefert
     * @param id des gesuchten Personal
     * @return Object des Types `Personal`
     */
    getSinglePersonal = async (persNr) => {
        const row = await this.runQuery("select * from restaurant_personal where persNr = '"+persNr+ "'");
        return row;
    }

    /**
     * Übergebene Personal wird in Datenbank angelegt
     * @param mitarbeiter der angelegt werden soll (ohne ID!)
     * @returns das eben angelegte Object
     */
    createPersonal = async (mitarbeiter) => {
        await this.runQuery("insert into restaurant_personal (vorname,name,taetigkeit,eintrittsdatum,gehalt) values"+
        "('"+mitarbeiter.vorname+"','"+mitarbeiter.name+"','"+mitarbeiter.taetigkeit+"','"+mitarbeiter.eintrittsdatum+"',"+mitarbeiter.gehalt+")");
        return await this.getPersonalByObject(mitarbeiter);
    }

    /**
     * Übergebene Personal wird in der Datenbank geändert
     * @param id des zubearbeitenden Personal
     * @param mitarbeiter mit geänderten Daten des Types `Personal`
     */
    updatePersonal = async (persNr, mitarbeiter) => {
        await this.runQuery("update restaurant_personal set "+
        "vorname = '"+mitarbeiter.vorname+"', name = '"+mitarbeiter.name+"', taetigkeit = '"+mitarbeiter.taetigkeit+"'"+
        ", eintrittsdatum = '"+mitarbeiter.eintrittsdatum+"', gehalt = "+mitarbeiter.gehalt+" WHERE persNr = "+persNr);
        return await this.getSinglePersonal(persNr);
    }

    /**
     * Personal mit angegebener ID wird aus Datenbank gelöscht
     * @param id des zulöschenden Personal
     * @returns das eben gelöschte Object
     */
    deletePersonal = async (persNr) => {
        const rows = await this.getSinglePersonal(persNr);
        await this.runQuery("delete from restaurant_personal where persNr = "+persNr);
        const personal = await this.getSinglePersonal(persNr);
        if(Object.keys(personal).length == 0){
            return rows;
        } else {
            return;
        }
    }


    getPersonalByObject = async(personal) =>{
        const rows = await this.runQuery(`select * from restaurant_personal where vorname = '${personal.vorname}' 
        and name = '${personal.name}' and taetigkeit = '${personal.taetigkeit}' 
        and eintrittsdatum = ${personal.eintrittsdatum} and gehalt = '${personal.gehalt}'`);
        return rows;
    }



    runQuery = async (str, replacements) => {
        return new Promise(resolve => {
            db.query(str, replacements, (err, rows) => {
                //if (err) rejects(err.toString())
                resolve(rows);
            })
        });
    }
}

module.exports = new PersonalService();