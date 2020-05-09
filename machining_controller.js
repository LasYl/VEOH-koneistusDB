//tietokantamalli, joka kaivaa tiedon tietokannasta, ja muuntaa sen halutuksi muodoksi

// määritetään viitaten tiedostoon material_model
const machining_model = require('./machining_model')

//HELPERS
const machining_data = (req) => {
    //data talteen, määritetään luotavat arvot
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate,

    };

    return data;

};

//CREATE
// yksi uusi materiaali
const api_post_machining = (req, res, next) => {
    console.log('api_post_machining');
    // Apufunktiolla kutsutaan jo luotuHELPERSIIN  data
    let data = machining_data(req)
  

    let new_machining = machining_model(data);

    new_machining.save().then(()=>{
        console.log(new_machining);
        //lähetetään sama data takaisin JSON.stringify-muodossa
        res.send(JSON.stringify(new_machining));
    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe tallennuksessa');
    });
    //lähetetään sama data takaisin JSON.stringify-muodossa
   
};

//READ



//lukukäsittelijä, uusi funktio
// lista kaikista materiaaleista. (s perässä)
const api_get_machinings = (req, res, next) => {

    machining_model.find({})
    .lean()
    .then(machinings => {
    //palautetaan tmaterials, että nähdään sen tulevan oikealle käsittelijälle
    res.send(JSON.stringify(machinings));  
    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe tallennuksessa');

    });
  }; 

//UPDATE
const api_put_machining = (req, res, next) => {
    console.log('sdbbsd')
    let id = req.params.id;
    // Apufunktiolla kutsutaan jo luotuHELPERSIIN  data
    let data = machining_data(req)

    machining_model.findByIdAndUpdate(id, data,{
        new:true
    }).then( (machining)=>{
        res.send(machining);
    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe päivityksessä');

    });
};

//DELETE

const api_delete_machining = (req, res, next) => {
    // haetaan IDksi kyseinen id mongosta
    let id = req.params.id;
    machining_model.findByIdAndRemove(id).then(()=>{
        res.send();
        console.log('poistettu');

    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe poistossa');
    })

}

//EXPORTS
module.exports.api_post_machining = api_post_machining;
module.exports.api_get_machinings = api_get_machinings;
module.exports.api_delete_machining = api_delete_machining;
module.exports.api_put_machining = api_put_machining;