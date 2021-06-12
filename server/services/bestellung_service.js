const db = require("../database/mysql.js");

class BestellungService{

    /**
     * Alle Elemente der Datenbanktabelle restaurant_bestellung werden geliefert.
     * @returns Objekt-Array des Types `Bestellung`
     */
    getAllBestellung = async () => {
        const rows = await this.runQuery("select * from restaurant_bestellung");
        return rows;
    }

    getBestellungen = async () => {
        const bestellungen = await this.runQuery("SELECT rb.id, rb.time FROM restaurant_bestellung rb");

        for (let i = 0; i < bestellungen.length; i++) {
            const positionen = await this.runQuery("SELECT rp.id, rp.name AS bezeichnung, rbp.zubereitet "+
                                                   "FROM restaurant_bestellungsPosition rbp "+
                                                   "INNER JOIN restaurant_produkt rp ON ( rbp.produktNr = rp.id ) "+
                                                   "WHERE rbp.bestellungsNr = "+ bestellungen[i].id +";");
            bestellungen[i]["produkte"] = positionen;
        }
        
        return bestellungen;
    }

    /**
     * Bestellung mit angegebener ID wird geliefert
     * @param id der gesuchten Bestellung
     * @return Object des Types `Bestellung`
     */
    getSingleBestellung = async (id) => {
        const row = await this.runQuery("select * from restaurant_bestellung where id = '"+id+ "'");
        return row;
    }

    /**
     * Übergebene Bestellung wird in Datenbank angelegt
     * @param bestellung die angelegt werden soll (ohne ID!)
     * @returns das eben angelegte Object
     */
    createBestellung = async (bestellung) => {
        await this.runQuery("insert into restaurant_bestellung (typ,abgeholt,tischnummer,nachname,abholzeit) values"+
        "('"+bestellung.typ+"','"+bestellung.abgeholt+"','"+bestellung.tischnummer+"','"+bestellung.nachname+"','"+bestellung.abholzeit+"')");
        return await this.getBestellungByObject(bestellung);
    }

    /**
     * Übergebene Bestellung wird in der Datenbank geändert
     * @param id der zubearbeitenden Bestellung
     * @param bestellung mit geänderten Daten des Types `Bestellung`
     */
    updateBestellung = async (id, bestellung) => {
        await this.runQuery("update restaurant_bestellung set "+
        "typ = '"+bestellung.typ+"', abgeholt = '"+bestellung.abgeholt+"', tischnummer = '"+bestellung.tischnummer+"'"+
        ", nachname = '"+bestellung.nachname+"', abholzeit = '"+bestellung.abholzeit+"' WHERE id = "+id);
        return await this.getSingleBestellung(id);
    }

    /**
     * Bestellung mit angegebener ID wird aus Datenbank gelöscht
     * @param id der zulöschenden Bestellung
     * @returns das eben gelöschte Object
     */
    deleteBestellung = async (id) => {
        const rows = await this.getSingleBestellung(id);
        await this.runQuery("delete from restaurant_bestellung where id = "+id);
        const bestellung = await this.getSingleBestellung(id);
        if(Object.keys(bestellung).length == 0){
            return rows;
        } else {
            return;
        }
    }


    getBestellungByObject = async(bestellung) =>{
        const rows = await this.runQuery(`select * from restaurant_bestellung where typ = '${bestellung.typ}' 
        and abgeholt = '${bestellung.abheholt}' and tischnummer = ${bestellung.tischnummer}
        and nachname = ${bestellung.nachname} and abholzeit = '${bestellung.abholzeit}'`);
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

module.exports = new BestellungService();