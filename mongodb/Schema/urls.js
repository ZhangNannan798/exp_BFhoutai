let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    "bigImg":String,
    "url":String,
    "smallImg":String
});
module.exports = schema