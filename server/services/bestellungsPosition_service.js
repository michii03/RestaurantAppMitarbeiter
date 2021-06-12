const db = require("../database/mysql.js");

class BestellungsPositionService{

    /**
     * Alle Elemente der Datenbanktabelle restaurant_bestellungsPosition werden geliefert.
     * @returns Objekt-Array des Types `BestellungsPosition`
     */
    getAllBestellungsPosition = async () => {
        const rows = await this.runQuery("select * from restaurant_bestellungsPosition");
        return rows;
    }

    /**
     * BestellungsPosition mit angegebener ID wird geliefert
     * @param id der gesuchten BestellungsPosition
     * @return Object des Types `BestellungsPosition`
     */
    getSingleBestellungsPosition = async (id) => {
        const row = await this.runQuery("select * from restaurant_bestellungsPosition where id = '"+id+ "'");
        return row;
    }

    /**
     * Übergebene BestellungsPosition wird in Datenbank angelegt
     * @param bestellungsPosition die angelegt werden soll (ohne ID!)
     * @returns das eben angelegte Object
     */
    createBestellungsPosition = async (bestellungsPosition) => {
        await this.runQuery("insert into restaurant_bestellungsPosition (bestellungsNr, produktNr, zubereitet) values"+
        "("+bestellungsPosition.bestellungsNr+","+bestellungsPosition.produktNr+","+bestellungsPosition.zubereitet+")");
        return await this.getBestellungsPositionByObject(bestellungsPosition);
    }

    /**
     * Übergebene BestellungsPosition wird in der Datenbank geändert
     * @param id der zubearbeitenden BestellungsPosition
     * @param bestellungsPosition mit geänderten Daten des Types `BestellungsPosition`
     */
    updateBestellungsPosition = async (id, bestellungsPosition) => {
        await this.runQuery("update restaurant_bestellungsPosition set "+
        "bestellungsNr = "+bestellungsPosition.bestellungsNr+", produktNr = "+bestellungsPosition.produktNr+", zubereitet = "+bestellungsPosition.zubereitet+" WHERE id = "+id);
        return await this.getSingleBestellungsPosition(id);
    }

    

    /**
     * BestellungsPosition mit angegebener ID wird aus Datenbank gelöscht
     * @param id der zulöschenden BestellungsPosition
     * @returns das eben gelöschte Object
     */
    deleteBestellungsPosition = async (id) => {
        const rows = await this.getSingleBestellungsPosition(id);
        await this.runQuery("delete from restaurant_bestellungsPosition where id = "+id);
        const bestellungsPosition =  await this.getSingleBestellungsPosition(id);
        if(Object.keys(bestellungsPosition).length == 0){
            return rows;
        } else {
            return;
        }
    }

    /**============================================================================================
     *                                           SCHÄNKE
     ============================================================================================*/

    /**
     * Alle Produkte, bei welchen in der BestellungsPosition der Key `zubereitet` auf 'nein' steht.
     * @returns Object-Array des Types `Produkt`
     */
    getNichtZubereiteteBestellungenNurProduktSchaenke = async () => {
        const rows = await this.runQuery("select rp.id, rp.name, rp.beschreibung, rp.kategorie, rp.preis, rp.vegetarisch, rb.id AS posID "+
                                        "from restaurant_bestellungsPosition rbp "+
                                        "inner join restaurant_bestellung rb "+
                                        "ON (rbp.bestellungsNr = rb.id) "+
                                        "inner join restaurant_produkt rp "+
                                        "ON (rbp.produktNr = rp.id) where rbp.zubereitet = 'false'"+
                                        "and rp.kategorie IN ('Getraenk');");
        return rows;
    }

    /**
     * Liefert alle Bestellnummer zu allen verfügbaren Bestellungspositionen - Schaenke
     * @returns Object-Array des Types `Produkt`
     */
    getZubereiteteBestellungenNurProduktSchaenke = async () => {
        const rows = await this.runQuery("select rp.id, rp.name, rp.beschreibung, rp.kategorie, rp.preis, rp.vegetarisch, rb.id AS posID "+
                                        "from restaurant_bestellungsPosition rbp "+
                                        "inner join restaurant_bestellung rb "+
                                        "ON (rbp.bestellungsNr = rb.id) "+
                                        "inner join restaurant_produkt rp "+
                                        "ON (rbp.produktNr = rp.id) where rbp.zubereitet = 'true'"+
                                        "and rp.kategorie IN ('Getraenk');");
        return rows;
    }

