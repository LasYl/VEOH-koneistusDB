
const mongoose = require('mongoose');
//mongoosen alta schematyökalu käyttöön
const Schema = mongoose.Schema;

const schema = new Schema ({
    //sarakkeiden tiedot tietokantaan
    name: {
        type: String, 
        required: true, 
        index: {
                unique: true
            }
        },
    min_density: {
        type: Number, 
        required: true, 
            
        },
    max_density: {
        type: Number, 
        required: true, 
            
        },

    max_strength: {
        type: Number, 
        required: true, 
            
        },

    max_strength: {
        type: Number, 
        required: true, 
            
        },

      
  
});

// material vain mongoDBtä varten
module.exports = mongoose.model("material", schema)