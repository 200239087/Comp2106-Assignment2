let mongoose = require('mongoose');

let characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    race: {
        type: String,
        required: 'Race is required'
    },
    gender: {
        type: String,
        required: 'Gender is required'
    },
    element: {
        type: String,
        required: 'Magic Element is required'
    },
    summary: {
        type: String,
    }
});

module.exports = mongoose.model('Character', characterSchema);