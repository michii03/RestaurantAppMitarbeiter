const db = require("../database/mysql.js");
const bcrypt = require('bcrypt');

class KontoService {


    authKonto = async (loginData) => {

        const rows = await this.runQuery(`select passwd from restaurant_konto where username = '${loginData.username}'`);

        let auth = 0;

        bcrypt.compare(loginData.passwd, rows[0].passwd).then(
            result => {
                auth = 1;
                
                console.log('Submitted password is correct');
            },
            err => {
                 //auth = false;
                console.log(err);
            }
        );
        console.log(auth);
        if(auth == 1){
            const finalResult = await this.getKontoWithUsername(loginData.username);
            return finalResult;
        }



        // const rows = await this.runQuery(`select * from restaurant_konto where username = '${loginData.username}' and passwd = '${loginData.passwd}'`);

        // bcrypt.hash("michi", 10).then(
        //     hash => {
        //       console.log('Your hash: ', hash);
        //     },
        //     err => {
        //       console.log(err);
        //     }
        //   );


        //return rows;
    }


    getAllKonten = async () => {
        const rows = await this.runQuery("select * from restaurant_konto");
        return rows;
    }

    // createKonto = async () => {
    //     await 
    // }

    getKontoWithUsername = async (username) => {
        const rows = await this.runQuery(`select * from restaurant_konto where username = '${username}'`);
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
}

module.exports = new KontoService();