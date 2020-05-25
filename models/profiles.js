const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// require('mongoose-currency').loadType(mongoose);

// const Currency = mongoose.Types.Currency;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var trial = {
    "name": "Joe Hill",
    "occupation": "Plumber"
}

var Profiles = mongoose.model('Profile', profileSchema);

module.exports = Profiles;