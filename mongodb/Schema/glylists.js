let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    "url": String,
    "http": String,
    "title": String,
    "message": String,
    "type": Number,
    "txt": String,
    "grade": String
});
module.exports = schema