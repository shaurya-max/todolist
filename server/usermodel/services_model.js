const {Schema ,  model , Mongoose} =require('mongoose');
const { services } = require('../Controler/auth_controler');

const serviceSchema = new Schema({
    title: {type:String,require:true},
    description:{type:String,require:true},
})

const Services = new model ('Service', serviceSchema);

module.exports = Services