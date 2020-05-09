
const mongoose = require('mongoose');
//mongoosen alta schematyökalu käyttöön
const Schema = mongoose.Schema;

const schema = new Schema ({
    //sarakkeiden tiedot tietokantaan
    tool_name: {
        type: String, 
        required: true, 
        index: {
                unique: true
            }
        },
    material: {
        type: String, 
        required: true, 
            
        },
    cutting_speed: {
        type: Number, 
        required: true, 
            
        },

    feed_rate: {
        type: Number, 
        required: true, 
            
        }
      
  
});

// material vain mongoDBtä varten
module.exports = mongoose.model("machining", schema)