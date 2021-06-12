//** Imports */
const express         = require("express");
const path            = require("path");
const logger          = require("morgan");

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//** HTTP-Header */
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//** Routes */
app.use("/",require("./routes/index"));
app.use("/produkt", require("./routes/produkt"));
app.use("/bestellung", require("./routes/bestellung"));
app.use("/bestellungsPosition", require("./routes/bestellungsPosition"));
app.use("/personal", require("./routes/personal"));
app.use("/konto", require("./routes/konto"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const test = require('./dev')
test.run_test();