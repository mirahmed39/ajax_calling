const mongoose = require('mongoose');
//const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.Promise = global.Promise;

//using mongoose models
const placeSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  cuisine: {type: String, required: true},
  location: {type: String, required: true}
});

//placeSchema.plugin(beautifyUnique);

mongoose.model('Place', placeSchema);

mongoose.connect('mongodb://localhost/hw08', {useMongoClient: true});

