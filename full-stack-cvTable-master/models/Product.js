const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    cv_text: String

})



module.exports = mongoose.model('products', productSchema);