    /**============================================================================================
     *                                           KOCH
     ============================================================================================*/

     /**
     * Liefert alle Bestellnummer zu allen verfügbaren Bestellungspositionen - Koch
     * @returns Object-Array des Types `Produkt`
     */
     getBestellnummernNichtZubereitetKoch = async () => {
            const rows = await this.runQuery("SELECT best.id, best.time "+
                                            "FROM restaurant_bestellung best "+
                                            "WHERE best.id IN (SELECT posi.bestellungsNr "+
                                                            "FROM restaurant_bestellungsPosition posi "+
                                                            "INNER JOIN restaurant_produkt prod ON (prod.id = posi.produktNr) "+
                                                            "WHERE posi.bestellungsNr IN (SELECT bestU1.id "+
                                                                                            "FROM restaurant_bestellung bestU1) "+
                                                            "AND kategorie != 'Getränk' "+
                                                            "AND zubereitet = 'false') ");
        return rows;
    }


    /**
     * Alle Produkte, bei welchen in der BestellungsPosition der Key `zubereitet` auf 'nein' steht.
     * @returns Object-Array des Types `Produkt`
     */
    getNichtZubereiteteBestellungenNurProdukt = async () => {
        const rows = await this.runQuery("select rp.id, rp.name, rp.beschreibung, rp.kategorie, rp.preis, rp.vegetarisch, rb.id AS posID, rb.time "+
                                        "from restaurant_bestellungsPosition rbp "+
                                        "inner join restaurant_bestellung rb "+
                                        "ON (rbp.bestellungsNr = rb.id) "+
                                        "inner join restaurant_produkt rp "+
                                        "ON (rbp.produktNr = rp.id) where rbp.zubereitet = 'false' "+
                                        "and rp.kategorie IN ('Pizza', 'Pasta', 'Salat');");
        return rows;
    }


    /**
     * Alle Produkte, bei welchen in der BestellungsPosition der Key `zubereitet` auf 'ja' steht.
     * @returns Object-Array des Types `Produkt`
     */
    getZubereiteteBestellungenNurProdukt = async () => {
        const rows = await this.runQuery("select rp.id, rp.name, rp.beschreibung, rp.kategorie, rp.preis, rp.vegetarisch, rb.id AS posID "+
                                        "from restaurant_bestellungsPosition rbp "+
                                        "inner join restaurant_bestellung rb "+
                                        "ON (rbp.bestellungsNr = rb.id) "+
                                        "inner join restaurant_produkt rp "+
                                        "ON (rbp.produktNr = rp.id) where rbp.zubereitet = 'true'"+
                                        "and rp.kategorie IN ('Pizza', 'Pasta', 'Salat');");
        return rows;
    }


    /**============================================================================================
     *                                     KOCH + SCHAENKE
     ============================================================================================*/

     /**
     * Updatet eine Bestellungsposition je nach id
     * @param id Die id des Produkt, welches geupdatet werden soll
     * @returns Liefert das geupdatet Produkt
     */
     updateBestellungsPositionByID = async (id) => {
        await this.runQuery("update restaurant_bestellungsPosition set "+
        "zubereitet = 'true' where id = "+id);
        return await this.getSingleBestellungsPosition(id);
    }


    /**
     * Alle Produkte, bei welchen in der BestellungsPosition der Key `zubereitet` auf 'ja' steht.
     * @returns Object-Array des Types `Produkt`
     */
    getBestellungsPositionByObject = async(bestellungsPosition) =>{
        const rows = await this.runQuery(`select * from restaurant_bestellungsPosition where bestellungsNr = '${bestellungsPosition.bestellungsNr}' 
        and produktNr = '${bestellungsPosition.produktNr}' and zubereitet = '${bestellungsPosition.zubereitet}' 
        and preis = ${produkt.preis} and vegetarisch = '${produkt.vegetarisch}'`);
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

module.exports = new BestellungsPositionService();