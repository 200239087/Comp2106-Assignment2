let mongoose = require('mongoose');

let raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    }
});

module.exports = mongoose.model('Race', raceSchema);