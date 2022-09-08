const mongoose = require('mongoose');
//read the env BEFORE apps
require('dotenv').config({ path: './config.env' });
const app = require('./app');

let local = false;
const conData = {};

if (local) {
  conData.connectionString = process.env.MONGODB_LOCALCONNECT;
} else {
  conData.connectionString = process.env.MONGODB_ATLASCONNECT.replace(
    '<password>',
    process.env.MONGODB_PASSWORD
  );
}

mongoose
  .connect(conData.connectionString, {
    // useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection succesfully established'));

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', toursSchema);
const testTour = new Tour({
  name: 'The sea explorer',
  price: 450,
  rating: 4.8,
  difficulty: 'easy',
  premium: true,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port ' + port + '...');
});
