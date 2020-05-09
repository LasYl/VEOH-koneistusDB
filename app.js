const express = require ('express');

//porttimäärittely, ympäristömuuttujasta lukeva portin määrittely, PORT isolla! Jos ei määritetty, valitsee 8080
const port = process.env.PORT || 8080;
//otetaan mongoose käyttöön
const mongoose = require('mongoose')

//alustetaan aplikaatio
const app = express();

//parsii sisään tulevien pyyntöjen viestikenttää

const body_parser = require('body-parser');

//otetaan luotu moduuli käyttöön, samasta kansiosta
const machining_controller =require('./machining_controller')

//bodyparser expressapplikaatiolle käyttöön, 
app.use(body_parser.json()); //jos json, parsii req.body.name
app.use(body_parser.urlencoded({extended:true
})); // jos urliin koodattu dataa



//perusloggaus arvolle, kun tulee pyyntö serverille
app.use ((req,res,next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); // Esim. GET api/materials

//RESTful API
//CRUD OPERATIONS

//CREATE
//post tarkoittaa että ohjaa post-metodit annettuun polkuun
app.post("/api/machining-parameter-set", machining_controller.api_post_machining);

//READ
//Palauttaa materiaalit datana kun api välissä, palauttaa näkymänä kun api pois (app.get("/materials"))
app.get("/api/machining-parameter-sets", machining_controller.api_get_machinings)//ohjataan polku funktiolle api.get_materials
//Palauttaa yksittäisen id:n tiedot
app.get("/api/machining-parameter-set/:id", machining_controller.api_get_machining)

//UPDATE
//app.PUT korvaa täysin olemassa olevat tiedot, eli kaikki tiedot pitää antaa
//app.PATCH korvaisi tietyt tiedot
app.put("/api/machining-parameter-set/:id", machining_controller.api_put_machining)


//DELETE
app.delete("/api/machining-parameter-set/:id", machining_controller.api_delete_machining)//Poisto mongosta

//Vaihdetaan vain databasen
//const database_url = "mongodb+srv://server:YoPkSBnxekTpsCE3@cluster0-fanmv.mongodb.net/koneistusdb?retryWrites=true&w=majority"
//mongo salasana yhteys url
const database_url = "mongodb+srv://server:YoPkSBnxekTpsCE3@cluster0-fanmv.mongodb.net/koneistusdb?retryWrites=true&w=majority"
//yhteyden luonti mongoon
mongoose.connect(database_url, {
    //saadaan luotua uniikkeja kenttiä. (esim. materiaalin nimi), (uniikki IDn lisäksi)
    useCreateIndex: true,
    // jotain tarvittavia määritylsiä
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected');
    //kuuntelee porttia, kun saadaan yhteys tietokantaan, mutta ei palauta mitään
    app.listen(port);
    
}).catch(err => {
    //jos virhe, annetaan consoleen ilmoitus
    console.log('virhe yhteyden muodostamisessa');
});