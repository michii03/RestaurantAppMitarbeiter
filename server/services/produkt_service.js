const db = require("../database/mysql.js");

class ProduktService{

    /**
     * Methodenaufruf um alle Einträge der Tabelle restaurant_produkt zu bekommen.
     * @return Objekt-Array des Types `Produkt`
     */
    getAllProdukte = async () => {
        const rows = await this.runQuery("select * from restaurant_produkt");
        return rows;
    }

    /**
     * Produkt mit angegebener ID wird geliefert
     * @param id des gesuchten Produktes
     * @return Object des Types `Produkt`
     */
    getSingleProdukt = async (id) => {
        const row = await this.runQuery("select * from restaurant_produkt where id = '"+id+ "'");
        return row;
    }

    /**
     * Übergebenes Produkt wird in Datenbank angelegt
     * @param produkt das angelegt werden soll (ohne ID!)
     * @returns das eben angelegte Object
     */
    createProdukt = async (produkt) => {
        await this.runQuery("insert into restaurant_produkt (name,beschreibung,kategorie,preis,vegetarisch) values"+
        "('"+produkt.name+"','"+produkt.beschreibung+"','"+produkt.kategorie+"',"+produkt.preis+","+produkt.vegetarisch+")");
        return await this.getProduktByObject(produkt);
    }

    /**
     * Übergebenes Produkt wird in der Datenbank geändert
     * @param id des zubearbeitenden Produktes
     * @param produkt mit geänderten Daten des Types `Produkt`
     */
    updateProdukt = async (id, produkt) => {
        await this.runQuery("update restaurant_produkt set "+
        "name = '"+produkt.name+"', beschreibung = '"+produkt.beschreibung+"', kategorie = '"+produkt.kategorie+"'"+
        ", preis = "+produkt.preis+", vegetarisch = '"+produkt.vegetarisch+"' WHERE id = "+id);
        return await this.getProduktByObject(produkt);
    }

    /**
     * Produkt mit angegebener ID wird aus Datenbank gelöscht
     * @param id des zulöschenden Produktes
     * @returns das eben gelöschte Object
     */
    deleteProdukt = async (id) => {
        const rows = await this.getSingleProdukt(id);
        await this.runQuery("delete from restaurant_produkt where id = "+id);
        const produkt = await this.getSingleProdukt(id);
        if(Object.keys(produkt).length == 0){
            return rows;
        } else {
            return;
        }
    }

    /**
     * Alle bereits verwendeten Kategorien werden aus der Datenbank ausgelesen
     * @returns Objekt-Array in der Form { kategorie: String }
     */
    getDifferentKategorien = async () => {
        const rows = await this.runQuery("select distinct kategorie from restaurant_produkt");
        return rows;
    }

    /**
     * Alle Produkte der angegebenen Kategorie werden geliefert
     * @param kategorie Filter für Produkte
     * @returns Produkte des Types `Produkt` auf die die Kategorie zutrifft
     */
    getProdukteByKategorie = async (kategorie) =>{
        const rows = await this.runQuery("select * from restaurant_produkt where kategorie = '"+kategorie+"'");
        return rows;
    }

    /**
     * Alle Produkte auf die die Eigenschaft vegetarisch = 'ja' zutrifft
     * @returns Objekt-Array des Types `Produkt` mit allen vegetarischen Produkten
     */
    getVegetarisch = async () => {
        const rows = await this.runQuery("select * from restaurant_produkt where vegetarisch = 'ja'");
        return rows;
    }


    getProduktByObject = async(produkt) =>{
        const rows = await this.runQuery(`select * from restaurant_produkt where name = '${produkt.name}' 
        and beschreibung = '${produkt.beschreibung}' and kategorie = '${produkt.kategorie}' 
        and preis = ${produkt.preis} and vegetarisch = '${produkt.vegetarisch}'`);
        return rows;
    }


    runQuery = async (str, replacements) => {
        return new Promise(resolve => {
            db.query(str, replacements, (err, rows) => {
                if (err) rejects(err.toString())
                resolve(rows);
            })
        });
    }

    /**============================================================================================
     *                                           KOCH
     ============================================================================================*/

     getProdukteByBestellnummer = async(bestellnummer) => {
        const rows = await this.runQuery(  `SELECT prod.*, posi.zubereitet, posi.id AS posid
                                            FROM restaurant_bestellungsPosition posi
                                            INNER JOIN restaurant_produkt prod ON (prod.id = posi.produktNr)
                                            INNER JOIN restaurant_bestellung best ON (best.id = posi.bestellungsNr)
                                            WHERE posi.bestellungsNr = ${bestellnummer}
                                            AND prod.kategorie != 'Getränk'`);
        return rows;
    }

     updateProduktZubereitet = async (id) => {
         await this.runQuery(`UPDATE restaurant_bestellungsPosition
                              SET zubereitet = 'true'
                              WHERE id = ${id}`);
         return await this.getSingleProdukt(id);
     }

}

module.exports = new ProduktService();